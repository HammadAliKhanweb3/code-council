// e.g. src/app/api/demo/blocking/route.ts  (or wherever this runs)
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';

export async function POST() {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    
    const openrouter = createOpenRouter({
      apiKey,  
    });

    const response = await generateText({
      model: openrouter.chat('arcee-ai/trinity-large-preview:free'),
      prompt: 'What is OpenRouter?',
    });

    console.log("Generated text preview:", response.text);

    return new Response(response.text);
  } catch (error: any) {
    console.error("Full OpenRouter error:", error);
    return new Response(
      JSON.stringify({
        error: error?.message || 'Generation failed',
        details: error?.toString(),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}