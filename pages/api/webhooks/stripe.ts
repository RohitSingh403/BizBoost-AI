import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'] as string;
  const buf = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

async function handleCheckoutSessionCompleted(session: any) {
  const userId = session.client_reference_id;
  const subscription = await stripe.subscriptions.retrieve(session.subscription as string, {
    expand: ['items.data.price']
  });
  
  // Type assertion to access the expanded subscription properties
  const subData = subscription as unknown as {
    current_period_end: number;
    customer: string | { id: string };
    items: {
      data: Array<{
        price: {
          id: string;
        };
      }>;
    };
  };
  
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    stripeCustomerId: typeof subData.customer === 'string' ? subData.customer : subData.customer.id,
    stripeSubscriptionId: subscription.id,
    stripePriceId: subData.items.data[0].price.id,
    stripeCurrentPeriodEnd: new Date(subData.current_period_end * 1000),
  }, { merge: true });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const subData = subscription as unknown as {
    current_period_end: number;
    items: {
      data: Array<{
        price: {
          id: string;
        };
      }>;
    };
    metadata: {
      userId: string;
    };
    status: string;
  };

  const userRef = doc(db, 'users', subData.metadata.userId);
  await setDoc(userRef, {
    stripePriceId: subData.items.data[0].price.id,
    stripeCurrentPeriodEnd: new Date(subData.current_period_end * 1000),
    stripeSubscriptionStatus: subData.status,
  }, { merge: true });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const subData = subscription as unknown as {
    metadata: {
      userId: string;
    };
  };

  const userRef = doc(db, 'users', subData.metadata.userId);
  await setDoc(userRef, {
    stripeSubscriptionId: null,
    stripePriceId: null,
    stripeCurrentPeriodEnd: null,
    stripeSubscriptionStatus: 'canceled',
  }, { merge: true });
}

export default webhookHandler;
