import { NextRequest, NextResponse } from 'next/server';
import { createPortalSession } from '@/lib/stripe';
import { getUser } from '@/lib/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await getUser(userId);
    if (!user || !user.customerId) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      );
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;
    const session = await createPortalSession(user.customerId, returnUrl);

    return NextResponse.json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.error('Error in portal API:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}