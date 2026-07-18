import { z } from "zod";

export const ResumeAnalysisSchema = z.object({
  atsScore: z.number().min(0).max(100),
  overallGrade: z.string(),
  summary: z.string(),
  sections: z.object({
    contactInfo: z.object({ score: z.number(), feedback: z.string() }),
    summary: z.object({ score: z.number(), feedback: z.string() }),
    experience: z.object({ score: z.number(), feedback: z.string() }),
    skills: z.object({ score: z.number(), feedback: z.string() }),
    education: z.object({ score: z.number(), feedback: z.string() }),
  }),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  actionableImprovements: z.array(z.string()),
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
});

export type ResumeAnalysis = z.infer<typeof ResumeAnalysisSchema>;

export function getResumeAnalysisPrompt(resumeText: string, jobDescription?: string) {
  const systemPrompt = `You are a Principal Executive Recruiter and Senior Talent Acquisition Manager with 15+ years of experience analyzing resumes for top tech companies (Fortune 500, FAANG, high-growth startups).
Your job is to critically evaluate resumes, calculate ATS compatibility, identify key missing keywords, and provide clear, high-impact improvements. Return valid JSON only.`;

  const userPrompt = `Evaluate the following resume against industry standards${
    jobDescription ? " and the target job description provided" : ""
  }.

RESUME:
"""
${resumeText}
"""

${jobDescription ? `JOB DESCRIPTION:\n"""\n${jobDescription}\n"""` : ""}

Respond in JSON matching the required format.`;

  return {
    systemPrompt,
    userPrompt,
    schema: ResumeAnalysisSchema,
  };
}
