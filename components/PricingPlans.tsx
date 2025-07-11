import { useState } from 'react';
import { Button } from './ui/button';
import { PRICING_PLANS, type Plan } from '@/lib/stripe';
import { useAuth } from '@/hooks/useAuth';
import { createCheckoutSession } from '@/lib/subscriptions';

type PlanKey = keyof typeof PRICING_PLANS;

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const { user } = useAuth();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }

    setSelectedPlan(priceId);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.uid,
          userEmail: user.email,
        }),
      });

      const { sessionId } = await response.json();
      
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });
        
        if (error) {
          console.error('Redirect to checkout failed:', error);
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setSelectedPlan(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-gray-600">
          Select the plan that works best for you
        </p>
        <div className="flex items-center justify-center mt-6">
          <span className="mr-3 font-medium">Billing</span>
          <button
            onClick={() => setIsYearly(false)}
            className={`px-4 py-2 rounded-l-md ${
              !isYearly ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-4 py-2 rounded-r-md ${
              isYearly ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {(Object.entries(PRICING_PLANS) as [PlanKey, Plan][]).map(([key, plan]) => (
          <div
            key={key}
            className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="text-4xl font-bold mb-4">
              ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              <span className="text-lg font-normal text-gray-600">
                /{isYearly ? 'year' : 'month'}
              </span>
            </p>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {plan.credits} Credits
              </li>
              {plan.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={() =>
                handleSubscribe(isYearly ? plan.yearlyPriceId : plan.priceId)
              }
              disabled={selectedPlan === key}
              className="w-full"
            >
              {selectedPlan === key ? 'Processing...' : 'Get Started'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
