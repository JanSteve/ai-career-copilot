import { z } from "zod";

export enum AIProvider {
  OPENAI = "openai",
  GEMINI = "gemini",
  CLAUDE = "claude",
}

export interface AIRequestOptions {
  systemPrompt: string;
  userPrompt: string;
  provider?: AIProvider | string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

export interface AIResponse<T = any> {
  content: string;
  parsed?: T;
  provider: string;
  model: string;
  tokens: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  cost: number;
  confidence: number;
}

export interface AIProviderInterface {
  name: AIProvider;
  generateResponse<T = any>(
    options: AIRequestOptions,
    schema?: z.ZodSchema<T>
  ): Promise<AIResponse<T>>;
}
