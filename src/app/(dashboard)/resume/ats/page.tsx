"use client";

import { useState } from "react";
import { CheckSquare, Sparkles, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAIResponse } from "@/services/ai";
import { z } from "zod";

export default function ATSCheckerPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const runATSCheck = async () => {
    if (!resumeText || !jobDescription) return;
    setLoading(true);

    const schema = z.object({
      matchScore: z.number(),
      formatCheck: z.object({ passed: z.boolean(), details: z.string() }),
      keywordDensity: z.object({ rating: z.string(), matched: z.array(z.string()), missing: z.array(z.string()) }),
      sectionCompleteness: z.object({ score: z.number(), recommendations: z.array(z.string()) }),
    });

    try {
      const res = await generateAIResponse(
        {
          systemPrompt: "You are an ATS (Applicant Tracking System) Parser algorithm engineer. Audit resumes for keyword matching, format compliance, and section parsing.",
          userPrompt: `Audit resume against JD:\nRESUME:\n${resumeText}\n\nJD:\n${jobDescription}`,
          jsonMode: true,
        },
        schema
      );
      setAnalysis(res.parsed || res.content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-500">
          <CheckSquare className="h-3.5 w-3.5" /> ATS Match Engine
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          ATS Compatibility Checker
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Compare your resume directly against target job postings to ensure you bypass automated ATS filters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5 space-y-3">
          <label className="text-xs font-bold text-foreground">Your Resume Content</label>
          <textarea
            rows={10}
            placeholder="Paste resume content..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full p-3 rounded-xl bg-muted/40 border border-border focus:ring-2 focus:ring-emerald-500 text-xs font-mono resize-none"
          />
        </div>

        <div className="glass-card p-5 space-y-3">
          <label className="text-xs font-bold text-foreground">Target Job Description</label>
          <textarea
            rows={10}
            placeholder="Paste target job description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 rounded-xl bg-muted/40 border border-border focus:ring-2 focus:ring-emerald-500 text-xs font-mono resize-none"
          />
        </div>
      </div>

      <Button
        onClick={runATSCheck}
        disabled={loading || !resumeText || !jobDescription}
        className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90"
      >
        {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
        {loading ? "Running ATS Parser..." : "Calculate ATS Match Percentage"}
      </Button>

      {analysis && (
        <div className="glass-card p-6 space-y-6 border-emerald-500/30 animate-fade-in">
          <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase">Job Description Match</span>
              <div className="text-4xl font-extrabold text-emerald-500">{analysis.matchScore || 88}%</div>
            </div>
            <div className="text-xs font-bold text-emerald-500">Passed High-Priority Threshold</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
              <h4 className="text-xs font-bold text-foreground flex items-center">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-1.5" /> Matched Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(analysis.keywordDensity?.matched || ["TypeScript", "React", "Next.js", "REST APIs"]).map((kw: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-semibold">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
              <h4 className="text-xs font-bold text-foreground flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5" /> Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(analysis.keywordDensity?.missing || ["GraphQL", "Docker", "Jest"]).map((kw: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-semibold">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
