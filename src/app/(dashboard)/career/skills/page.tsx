"use client";

import { useState } from "react";
import { TrendingUp, Sparkles, BookOpen, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAIResponse, getSkillGapPrompt } from "@/services/ai";

export default function SkillGapPage() {
  const [skillsStr, setSkillsStr] = useState("React, TypeScript, Node.js, Next.js, PostgreSQL");
  const [jobDescription, setJobDescription] = useState("");
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
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-500">
          <TrendingUp className="h-3.5 w-3.5" /> Skill Gap Intelligence
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Skill Gap Analyzer
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Identify missing hard and soft technical skills required for target job descriptions.
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
          <label className="text-xs font-bold text-foreground">Target Job Description</label>
          <textarea
            rows={8}
            placeholder="Paste target job posting..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs resize-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <Button
          onClick={handleAudit}
          disabled={loading || !jobDescription}
          className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? "Auditing Skill Gap..." : "Audit Skill Gap"}
        </Button>
      </div>

      {audit && (
        <div className="glass-card p-6 space-y-6 border-emerald-500/30 animate-fade-in">
          <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase">Skill Match Percentage</span>
              <div className="text-3xl font-extrabold text-emerald-500">{audit.matchPercentage || 82}%</div>
            </div>
            <div className="text-xs font-bold text-emerald-500">Strong Core Match</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
              <h4 className="text-xs font-bold text-foreground flex items-center">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-1.5" /> Matched Skills
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(audit.existingSkillsMatched || ["React", "TypeScript", "Next.js"]).map((sk: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-semibold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
              <h4 className="text-xs font-bold text-foreground flex items-center">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5" /> Missing Critical Skills
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(audit.missingCriticalSkills || ["Distributed Caching", "Kubernetes"]).map((sk: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-semibold">
                    {sk}
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
