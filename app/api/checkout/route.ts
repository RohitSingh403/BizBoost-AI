import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, PRICING_PLANS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planName, isYearly, userId, userEmail } = body;

    if (!planName || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const plan = PRICING_PLANS[planName as keyof typeof PRICING_PLANS];
    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    const priceId = isYearly ? plan.yearlyPriceId : plan.priceId;
    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?canceled=true`;

    const session = await createCheckoutSession(
      priceId,
      userId,
      userEmail,
      successUrl,
      cancelUrl
    );

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Error in checkout API:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}