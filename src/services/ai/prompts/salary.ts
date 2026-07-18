import { z } from "zod";

export const SalaryPredictionSchema = z.object({
  estimatedBaseSalary: z.object({
    low: z.number(),
    median: z.number(),
    high: z.number(),
  }),
  estimatedTotalComp: z.object({
    low: z.number(),
    median: z.number(),
    high: z.number(),
  }),
  currency: z.string(),
  salaryFactors: z.array(
    z.object({
      factor: z.string(),
      impact: z.enum(["POSITIVE", "NEGATIVE", "NEUTRAL"]),
      explanation: z.string(),
    })
  ),
  negotiationTips: z.array(z.string()),
  marketDemandLevel: z.enum(["VERY_HIGH", "HIGH", "MODERATE", "LOW"]),
});

export type SalaryPrediction = z.infer<typeof SalaryPredictionSchema>;

export function getSalaryPredictionPrompt(
  role: string,
  location: string,
  yearsExperience: number,
  skills: string[]
) {
  const systemPrompt = `You are a Compensation Intelligence Lead and Tech Executive Salary Negotiator. Predict compensation ranges based on role, geo-location market data, years of experience, and skill set. Return valid JSON only.`;

  const userPrompt = `Predict compensation for:
ROLE: ${role}
LOCATION: ${location}
EXPERIENCE: ${yearsExperience} years
KEY SKILLS: ${skills.join(", ")}

Respond in JSON matching the schema.`;

  return {
    systemPrompt,
    userPrompt,
    schema: SalaryPredictionSchema,
  };
}
