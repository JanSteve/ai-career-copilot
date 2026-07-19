"use server";

import { generateAIResponse, RequiresApiCredentialsError } from "@/services/ai";

export interface AIActionResult {
  success: boolean;
  requiresCredentials?: boolean;
  content?: any;
  parsed?: any;
  provider?: string;
  confidence?: number;
  tokens?: number;
  error?: string;
}

export async function processAIRequestAction(data: {
  feature: string;
  systemPrompt: string;
  userPrompt: string;
  jsonMode?: boolean;
  userApiKey?: string;
  provider?: "OPENAI" | "GEMINI" | "CLAUDE";
}): Promise<AIActionResult> {
  try {
    if (data.userApiKey && data.userApiKey.trim().length > 5) {
      if (data.provider === "OPENAI" || !data.provider) {
        process.env.OPENAI_API_KEY = data.userApiKey.trim();
      } else if (data.provider === "GEMINI") {
        process.env.GEMINI_API_KEY = data.userApiKey.trim();
      } else if (data.provider === "CLAUDE") {
        process.env.ANTHROPIC_API_KEY = data.userApiKey.trim();
      }
    }

    const response = await generateAIResponse({
      systemPrompt: data.systemPrompt,
      userPrompt: data.userPrompt,
      jsonMode: data.jsonMode ?? true,
      provider: data.provider,
    });

    const totalTokens = typeof response.tokens === "number" ? response.tokens : response.tokens?.totalTokens || 0;

    return {
      success: true,
      content: response.content,
      parsed: response.parsed,
      provider: response.provider,
      confidence: response.confidence,
      tokens: totalTokens,
    };
  } catch (error: any) {
    const isCredentialsError = error instanceof RequiresApiCredentialsError || error?.name === "RequiresApiCredentialsError";

    return {
      success: false,
      requiresCredentials: isCredentialsError,
      error: error.message || "Failed to generate AI response",
    };
  }
}
