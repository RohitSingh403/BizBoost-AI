import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ContentGenerationRequest {
  businessType: string;
  tone: string;
  platform: string;
  description?: string;
}

export interface GeneratedContent {
  caption: string;
  hashtags: string[];
  postIdeas: string[];
}

export async function generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
  const { businessType, tone, platform, description } = request;
  
  const prompt = `
You are an expert social media content creator specializing in ${businessType} businesses. 

Create engaging social media content with the following requirements:
- Business Type: ${businessType}
- Tone: ${tone}
- Platform: ${platform}
- Additional Context: ${description || 'None provided'}

Please generate:
1. A compelling caption (150-300 characters for Twitter, 2200 characters max for others)
2. 10 relevant hashtags
3. 5 additional post ideas for this business

Format your response as JSON with the following structure:
{
  "caption": "Your engaging caption here",
  "hashtags": ["#hashtag1", "#hashtag2", ...],
  "postIdeas": ["Idea 1", "Idea 2", ...]
}

Make sure the content is:
- Platform-appropriate (${platform} best practices)
- Engaging and ${tone} in tone
- Relevant to ${businessType} businesses
- Includes emojis where appropriate
- Optimized for engagement
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional social media content creator. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    // Parse the JSON response
    const parsedContent = JSON.parse(content);
    
    return {
      caption: parsedContent.caption,
      hashtags: parsedContent.hashtags,
      postIdeas: parsedContent.postIdeas,
    };
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
}

export default openai;