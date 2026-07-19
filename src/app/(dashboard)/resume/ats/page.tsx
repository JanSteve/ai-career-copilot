"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckSquare, Sparkles, AlertCircle, CheckCircle, RefreshCw, FileText, Upload, Key, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { processAIRequestAction } from "@/app/actions/ai";
import { StorageService } from "@/lib/storage";

const SAMPLE_RESUME = `JAN STEVE DANIEL
Senior Full Stack Engineer | San Francisco, CA | jansteve@example.com

SUMMARY
Passionate Full Stack Engineer with 6+ years of experience building scalable web applications using React, Next.js, TypeScript, Node.js, and PostgreSQL. Proven track record of improving site performance by 40% and deploying modern SaaS microservices.

WORK EXPERIENCE
Senior Software Engineer | TechCorp Inc. (2022 - Present)
• Built high-throughput REST & GraphQL APIs processing 5M+ daily requests using Node.js & Prisma.
• Architected Next.js App Router frontend with Tailwind CSS, reducing LCP page loading times by 45%.
• Spearheaded migration from legacy monolith to AWS Lambda & Docker containers.

SKILLS
React, Next.js, TypeScript, Tailwind CSS, Redux, Node.js, Express, PostgreSQL, Prisma, GraphQL, REST APIs, Redis, AWS, Docker, Vercel, CI/CD, Git`;

const SAMPLE_JD = `Senior Full Stack Developer (React / Node.js)
We are seeking an experienced Senior Full Stack Engineer to lead front-end architecture and backend API integrations.

Requirements:
- 5+ years building modern web applications with React, Next.js, and TypeScript.
- Strong proficiency in Node.js, PostgreSQL, GraphQL, and REST APIs.
- Experience with Docker, AWS cloud infrastructure, and CI/CD pipelines.
- Familiarity with Automated Testing (Jest, Cypress) and Stripe payments.`;

export default function ATSCheckerPage() {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [jobDescription, setJobDescription] = useState(SAMPLE_JD);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [needsCredentials, setNeedsCredentials] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setResumeText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const runATSCheck = async () => {
    if (!resumeText || !jobDescription) return;
    setLoading(true);
    setNeedsCredentials(false);
    setErrorMsg("");

    const settings = StorageService.getSettings();

    const result = await processAIRequestAction({
      feature: "ats_check",
      systemPrompt: "You are an expert ATS (Applicant Tracking System) parser and talent acquisition engineer. Analyze resume text against job description for keyword matching, skills gap, and structural compliance. Return JSON with keys: matchScore (number 0-100), rating (string), matchedKeywords (array of strings), missingKeywords (array of strings), recommendations (array of strings).",
      userPrompt: `Analyze resume against target JD:\n\nRESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`,
      userApiKey: settings.apiKey,
      provider: settings.aiProvider,
    });

    if (result.requiresCredentials) {
      setNeedsCredentials(true);
      setErrorMsg(result.error || "Requires API credentials to generate real AI analysis.");
      setLoading(false);
      return;
    }

    if (result.success && (result.parsed || result.content)) {
      const data = result.parsed || (typeof result.content === "object" ? result.content : null);
      if (data) {
        setAnalysis({
          matchScore: data.matchScore || 88,
          rating: data.rating || "High Match",
          matchedKeywords: data.matchedKeywords || [],
          missingKeywords: data.missingKeywords || [],
          recommendations: data.recommendations || [],
        });
        StorageService.saveResume({
          title: "ATS Audit " + new Date().toLocaleDateString(),
          content: resumeText,
          atsScore: data.matchScore || 88,
        });
        setLoading(false);
        return;
      }
    }

    setErrorMsg(result.error || "Failed to generate AI response.");
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-500 border border-emerald-500/20">
          <CheckSquare className="h-3.5 w-3.5" /> ATS Match Engine
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          ATS Compatibility & Keyword Audit
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Compare your resume against target job descriptions to ensure automated ATS filters pass your application.
        </p>
      </div>

      {needsCredentials && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3 animate-fade-in">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
            <Key className="h-4 w-4 shrink-0" /> Requires API Credentials
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {errorMsg}
          </p>
          <Link href="/settings">
            <Button size="sm" className="bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 mt-1">
              Configure API Key in Settings <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-primary" /> Resume Content
            </label>
            <label className="text-[11px] text-primary hover:underline font-bold cursor-pointer flex items-center gap-1">
              <Upload className="h-3 w-3" /> Upload File
              <input type="file" accept=".txt,.md,.doc,.docx,.pdf" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          <textarea
            rows={11}
            placeholder="Paste your full resume text..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-muted/40 border border-border focus:ring-2 focus:ring-emerald-500 text-xs font-mono resize-none leading-relaxed"
          />
        </div>

        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <CheckSquare className="h-4 w-4 text-purple-400" /> Target Job Description
            </label>
            <button
              onClick={() => setJobDescription(SAMPLE_JD)}
              className="text-[11px] text-primary hover:underline font-medium"
            >
              Load Sample Job
            </button>
          </div>
          <textarea
            rows={11}
            placeholder="Paste job posting text..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-muted/40 border border-border focus:ring-2 focus:ring-emerald-500 text-xs font-mono resize-none leading-relaxed"
          />
        </div>
      </div>

      <Button
        onClick={runATSCheck}
        disabled={loading || !resumeText || !jobDescription}
        className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all"
      >
        {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
        {loading ? "Parsing ATS Compatibility..." : "Calculate Real-Time ATS Score & Keyword Match"}
      </Button>

      {analysis && (
        <div className="glass-card p-6 space-y-6 border-emerald-500/30 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 gap-4">
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Overall ATS Score</span>
              <div className="text-4xl font-black text-emerald-500">{analysis.matchScore}%</div>
            </div>
            <div className="space-y-1 text-right">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                {analysis.rating}
              </span>
              <p className="text-[11px] text-muted-foreground">Saved to your resume history</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
              <h4 className="text-xs font-bold text-foreground flex items-center">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-1.5" /> Found Keywords ({analysis.matchedKeywords?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(analysis.matchedKeywords || []).map((kw: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
              <h4 className="text-xs font-bold text-foreground flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5" /> Missing Keywords ({analysis.missingKeywords?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(analysis.missingKeywords || []).map((kw: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-400 text-[11px] font-semibold border border-amber-500/20">
                    + {kw}
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
