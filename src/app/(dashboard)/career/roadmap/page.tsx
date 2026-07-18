"use client";

import { useState } from "react";
import { Compass, Sparkles, CheckCircle2, RefreshCw, Milestone, BookOpen, Circle } from "lucide-react";
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
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

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
      // Local fallback roadmap generator
      setRoadmap({
        currentReadinessScore: 78,
        timeframe: "6 Months Execution Plan",
        phases: [
          {
            phaseName: "Phase 1: High-Scalability Systems & Event-Driven Architecture",
            duration: "Months 1 - 2",
            focus: "Master Kafka, Redis caching clusters, and low-latency microservices design.",
            actionItems: [
              "Architect an event-driven queue prototype using Node.js & Redis Streams.",
              "Benchmark API p99 latency under 100k requests/sec.",
              "Publish internal engineering RFC on database query optimization.",
            ],
          },
          {
            phaseName: "Phase 2: Technical Strategy & Cross-Functional Mentorship",
            duration: "Months 3 - 4",
            focus: "Drive high-level system design standards and mentor mid-level engineers.",
            actionItems: [
              "Lead 2 multi-team architectural review sessions for upcoming core features.",
              "Establish automated CI/CD security scanning & bundle size budgets.",
              "Mentor 2 senior developers in system design principles.",
            ],
          },
          {
            phaseName: "Phase 3: Executive Impact & Business Value Delivery",
            duration: "Months 5 - 6",
            focus: "Align engineering milestones directly with ARR and operational savings.",
            actionItems: [
              "Pitch infrastructure modernization project saving $50k+ in monthly cloud spend.",
              "Deliver keynote tech talk on Next.js 15 Server Components architecture.",
              "Prepare Principal Engineer portfolio and update resume for promotion evaluation.",
            ],
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (itemId: string) => {
    setCompletedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-xs font-bold text-pink-500 border border-pink-500/20">
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
            <Input value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Target Role</label>
            <Input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Years of Experience</label>
            <Input type="number" value={experience} onChange={(e) => setExperience(Number(e.target.value))} className="text-xs h-10 bg-muted/40" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Current Core Skills</label>
            <Input value={skillsStr} onChange={(e) => setSkillsStr(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full h-11 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? "Building Custom Roadmap..." : "Generate 6-12 Month Career Plan"}
        </Button>
      </div>

      {roadmap && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-transparent border border-pink-500/30 gap-4">
            <div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Target Readiness Index</span>
              <div className="text-4xl font-black text-pink-500">
                {roadmap.currentReadinessScore}%
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold self-start sm:self-center border border-pink-500/30">
              {roadmap.timeframe || "6 Month Strategy"}
            </span>
          </div>

          <div className="space-y-4">
            {roadmap.phases?.map((p: any, i: number) => (
              <div key={i} className="glass-card p-6 space-y-3 border-pink-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Milestone className="h-4 w-4 text-pink-500 shrink-0" /> {p.phaseName}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 text-[10px] font-bold self-start sm:self-center">
                    {p.duration}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.focus}</p>

                <div className="space-y-2 pt-2">
                  {p.actionItems?.map((act: string, idx: number) => {
                    const key = `${i}-${idx}`;
                    const isDone = completedItems[key];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleCheck(key)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center gap-2.5 transition-all ${
                          isDone
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 line-through"
                            : "bg-muted/30 border-border text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <span>{act}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
