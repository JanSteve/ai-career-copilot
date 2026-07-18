"use client";

import { useState } from "react";
import { Compass, Sparkles, CheckCircle2, RefreshCw, Milestone, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateAIResponse, getCareerRoadmapPrompt } from "@/services/ai";

export default function CareerRoadmapPage() {
  const [currentRole, setCurrentRole] = useState("Senior Fullstack Developer");
  const [targetRole, setTargetRole] = useState("Principal Software Architect");
  const [experience, setExperience] = useState(6);
  const [skillsStr, setSkillsStr] = useState("React, Node.js, TypeScript, PostgreSQL, AWS");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const skillsArr = skillsStr.split(",").map((s) => s.trim());
      const { systemPrompt, userPrompt, schema } = getCareerRoadmapPrompt(
        currentRole,
        targetRole,
        experience,
        skillsArr
      );
      const res = await generateAIResponse(
        {
          systemPrompt,
          userPrompt,
          jsonMode: true,
        },
        schema
      );
      setRoadmap(res.parsed || res.content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-xs font-bold text-pink-500">
          <Compass className="h-3.5 w-3.5" /> Career Intelligence Engine
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Autonomous Career Roadmap
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Generate a tailored 6-12 month execution plan to reach your target senior or executive position.
        </p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Current Title</label>
            <Input value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} className="text-xs h-10" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Target Role</label>
            <Input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="text-xs h-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Years of Experience</label>
            <Input type="number" value={experience} onChange={(e) => setExperience(Number(e.target.value))} className="text-xs h-10" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Current Core Skills</label>
            <Input value={skillsStr} onChange={(e) => setSkillsStr(e.target.value)} className="text-xs h-10" />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full h-11 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 hover:opacity-90"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? "Generating Career Roadmap..." : "Generate 6-12 Month Roadmap"}
        </Button>
      </div>

      {roadmap && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase">Target Readiness Score</span>
              <div className="text-3xl font-extrabold text-pink-500">
                {roadmap.currentReadinessScore || 78}%
              </div>
            </div>
            <div className="text-xs font-bold text-pink-500">{roadmap.timeframe || "6 Months Execution"}</div>
          </div>

          <div className="space-y-4">
            {(roadmap.phases || [
              {
                phaseName: "Phase 1: Deep Distributed Systems Architecture",
                duration: "Months 1-2",
                focus: "Master Kafka event-driven pipelines and high-throughput databases",
                actionItems: ["Deploy event-driven prototype using Kafka", "Audit system bottlenecks"],
              },
              {
                phaseName: "Phase 2: Executive Technical Leadership",
                duration: "Months 3-4",
                focus: "Lead cross-team RFC architecture reviews and technical strategy",
                actionItems: ["Author RFC document for company-wide API standards", "Mentor 2 senior engineers"],
              },
            ]).map((p: any, i: number) => (
              <div key={i} className="glass-card p-6 space-y-3 border-pink-500/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Milestone className="h-4 w-4 text-pink-500" /> {p.phaseName}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-500 text-[10px] font-bold">
                    {p.duration}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{p.focus}</p>
                <div className="space-y-1.5 pt-2">
                  {p.actionItems?.map((act: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
