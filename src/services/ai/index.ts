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

export class RequiresApiCredentialsError extends Error {
  constructor(message?: string) {
    super(
      message ||
        "Requires API credentials: No active AI API key found. Please configure OPENAI_API_KEY, GEMINI_API_KEY, or ANTHROPIC_API_KEY in your environment variables or Settings page."
    );
    this.name = "RequiresApiCredentialsError";
  }
}

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

    // Check if provider has active key
    const hasKey =
      (providerKey === AIProvider.OPENAI && process.env.OPENAI_API_KEY) ||
      (providerKey === AIProvider.GEMINI && process.env.GEMINI_API_KEY) ||
      (providerKey === AIProvider.CLAUDE && process.env.ANTHROPIC_API_KEY);

    if (!hasKey) {
      continue;
    }

    try {
      return await provider.generateResponse(options, schema);
    } catch (error: any) {
      console.warn(`AI Provider ${providerKey} failed:`, error?.message || error);
      lastError = error;
    }
  }

  // Strictly adhere to non-negotiable rule: Never fake AI output when keys are missing.
  throw new RequiresApiCredentialsError(
    lastError
      ? `AI Provider Error: ${lastError.message || lastError}`
      : "Requires API credentials: No active AI API key found. Please configure OPENAI_API_KEY, GEMINI_API_KEY, or ANTHROPIC_API_KEY in your environment variables or Settings page."
  );
}

export * from "./types";
export * from "./prompts/resume";
export * from "./prompts/interview";
export * from "./prompts/career";
export * from "./prompts/salary";
export * from "./prompts/linkedin";
export * from "./prompts/portfolio";
export * from "./prompts/cover-letter";
