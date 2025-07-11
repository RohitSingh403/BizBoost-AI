import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { updateUserSubscription, updateUserCredits } from '@/lib/firestore';
import { PRICING_PLANS } from '@/lib/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        
        if (!userId) {
          console.error('No userId in session metadata');
          break;
        }

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const priceId = subscription.items.data[0].price.id;
        
        // Find the plan based on price ID
        let planName = '';
        let credits = 0;
        
        for (const [key, plan] of Object.entries(PRICING_PLANS)) {
          if (plan.priceId === priceId || plan.yearlyPriceId === priceId) {
            planName = key;
            credits = plan.credits;
            break;
          }
        }

        if (planName && credits > 0) {
          await updateUserSubscription(
            userId,
            subscription.id,
            subscription.customer as string,
            planName,
            credits
          );
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;
        
        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const userId = subscription.metadata?.userId;
          
          if (userId) {
            const priceId = subscription.items.data[0].price.id;
            
            // Find credits for this plan
            let credits = 0;
            for (const plan of Object.values(PRICING_PLANS)) {
              if (plan.priceId === priceId || plan.yearlyPriceId === priceId) {
                credits = plan.credits;
                break;
              }
            }
            
            if (credits > 0) {
              await updateUserCredits(userId, credits);
            }
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        
        if (userId) {
          // Reset user to free plan
          await updateUserSubscription(userId, '', '', 'free', 0);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Error in Stripe webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}