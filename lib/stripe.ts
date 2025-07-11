import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export type Plan = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  credits: number;
  priceId: string;
  yearlyPriceId: string;
  features: string[];
};

type PricingPlans = {
  [key: string]: Plan;
};

export const PRICING_PLANS: Record<string, Plan> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals getting started',
    monthlyPrice: 9.99,
    yearlyPrice: 95.99,
    credits: 50,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || '',
    yearlyPriceId: process.env.STRIPE_STARTER_YEARLY_PRICE_ID || '',
    features: [
      '50 credits per month',
      'Basic support',
      'Email assistance',
    ],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'For professionals who need more power',
    monthlyPrice: 29.99,
    yearlyPrice: 287.99,
    credits: 200,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID || '',
    yearlyPriceId: process.env.STRIPE_PROFESSIONAL_YEARLY_PRICE_ID || '',
    features: [
      '200 credits per month',
      'Priority support',
      'Email & chat assistance',
      'Advanced analytics',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For businesses with custom needs',
    monthlyPrice: 99.99,
    yearlyPrice: 959.99,
    credits: 1000,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
    yearlyPriceId: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID || '',
    features: [
      '1000+ credits per month',
      '24/7 dedicated support',
      'Custom integration',
      'Advanced analytics',
      'API access',
    ],
  },
};

export async function createCheckoutSession(
  priceId: string,
  userId: string,
  userEmail: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: userEmail,
      metadata: {
        userId,
      },
      subscription_data: {
        metadata: {
          userId,
        },
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}

export async function createPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw new Error('Failed to create portal session');
  }
}

export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw new Error('Failed to retrieve subscription');
  }
}

export default stripe;