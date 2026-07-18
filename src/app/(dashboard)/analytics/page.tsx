"use client";

import { BarChart3, TrendingUp, Award, Zap, FileText, Bot, Briefcase } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Career Intelligence Analytics
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Track your ATS score progression, interview performance metrics, and application conversion rates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 space-y-2">
          <span className="text-xs text-muted-foreground font-semibold">Avg ATS Score</span>
          <div className="text-3xl font-extrabold text-primary">88/100</div>
          <span className="text-[10px] text-emerald-500 font-bold">+14 points past 30 days</span>
        </div>

        <div className="glass-card p-5 space-y-2">
          <span className="text-xs text-muted-foreground font-semibold">Interview Call Rate</span>
          <div className="text-3xl font-extrabold text-purple-500">37.5%</div>
          <span className="text-[10px] text-purple-500 font-bold">3x industry average</span>
        </div>

        <div className="glass-card p-5 space-y-2">
          <span className="text-xs text-muted-foreground font-semibold">Mock Session Score</span>
          <div className="text-3xl font-extrabold text-pink-500">92%</div>
          <span className="text-[10px] text-pink-500 font-bold">STAR Method Expert</span>
        </div>

        <div className="glass-card p-5 space-y-2">
          <span className="text-xs text-muted-foreground font-semibold">Total AI Audits Run</span>
          <div className="text-3xl font-extrabold text-emerald-500">24</div>
          <span className="text-[10px] text-emerald-500 font-bold">Unlimited Pro Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-foreground">Application Funnel Breakdown</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold pb-1">
                <span>Applications Sent (8)</span>
                <span>100%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-blue-500 w-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-semibold pb-1">
                <span>Recruiter Screens (5)</span>
                <span>62.5%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-amber-500 w-[62.5%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-semibold pb-1">
                <span>Technical Interviews (3)</span>
                <span>37.5%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-purple-500 w-[37.5%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-semibold pb-1">
                <span>Offers Received (1)</span>
                <span>12.5%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-emerald-500 w-[12.5%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-foreground">Skill Mastery Growth</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
              <span className="font-semibold text-foreground">System Architecture</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">Advanced</span>
            </div>
            <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
              <span className="font-semibold text-foreground">TypeScript & React</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">Expert</span>
            </div>
            <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
              <span className="font-semibold text-foreground">Distributed Caching</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold text-[10px]">In Progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
