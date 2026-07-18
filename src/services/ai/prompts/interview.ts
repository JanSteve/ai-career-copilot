import { z } from "zod";

export const InterviewQuestionsSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      category: z.enum(["BEHAVIORAL", "TECHNICAL", "SYSTEM_DESIGN", "SITUATIONAL"]),
      question: z.string(),
      context: z.string(),
      sampleAnswerTips: z.array(z.string()),
      expectedKeywords: z.array(z.string()),
    })
  ),
});

export const InterviewFeedbackSchema = z.object({
  overallScore: z.number().min(0).max(100),
  clarityScore: z.number().min(0).max(100),
  relevanceScore: z.number().min(0).max(100),
  starMethodScore: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  improvedAnswerSample: z.string(),
  detailedFeedback: z.string(),
});

export type InterviewQuestions = z.infer<typeof InterviewQuestionsSchema>;
export type InterviewFeedback = z.infer<typeof InterviewFeedbackSchema>;

export function getInterviewQuestionsPrompt(role: string, level: string, company?: string) {
  const systemPrompt = `You are an expert Engineering Director and Hiring Manager conducting interviews at premier technology firms.
Generate realistic, high-signal interview questions tailored to the position, seniority level, and company domain. Return valid JSON only.`;

  const userPrompt = `Generate 5 interview questions for a ${level} ${role} position${
    company ? ` at ${company}` : ""
  }.
Include behavioral, technical, situational, and system design questions appropriate for the level.

Respond in JSON matching the schema.`;

  return {
    systemPrompt,
    userPrompt,
    schema: InterviewQuestionsSchema,
  };
}

export function getInterviewFeedbackPrompt(question: string, userAnswer: string, role: string) {
  const systemPrompt = `You are a Senior Interview Coach helping candidates master technical and behavioral interviews using the STAR method (Situation, Task, Action, Result).
Analyze the candidate's answer thoroughly, provide detailed scoring, and write a top-tier example answer. Return valid JSON only.`;

  const userPrompt = `ROLE: ${role}
QUESTION: ${question}
CANDIDATE ANSWER: ${userAnswer}

Provide comprehensive evaluation and feedback in JSON matching the schema.`;

  return {
    systemPrompt,
    userPrompt,
    schema: InterviewFeedbackSchema,
  };
}
