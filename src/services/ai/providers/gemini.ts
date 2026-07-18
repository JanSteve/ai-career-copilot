import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import {
  AIProvider,
  AIProviderInterface,
  AIRequestOptions,
  AIResponse,
} from "../types";

export class GeminiProvider implements AIProviderInterface {
  name = AIProvider.GEMINI;
  private client: GoogleGenerativeAI | null = null;

  constructor() {
    if (process.env.GOOGLE_GEMINI_API_KEY) {
      this.client = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    }
  }

  async generateResponse<T = any>(
    options: AIRequestOptions,
    schema?: z.ZodSchema<T>
  ): Promise<AIResponse<T>> {
    if (!this.client) {
      throw new Error("Google Gemini API key not configured.");
    }

    const modelName = options.model || "gemini-2.0-flash";
    const model = this.client.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens ?? 2000,
        responseMimeType: options.jsonMode ? "application/json" : undefined,
      },
      systemInstruction: options.systemPrompt,
    });

    const result = await model.generateContent(options.userPrompt);
    const response = await result.response;
    const content = response.text() || "";

    const promptTokens = response.usageMetadata?.promptTokenCount || 0;
    const completionTokens = response.usageMetadata?.candidatesTokenCount || 0;
    const totalTokens = response.usageMetadata?.totalTokenCount || 0;

    const cost = (promptTokens * 0.1 + completionTokens * 0.4) / 1000000;

    let parsed: T | undefined;
    let confidence = 0.9;

    if (schema && content) {
      try {
        const json = JSON.parse(content);
        parsed = schema.parse(json);
      } catch (e) {
        confidence = 0.6;
      }
    }

    return {
      content,
      parsed,
      provider: this.name,
      model: modelName,
      tokens: { promptTokens, completionTokens, totalTokens },
      cost,
      confidence,
    };
  }
}
