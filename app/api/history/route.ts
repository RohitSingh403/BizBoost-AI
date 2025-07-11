import { NextRequest, NextResponse } from 'next/server';
import { getUserContentHistory } from '@/lib/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 10;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const history = await getUserContentHistory(userId, limit);

    return NextResponse.json({
      success: true,
      history,
    });

  } catch (error) {
    console.error('Error in history API:', error);
    return NextResponse.json(
      { error: 'Failed to get content history' },
      { status: 500 }
    );
  }
}