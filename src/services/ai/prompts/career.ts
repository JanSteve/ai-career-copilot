import { z } from "zod";

export const CareerRoadmapSchema = z.object({
  targetRole: z.string(),
  timeframe: z.string(),
  currentReadinessScore: z.number().min(0).max(100),
  phases: z.array(
    z.object({
      phaseName: z.string(),
      duration: z.string(),
      focus: z.string(),
      actionItems: z.array(z.string()),
      keyMilestones: z.array(z.string()),
      recommendedCourses: z.array(z.string()),
    })
  ),
  criticalSkillsToLearn: z.array(z.string()),
  portfolioProjectIdeas: z.array(z.string()),
});

export const SkillGapSchema = z.object({
  matchPercentage: z.number().min(0).max(100),
  existingSkillsMatched: z.array(z.string()),
  missingCriticalSkills: z.array(z.string()),
  missingNiceToHaveSkills: z.array(z.string()),
  recommendations: z.array(
    z.object({
      skill: z.string(),
      priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
      learningResource: z.string(),
      estimatedTimeToMaster: z.string(),
    })
  ),
});

export type CareerRoadmap = z.infer<typeof CareerRoadmapSchema>;
export type SkillGap = z.infer<typeof SkillGapSchema>;

export function getCareerRoadmapPrompt(
  currentRole: string,
  targetRole: string,
  experienceYears: number,
  skills: string[]
) {
  const systemPrompt = `You are a Principal Career Architect and Tech Executive Counselor.
You design realistic, actionable, step-by-step career acceleration roadmaps for tech professionals. Return valid JSON only.`;

  const userPrompt = `Create a 6-12 month career roadmap to transition from:
CURRENT ROLE: ${currentRole} (${experienceYears} years experience)
CURRENT SKILLS: ${skills.join(", ")}
TARGET ROLE: ${targetRole}

Provide a structured roadmap in JSON matching the schema.`;

  return {
    systemPrompt,
    userPrompt,
    schema: CareerRoadmapSchema,
  };
}

export function getSkillGapPrompt(currentSkills: string[], targetJobDescription: string) {
  const systemPrompt = `You are a Technical Skill Gap Auditor. Analyze a candidate's current skills against a job description, identify missing skills, and suggest targeted learning resources. Return valid JSON only.`;

  const userPrompt = `CURRENT SKILLS: ${currentSkills.join(", ")}
TARGET JOB DESCRIPTION:
"""
${targetJobDescription}
"""

Provide a detailed skill gap audit in JSON matching the schema.`;

  return {
    systemPrompt,
    userPrompt,
    schema: SkillGapSchema,
  };
}
