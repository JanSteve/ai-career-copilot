"use client";

import { useState } from "react";
import { Share2, Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAIResponse, getLinkedInOptimizationPrompt } from "@/services/ai";

export default function LinkedInOptimizerPage() {
  const [headline, setHeadline] = useState("Full Stack Developer at Acme Corp");
  const [about, setAbout] = useState("Passionate software engineer building web applications with React, Node.js and TypeScript.");
  const [targetRole, setTargetRole] = useState("Staff Frontend Engineer / Tech Lead");
  const [loading, setLoading] = useState(false);
  const [opt, setOpt] = useState<any>(null);

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const { systemPrompt, userPrompt, schema } = getLinkedInOptimizationPrompt({
        headline,
        about,
        targetRole,
      });
      const res = await generateAIResponse(
        {
          systemPrompt,
          userPrompt,
          jsonMode: true,
        },
        schema
      );
      setOpt(res.parsed || res.content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-bold text-amber-500">
          <Share2 className="h-3.5 w-3.5" /> LinkedIn Personal Branding
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          LinkedIn Profile Optimizer
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Transform your headline, about section, and experience to rank top in recruiter searches.
        </p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">Current LinkedIn Headline</label>
          <input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">Current About Section</label>
          <textarea
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs resize-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">Target Role Title</label>
          <input
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <Button
          onClick={handleOptimize}
          disabled={loading}
          className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs shadow-lg shadow-amber-500/20 hover:opacity-90"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? "Optimizing Profile Strategy..." : "Optimize LinkedIn Profile"}
        </Button>
      </div>

      {opt && (
        <div className="glass-card p-6 space-y-6 border-amber-500/30 animate-fade-in">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-foreground">High-Impact Headlines</h3>
            {(opt.suggestedHeadlines || [
              "Staff Frontend Engineer | Architecting High-Scale Web Apps | React & TypeScript Expert",
              "Tech Lead @ Fast-Growth Startup | Specializing in Micro-Frontends & Cloud Scaling",
            ]).map((hl: string, i: number) => (
              <div key={i} className="p-3 rounded-xl bg-muted/40 border border-border text-xs font-semibold text-foreground flex items-center justify-between">
                <span>{hl}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-foreground">Optimized About Summary</h3>
            <div className="p-4 rounded-xl bg-muted/30 border border-border text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
              {opt.optimizedAboutSection || "Senior Full Stack Architect with a passion for performance engineering..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
