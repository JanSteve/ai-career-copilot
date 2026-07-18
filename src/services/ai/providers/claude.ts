import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import {
  AIProvider,
  AIProviderInterface,
  AIRequestOptions,
  AIResponse,
} from "../types";

export class ClaudeProvider implements AIProviderInterface {
  name = AIProvider.CLAUDE;
  private client: Anthropic | null = null;

  constructor() {
    if (process.env.ANTHROPIC_API_KEY) {
      this.client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  async generateResponse<T = any>(
    options: AIRequestOptions,
    schema?: z.ZodSchema<T>
  ): Promise<AIResponse<T>> {
    if (!this.client) {
      throw new Error("Anthropic Claude API key not configured.");
    }

    const model = options.model || "claude-3-5-sonnet-20241022";
    const response = await this.client.messages.create({
      model,
      system: options.systemPrompt,
      messages: [{ role: "user", content: options.userPrompt }],
      max_tokens: options.maxTokens ?? 2000,
      temperature: options.temperature ?? 0.7,
    });

    const content =
      response.content[0].type === "text" ? response.content[0].text : "";
    const promptTokens = response.usage.input_tokens || 0;
    const completionTokens = response.usage.output_tokens || 0;
    const totalTokens = promptTokens + completionTokens;

    const cost = (promptTokens * 3.0 + completionTokens * 15.0) / 1000000;

    let parsed: T | undefined;
    let confidence = 0.94;

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
