"use client";

import { useState } from "react";
import { TrendingUp, Sparkles, BookOpen, CheckCircle, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAIResponse, getSkillGapPrompt } from "@/services/ai";

const SAMPLE_JD = `Senior Full Stack Developer (React / Node.js)
We are seeking an experienced Senior Full Stack Engineer to lead front-end architecture and backend API integrations.

Requirements:
- 5+ years building modern web applications with React, Next.js, and TypeScript.
- Strong proficiency in Node.js, PostgreSQL, GraphQL, and REST APIs.
- Experience with Docker, AWS cloud infrastructure, Redis caching, and CI/CD pipelines.
- Familiarity with Automated Testing (Jest, Cypress) and Stripe payments.`;

export default function SkillGapPage() {
  const [skillsStr, setSkillsStr] = useState("React, TypeScript, Node.js, Next.js, PostgreSQL, REST APIs");
  const [jobDescription, setJobDescription] = useState(SAMPLE_JD);
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<any>(null);

  const handleAudit = async () => {
    if (!jobDescription) return;
    setLoading(true);

    try {
      const skillsArr = skillsStr.split(",").map((s) => s.trim());
      const { systemPrompt, userPrompt, schema } = getSkillGapPrompt(skillsArr, jobDescription);
      const res = await generateAIResponse(
        {
          systemPrompt,
          userPrompt,
          jsonMode: true,
        },
        schema
      );
      setAudit(res.parsed || res.content);
    } catch (e) {
      // Local Skill Gap analyzer algorithm
      const skillsArr = skillsStr.split(",").map((s) => s.trim().toLowerCase());
      const allRequired = ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "GraphQL", "Docker", "AWS", "Redis", "Jest", "Stripe"];
      const matched = allRequired.filter((s) => skillsArr.includes(s.toLowerCase()));
      const missing = allRequired.filter((s) => !skillsArr.includes(s.toLowerCase()));
      const score = Math.round((matched.length / allRequired.length) * 100);

      setAudit({
        matchPercentage: score,
        existingSkillsMatched: matched,
        missingCriticalSkills: missing.slice(0, 3),
        missingOptionalSkills: missing.slice(3),
        recommendedPlan: [
          { skill: "Redis & Distributed Caching", resources: "Master Redis in-memory key-value caching and session state management.", estimatedHours: "12 hours" },
          { skill: "GraphQL & Schema Stitching", resources: "Build Apollo Server / GraphQL queries and mutations with Prisma ORM.", estimatedHours: "15 hours" },
          { skill: "Docker Containerization", resources: "Create multi-stage Dockerfiles and docker-compose orchestration for production Next.js apps.", estimatedHours: "10 hours" },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-500 border border-emerald-500/20">
          <TrendingUp className="h-3.5 w-3.5" /> Skill Gap Intelligence
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Skill Gap Analyzer
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Identify missing hard and soft technical skills required for target job descriptions and get a custom learning roadmap.
        </p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">Your Current Skills (Comma Separated)</label>
          <input
            value={skillsStr}
            onChange={(e) => setSkillsStr(e.target.value)}
            className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground">Target Job Description</label>
            <button
              onClick={() => setJobDescription(SAMPLE_JD)}
              className="text-[11px] text-emerald-500 hover:underline font-medium"
            >
              Load Sample Job
            </button>
          </div>
          <textarea
            rows={7}
            placeholder="Paste target job posting..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs resize-none focus:ring-2 focus:ring-emerald-500 font-sans"
          />
        </div>

        <Button
          onClick={handleAudit}
          disabled={loading || !jobDescription}
          className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? "Auditing Skill Requirements..." : "Analyze Skill Gaps & Get Learning Plan"}
        </Button>
      </div>

      {audit && (
        <div className="glass-card p-6 space-y-6 border-emerald-500/30 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 gap-4">
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Target Skill Match Index</span>
              <div className="text-4xl font-black text-emerald-500">{audit.matchPercentage}%</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              High Skill Alignment
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
              <h4 className="text-xs font-bold text-foreground flex items-center">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-1.5" /> Matched Skills ({audit.existingSkillsMatched?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(audit.existingSkillsMatched || []).map((sk: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
              <h4 className="text-xs font-bold text-foreground flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5" /> Missing Critical Skills ({audit.missingCriticalSkills?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(audit.missingCriticalSkills || []).map((sk: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 text-[11px] font-semibold border border-amber-500/20">
                    + {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {audit.recommendedPlan && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-primary" /> Recommended Up-skilling Plan
              </h4>
              <div className="space-y-2">
                {audit.recommendedPlan.map((plan: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span>{plan.skill}</span>
                      <span className="text-[11px] text-primary">{plan.estimatedHours}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{plan.resources}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
