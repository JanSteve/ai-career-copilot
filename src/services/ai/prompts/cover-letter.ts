import { z } from "zod";

export const CoverLetterSchema = z.object({
  coverLetterText: z.string(),
  matchingPointsHighlighted: z.array(z.string()),
  tone: z.string(),
  estimatedReadTime: z.string(),
});

export type CoverLetterResult = z.infer<typeof CoverLetterSchema>;

export function getCoverLetterPrompt(
  resumeText: string,
  jobDescription: string,
  companyName: string,
  positionName: string
) {
  const systemPrompt = `You are a Executive Speechwriter and Professional Career Specialist. Craft compelling, highly personalized cover letters that hook recruiters instantly without sounding generic or overly formal. Return valid JSON only.`;

  const userPrompt = `Generate a compelling cover letter for:
COMPANY: ${companyName}
POSITION: ${positionName}

RESUME:
"""
${resumeText}
"""

JOB DESCRIPTION:
"""
${jobDescription}
"""

Respond in JSON matching the schema.`;

  return {
    systemPrompt,
    userPrompt,
    schema: CoverLetterSchema,
  };
}
