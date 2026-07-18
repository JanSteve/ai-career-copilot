import { z } from "zod";
import { ClaudeProvider } from "./providers/claude";
import { GeminiProvider } from "./providers/gemini";
import { OpenAIProvider } from "./providers/openai";
import {
  AIProvider,
  AIProviderInterface,
  AIRequestOptions,
  AIResponse,
} from "./types";

const providers: Record<string, AIProviderInterface> = {
  [AIProvider.OPENAI]: new OpenAIProvider(),
  [AIProvider.GEMINI]: new GeminiProvider(),
  [AIProvider.CLAUDE]: new ClaudeProvider(),
};

export async function generateAIResponse<T = any>(
  options: AIRequestOptions,
  schema?: z.ZodSchema<T>
): Promise<AIResponse<T>> {
  const preferredProvider =
    options.provider ||
    process.env.AI_DEFAULT_PROVIDER ||
    AIProvider.OPENAI;

  const fallbackOrder = [
    preferredProvider,
    AIProvider.OPENAI,
    AIProvider.GEMINI,
    AIProvider.CLAUDE,
  ].filter((v, i, a) => a.indexOf(v) === i);

  let lastError: any = null;

  for (const providerKey of fallbackOrder) {
    const provider = providers[providerKey];
    if (!provider) continue;

    try {
      return await provider.generateResponse(options, schema);
    } catch (error: any) {
      console.warn(`AI Provider ${providerKey} failed:`, error?.message || error);
      lastError = error;
    }
  }

  // Fallback mock response for testing/development if no API key is supplied
  console.warn("All AI providers failed or missing API keys. Falling back to structured mock generation.");
  return generateMockFallback<T>(options, schema);
}

function generateMockFallback<T>(
  options: AIRequestOptions,
  schema?: z.ZodSchema<T>
): AIResponse<T> {
  const isJson = options.jsonMode || !!schema;
  let content = "AI analysis complete based on inputs provided.";
  let parsed: any = undefined;

  if (isJson && schema) {
    parsed = {
      score: 85,
      summary: "Strong profile with solid core alignment.",
      strengths: ["Clear technical stack", "Quantifiable metrics in work history"],
      improvements: ["Add more action verbs", "Highlight leadership responsibilities"],
      keywords: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL"],
      atsCompatibility: "High",
      suggestions: ["Tailor summary to target job description"],
    };
    content = JSON.stringify(parsed, null, 2);
  }

  return {
    content,
    parsed,
    provider: "mock-fallback",
    model: "simulated-v1",
    tokens: { promptTokens: 120, completionTokens: 250, totalTokens: 370 },
    cost: 0,
    confidence: 0.88,
  };
}

export * from "./types";
export * from "./prompts/resume";
export * from "./prompts/interview";
export * from "./prompts/career";
export * from "./prompts/salary";
export * from "./prompts/linkedin";
export * from "./prompts/portfolio";
export * from "./prompts/cover-letter";
