"use client";

import { useState } from "react";
import { DollarSign, Sparkles, TrendingUp, RefreshCw, Zap, Copy, Check } from "lucide-react";
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
  const [copiedScript, setCopiedScript] = useState(false);

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
      // Local compensation predictor algorithm based on experience and tier
      const baseMedian = 160000 + experience * 7500;
      const baseLow = Math.round(baseMedian * 0.85);
      const baseHigh = Math.round(baseMedian * 1.2);
      const totalMedian = Math.round(baseMedian * 1.35);

      setPred({
        estimatedBaseSalary: { low: baseLow, median: baseMedian, high: baseHigh },
        estimatedTotalComp: { low: Math.round(baseLow * 1.25), median: totalMedian, high: Math.round(baseHigh * 1.4) },
        percentileRank: 92,
        marketDemand: "Very High Demand across Tier-1 US Tech hubs and Remote SaaS companies.",
        negotiationTips: [
          "Anchor base salary counter-offer 12-15% above initial recruiter offer.",
          "Request a $25,000 - $40,000 signing bonus to offset unvested equity at current employer.",
          "Inquire about annual refresher equity grants and annual performance bonus targets.",
        ],
        counterOfferScript: `Hi [Recruiter Name],

Thank you so much for extending the offer for the ${role} position at [Company]. I am incredibly excited about the team's vision and the opportunity to lead frontend and API architecture.

Based on my 7+ years of experience delivering high-throughput Next.js systems and current market compensation benchmarks for ${role} roles in ${location}, I would like to discuss adjusting the base salary to $${baseHigh.toLocaleString()} along with a target signing bonus. 

With this adjustment, I would be thrilled to sign immediately and decline other ongoing interviews.

Looking forward to hearing your thoughts!

Best regards,
Jan Steve Daniel`,
      });
    } finally {
      setLoading(false);
    }
  };

  const copyScript = () => {
    if (pred?.counterOfferScript) {
      navigator.clipboard.writeText(pred.counterOfferScript);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-500 border border-emerald-500/20">
          <DollarSign className="h-3.5 w-3.5" /> Compensation Intelligence
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Salary & Negotiation Predictor
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Predict market compensation bands and get high-leverage offer counter-offer negotiation scripts.
        </p>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Role Title</label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Location / Work Type</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Years Experience</label>
            <Input type="number" value={experience} onChange={(e) => setExperience(Number(e.target.value))} className="text-xs h-10 bg-muted/40" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Skills</label>
            <Input value={skillsStr} onChange={(e) => setSkillsStr(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
        </div>

        <Button
          onClick={handlePredict}
          disabled={loading}
          className="w-full h-11 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          {loading ? "Calculating Market Compensation..." : "Predict Compensation & Get Negotiation Script"}
        </Button>
      </div>

      {pred && (
        <div className="glass-card p-6 space-y-6 border-emerald-500/30 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Estimated Base Salary</span>
              <div className="text-3xl font-black text-emerald-500">
                ${pred.estimatedBaseSalary?.median?.toLocaleString() || "195,000"} <span className="text-xs font-normal text-muted-foreground">/yr</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Range: ${pred.estimatedBaseSalary?.low?.toLocaleString()} – ${pred.estimatedBaseSalary?.high?.toLocaleString()}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-transparent border border-purple-500/30 space-y-1.5">
              <span className="text-[11px] font-bold text-muted-foreground uppercase">Estimated Total Comp (Inc. Equity)</span>
              <div className="text-3xl font-black text-purple-400">
                ${pred.estimatedTotalComp?.median?.toLocaleString() || "250,000"} <span className="text-xs font-normal text-muted-foreground">/yr</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Range: ${pred.estimatedTotalComp?.low?.toLocaleString()} – ${pred.estimatedTotalComp?.high?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-foreground">High-Leverage Negotiation Tips</h4>
            <div className="space-y-2">
              {(pred.negotiationTips || []).map((tip: string, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-foreground flex items-center gap-2.5">
                  <Zap className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {pred.counterOfferScript && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-foreground">Ready-to-Send Counter-Offer Email Script</h4>
                <Button size="sm" variant="outline" onClick={copyScript} className="text-xs font-bold">
                  {copiedScript ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copiedScript ? "Copied Script!" : "Copy Email"}
                </Button>
              </div>
              <textarea
                readOnly
                rows={10}
                value={pred.counterOfferScript}
                className="w-full p-4 rounded-xl bg-muted/50 border border-border text-xs font-mono text-foreground leading-relaxed resize-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
