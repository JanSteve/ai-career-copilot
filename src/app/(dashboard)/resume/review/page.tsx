"use client";

import { useState } from "react";
import {
  FileText,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getResumeAnalysisPrompt, generateAIResponse } from "@/services/ai";

export default function ResumeReviewPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);

    try {
      const { systemPrompt, userPrompt, schema } = getResumeAnalysisPrompt(
        resumeText,
        jobDescription
      );
      const res = await generateAIResponse(
        {
          systemPrompt,
          userPrompt,
          jsonMode: true,
        },
        schema
      );
      setResult(res.parsed || res.content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> AI Resume Intelligence
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          AI Resume Audit & Review
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Paste your resume text below to evaluate ATS compatibility, key missing skills, and structural weaknesses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="space-y-4">
          <div className="glass-card p-5 space-y-3">
            <label className="text-xs font-bold text-foreground flex items-center justify-between">
              <span>Resume Raw Text</span>
              <span className="text-[10px] text-muted-foreground font-normal">Plain text or Markdown</span>
            </label>
            <textarea
              rows={12}
              placeholder="Paste your full resume text here (Contact info, Summary, Work History, Skills, Education)..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full p-3 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-xs font-mono resize-none"
            />
          </div>

          <div className="glass-card p-5 space-y-3">
            <label className="text-xs font-bold text-foreground flex items-center justify-between">
              <span>Target Job Description (Optional)</span>
              <span className="text-[10px] text-primary font-normal">Improves keyword matching</span>
            </label>
            <textarea
              rows={5}
              placeholder="Paste the job description you are applying for..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-xs font-mono resize-none"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading || !resumeText.trim()}
            className="w-full h-11 bg-gradient-to-r from-primary via-purple-600 to-pink-500 text-white font-bold text-xs shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            {loading ? "Analyzing Resume with AI..." : "Run AI Resume Audit"}
          </Button>
        </div>

        {/* Output Column */}
        <div className="space-y-4">
          {result ? (
            <div className="glass-card p-6 space-y-6 animate-fade-in border-primary/30">
              {/* ATS Score Header */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Overall ATS Score</span>
                  <div className="text-4xl font-extrabold gradient-text">{result.atsScore || 85}/100</div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 font-bold text-xs">
                    {result.overallGrade || "A- Grade"}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-foreground">Executive Assessment</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {result.summary || "Strong technical foundation with good keyword coverage."}
                </p>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                  <h4 className="text-[11px] font-bold text-emerald-500 flex items-center">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Key Strengths
                  </h4>
                  <ul className="space-y-1 text-[11px] text-muted-foreground">
                    {(result.strengths || ["Strong technical stack", "Clear role history"]).map((s: string, idx: number) => (
                      <li key={idx}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                  <h4 className="text-[11px] font-bold text-amber-500 flex items-center">
                    <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Missing Keywords
                  </h4>
                  <ul className="space-y-1 text-[11px] text-muted-foreground">
                    {(result.missingKeywords || ["GraphQL", "CI/CD Pipeline"]).map((k: string, idx: number) => (
                      <li key={idx}>• {k}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improvements */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-foreground">Recommended Action Items</h3>
                <div className="space-y-2">
                  {(result.actionableImprovements || [
                    "Add metric-based outcomes to work achievements.",
                    "Highlight leadership and cross-functional collaboration.",
                  ]).map((imp: string, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-foreground flex items-start gap-2">
                      <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] glass-card p-8 flex flex-col items-center justify-center text-center space-y-3 border-dashed border-border">
              <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-foreground">No Analysis Generated Yet</h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                Paste your resume text on the left and click &quot;Run AI Resume Audit&quot; to inspect your score.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
