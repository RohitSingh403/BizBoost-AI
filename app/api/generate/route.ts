import { NextRequest, NextResponse } from 'next/server';
import { generateContent, ContentGenerationRequest } from '@/lib/openai';
import { deductUserCredit, saveContentHistory } from '@/lib/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, businessType, tone, platform, description }: ContentGenerationRequest & { userId: string } = body;

    // Validate required fields
    if (!userId || !businessType || !tone || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check and deduct user credit
    const hasCredits = await deductUserCredit(userId);
    if (!hasCredits) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 }
      );
    }

    // Generate content using OpenAI
    const generatedContent = await generateContent({
      businessType,
      tone,
      platform,
      description,
    });

    // Save to content history
    await saveContentHistory({
      userId,
      input: { businessType, tone, platform, description },
      output: generatedContent,
    });

    return NextResponse.json({
      success: true,
      content: generatedContent,
    });

  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}