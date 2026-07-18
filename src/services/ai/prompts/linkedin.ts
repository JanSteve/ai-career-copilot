import { z } from "zod";

export const LinkedInOptimizationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  suggestedHeadlines: z.array(z.string()),
  optimizedAboutSection: z.string(),
  experienceBulletEnhancements: z.array(
    z.object({
      original: z.string(),
      improved: z.string(),
      reason: z.string(),
    })
  ),
  skillsToHighlight: z.array(z.string()),
  profileVisibilityTips: z.array(z.string()),
});

export type LinkedInOptimization = z.infer<typeof LinkedInOptimizationSchema>;

export function getLinkedInOptimizationPrompt(profileData: {
  headline?: string;
  about?: string;
  currentRole?: string;
  skills?: string[];
  targetRole?: string;
}) {
  const systemPrompt = `You are a LinkedIn Growth Strategist and Executive Personal Branding Consultant. Optimize LinkedIn profiles for maximum recruiter reach, search visibility, and Social Selling Index (SSI). Return valid JSON only.`;

  const userPrompt = `Optimize the following LinkedIn profile data:
HEADLINE: ${profileData.headline || "Not provided"}
ABOUT: ${profileData.about || "Not provided"}
CURRENT ROLE: ${profileData.currentRole || "Not provided"}
SKILLS: ${profileData.skills?.join(", ") || "Not provided"}
TARGET ROLE: ${profileData.targetRole || "Not provided"}

Respond in JSON matching the schema.`;

  return {
    systemPrompt,
    userPrompt,
    schema: LinkedInOptimizationSchema,
  };
}
