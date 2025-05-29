import { createOpenAI } from '@ai-sdk/openai';

// Initialize OpenAI with the API key from environment variables
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

export const openai = createOpenAI({
  apiKey: apiKey,
});
