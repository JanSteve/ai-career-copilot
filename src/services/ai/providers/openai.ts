import OpenAI from "openai";
import { z } from "zod";
import {
  AIProvider,
  AIProviderInterface,
  AIRequestOptions,
  AIResponse,
} from "../types";

export class OpenAIProvider implements AIProviderInterface {
  name = AIProvider.OPENAI;
  private client: OpenAI | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  async generateResponse<T = any>(
    options: AIRequestOptions,
    schema?: z.ZodSchema<T>
  ): Promise<AIResponse<T>> {
    if (!this.client) {
      throw new Error("OpenAI API key not configured.");
    }

    const model = options.model || "gpt-4o";
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: "system", content: options.systemPrompt },
      { role: "user", content: options.userPrompt },
    ];

    const response = await this.client.chat.completions.create({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2000,
      response_format: options.jsonMode
        ? { type: "json_object" }
        : undefined,
    });

    const content = response.choices[0]?.message?.content || "";
    const promptTokens = response.usage?.prompt_tokens || 0;
    const completionTokens = response.usage?.completion_tokens || 0;
    const totalTokens = response.usage?.total_tokens || 0;

    // Approximate cost estimation (e.g. GPT-4o pricing)
    const cost = (promptTokens * 2.5 + completionTokens * 10) / 1000000;

    let parsed: T | undefined;
    let confidence = 0.92;

    if (schema && content) {
      try {
        const json = JSON.parse(content);
        parsed = schema.parse(json);
      } catch (e) {
        confidence = 0.65;
      }
    }

    return {
      content,
      parsed,
      provider: this.name,
      model,
      tokens: { promptTokens, completionTokens, totalTokens },
      cost,
      confidence,
    };
  }
}
