"use client";

import { useState } from "react";
import { DollarSign, Sparkles, TrendingUp, RefreshCw, Zap, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateAIResponse, getSalaryPredictionPrompt } from "@/services/ai";

export default function SalaryPredictorPage() {
  const [role, setRole] = useState("Staff Software Engineer");
  const [location, setLocation] = useState("San Francisco, CA / Remote");
  const [experience, setExperience] = useState(7);
  const [skillsStr, setSkillsStr] = useState("React, Next.js, System Architecture, Node.js");
  const [loading, setLoading] = useState(false);
  const [pred, setPred] = useState<any>(null);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const skillsArr = skillsStr.split(",").map((s) => s.trim());
      const { systemPrompt, userPrompt, schema } = getSalaryPredictionPrompt(role, location, experience, skillsArr);
      const res = await generateAIResponse(
        {
          systemPrompt,
          userPrompt,
          jsonMode: true,
        },
        schema
      );
      setPred(res.parsed || res.content);
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
          <DollarSign className="h-3.5 w-3.5" /> Compensation Intelligence
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Salary & Negotiation Predictor
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Predict market compensation bands and get high-leverage offer negotiation scripts.
        </p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Role Title</label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} className="text-xs h-10" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Location / Work Type</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} className="text-xs h-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Years Experience</label>
            <Input type="number" value={experience} onChange={(e) => setExperience(Number(e.target.value))} className="text-xs h-10" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Skills</label>
            <Input value={skillsStr} onChange={(e) => setSkillsStr(e.target.value)} className="text-xs h-10" />
          </div>
        </div>

        <Button
          onClick={handlePredict}
          disabled={loading}
          className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? "Calculating Market Compensation..." : "Predict Salary & Compensation"}
        </Button>
      </div>

      {pred && (
        <div className="glass-card p-6 space-y-6 border-emerald-500/30 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase">Estimated Base Salary</span>
              <div className="text-3xl font-extrabold text-emerald-500">
                ${pred.estimatedBaseSalary?.median?.toLocaleString() || "195,000"} <span className="text-xs font-normal text-muted-foreground">/yr</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Range: ${pred.estimatedBaseSalary?.low?.toLocaleString() || "170k"} - ${pred.estimatedBaseSalary?.high?.toLocaleString() || "225k"}</p>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase">Estimated Total Comp (Inc. Equity)</span>
              <div className="text-3xl font-extrabold text-purple-500">
                ${pred.estimatedTotalComp?.median?.toLocaleString() || "250,000"} <span className="text-xs font-normal text-muted-foreground">/yr</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Range: ${pred.estimatedTotalComp?.low?.toLocaleString() || "210k"} - ${pred.estimatedTotalComp?.high?.toLocaleString() || "310k"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-foreground">Offer Negotiation Talking Points</h4>
            <div className="space-y-2">
              {(pred.negotiationTips || [
                "Anchor base salary counter-offer 12% above initial recruiter offer.",
                "Request equity vesting acceleration clause or signing bonus to bridge gap.",
              ]).map((tip: string, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
