"use server";

import { generateAIResponse } from "@/services/ai";

export interface AIActionResult {
  success: boolean;
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
    if (data.userApiKey) {
      if (data.provider === "OPENAI" || !data.provider) {
        process.env.OPENAI_API_KEY = data.userApiKey;
      } else if (data.provider === "GEMINI") {
        process.env.GEMINI_API_KEY = data.userApiKey;
      } else if (data.provider === "CLAUDE") {
        process.env.ANTHROPIC_API_KEY = data.userApiKey;
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
    console.error(`[AI Action Error] Feature: ${data.feature}`, error);
    return {
      success: false,
      error: error.message || "Failed to generate AI response",
    };
  }
}
