import { z } from "zod";

export const PortfolioAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  designRating: z.number().min(0).max(10),
  codeQualityRating: z.number().min(0).max(10),
  uxRating: z.number().min(0).max(10),
  projectPresentations: z.array(
    z.object({
      projectName: z.string(),
      feedback: z.string(),
      missingElements: z.array(z.string()),
    })
  ),
  recommendedProjectsToBuild: z.array(z.string()),
  keyActionItems: z.array(z.string()),
});

export type PortfolioAnalysis = z.infer<typeof PortfolioAnalysisSchema>;

export function getPortfolioAnalysisPrompt(portfolioUrlOrText: string, githubUrlOrText?: string) {
  const systemPrompt = `You are a Tech Lead and Hiring Director reviewing developer portfolios and GitHub accounts. Provide critical, constructive feedback on project depth, visual presentation, code architecture, and hiring readiness. Return valid JSON only.`;

  const userPrompt = `Review the following developer portfolio/GitHub representation:
PORTFOLIO: ${portfolioUrlOrText}
${githubUrlOrText ? `GITHUB: ${githubUrlOrText}` : ""}

Respond in JSON matching the schema.`;

  return {
    systemPrompt,
    userPrompt,
    schema: PortfolioAnalysisSchema,
  };
}
