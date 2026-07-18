"use client";

import Link from "next/link";
import {
  FileText,
  Bot,
  Compass,
  TrendingUp,
  Award,
  Sparkles,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-purple-600/10 to-pink-500/10 border border-primary/20 p-6 md:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> AI Career Executive Dashboard
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Welcome back, Jan Steve!
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Your overall ATS score improved by +14 points this week. You have 3 active job applications pending interview stages.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/resume/review">
              <Button className="bg-gradient-to-r from-primary to-purple-600 text-white font-semibold text-xs h-10 px-5 shadow-lg shadow-primary/25 hover:opacity-90">
                <Sparkles className="h-4 w-4 mr-2" /> Run AI Resume Audit
              </Button>
            </Link>
            <Link href="/interview/mock">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted text-xs h-10 px-5">
                <Bot className="h-4 w-4 mr-2 text-purple-500" /> Start AI Mock Interview
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* ATS Score Card */}
        <div className="glass-card p-5 space-y-3 card-hover border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">ATS Resume Score</span>
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <FileText className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-foreground">88 <span className="text-sm font-normal text-muted-foreground">/100</span></span>
            <span className="text-xs font-bold text-emerald-500 flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> +12%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">Top 5% candidate pool match</p>
        </div>

        {/* Mock Interview Score */}
        <div className="glass-card p-5 space-y-3 card-hover border-purple-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Interview Performance</span>
            <span className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <Bot className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-foreground">92%</span>
            <span className="text-xs font-bold text-purple-500 flex items-center">
              <Award className="h-3.5 w-3.5 mr-1" /> STAR Expert
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">4 behavioral sessions completed</p>
        </div>

        {/* Target Salary */}
        <div className="glass-card p-5 space-y-3 card-hover border-pink-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Target Compensation</span>
            <span className="p-2 rounded-lg bg-pink-500/10 text-pink-500">
              <Zap className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-foreground">$165K</span>
            <span className="text-xs font-bold text-pink-500 flex items-center">
              +$25K potential
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">Based on Senior Fullstack Architect role</p>
        </div>

        {/* Applications Active */}
        <div className="glass-card p-5 space-y-3 card-hover border-blue-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Active Applications</span>
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Briefcase className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-foreground">8</span>
            <span className="text-xs font-bold text-blue-500">3 Interviews</span>
          </div>
          <p className="text-[11px] text-muted-foreground">2 pending phone screens</p>
        </div>
      </div>

      {/* Main Grid: AI Recommendations & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Actionable Recommendations & Applications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick AI Tools Launcher */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> AI Career Intelligence Suite
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link href="/resume/review" className="p-3 rounded-xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all flex flex-col gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-xs font-semibold text-foreground">Resume Audit</span>
                <span className="text-[10px] text-muted-foreground">Instant ATS score & fixes</span>
              </Link>
              <Link href="/interview/mock" className="p-3 rounded-xl bg-muted/40 hover:bg-purple-500/10 border border-border hover:border-purple-500/30 transition-all flex flex-col gap-2">
                <Bot className="h-5 w-5 text-purple-500" />
                <span className="text-xs font-semibold text-foreground">Mock Interview</span>
                <span className="text-[10px] text-muted-foreground">Practice STAR answers</span>
              </Link>
              <Link href="/career/roadmap" className="p-3 rounded-xl bg-muted/40 hover:bg-pink-500/10 border border-border hover:border-pink-500/30 transition-all flex flex-col gap-2">
                <Compass className="h-5 w-5 text-pink-500" />
                <span className="text-xs font-semibold text-foreground">Career Roadmap</span>
                <span className="text-[10px] text-muted-foreground">6-month growth plan</span>
              </Link>
              <Link href="/career/linkedin" className="p-3 rounded-xl bg-muted/40 hover:bg-amber-500/10 border border-border hover:border-amber-500/30 transition-all flex flex-col gap-2">
                <TrendingUp className="h-5 w-5 text-amber-500" />
                <span className="text-xs font-semibold text-foreground">LinkedIn AI</span>
                <span className="text-[10px] text-muted-foreground">Headline & SSI optimizer</span>
              </Link>
              <Link href="/career/salary" className="p-3 rounded-xl bg-muted/40 hover:bg-emerald-500/10 border border-border hover:border-emerald-500/30 transition-all flex flex-col gap-2">
                <Zap className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-semibold text-foreground">Salary Predictor</span>
                <span className="text-[10px] text-muted-foreground">Market comp data</span>
              </Link>
              <Link href="/resume/cover-letter" className="p-3 rounded-xl bg-muted/40 hover:bg-blue-500/10 border border-border hover:border-blue-500/30 transition-all flex flex-col gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                <span className="text-xs font-semibold text-foreground">Cover Letter</span>
                <span className="text-[10px] text-muted-foreground">Tailored generation</span>
              </Link>
            </div>
          </div>

          {/* Active Job Applications Tracker Preview */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">Active Applications</h2>
              <Link href="/jobs/applications" className="text-xs text-primary font-semibold hover:underline flex items-center">
                View All <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs">
                    S
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Stripe — Staff Frontend Engineer</p>
                    <p className="text-[10px] text-muted-foreground">Applied 4 days ago • Remote ($180K - $220K)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold">
                  Technical Round
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs">
                    V
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Vercel — Senior Fullstack Architect</p>
                    <p className="text-[10px] text-muted-foreground">Applied 1 week ago • San Francisco, CA</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-500 text-[10px] font-bold">
                  System Design
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-xs">
                    L
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Linear — Principal Product Engineer</p>
                    <p className="text-[10px] text-muted-foreground">Applied 2 weeks ago • Remote ($190K)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                  Offer Received
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Suggestions & Timeline */}
        <div className="space-y-6">
          {/* Top Priority Actionable Suggestions */}
          <div className="glass-card p-6 space-y-4 border-amber-500/20">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Key Resume Fixes Needed
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                <p className="text-xs font-bold text-foreground">Quantify Engineering Metrics</p>
                <p className="text-[11px] text-muted-foreground">Add percentages or latency reduction figures to 2 work history bullet points.</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
                <p className="text-xs font-bold text-foreground">Add &quot;System Architecture&quot; Keyword</p>
                <p className="text-[11px] text-muted-foreground">Missing key skill required in 85% of target senior postings.</p>
              </div>
            </div>
            <Link href="/resume/review" className="block w-full">
              <Button variant="outline" className="w-full text-xs h-9 border-amber-500/30 text-amber-500 hover:bg-amber-500/10">
                Fix Resume Issues
              </Button>
            </Link>
          </div>

          {/* Activity Timeline */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground">Recent Activity</h2>
            <div className="space-y-4 text-xs">
              <div className="flex gap-3">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-primary shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">AI Mock Interview completed</p>
                  <p className="text-muted-foreground">Scored 94% on System Design round.</p>
                  <span className="text-[10px] text-muted-foreground/60">Today, 2:15 PM</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">ATS Resume Scan finished</p>
                  <p className="text-muted-foreground">Scored 88/100 for Staff Engineer position.</p>
                  <span className="text-[10px] text-muted-foreground/60">Yesterday</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-pink-500 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Cover Letter Generated</p>
                  <p className="text-muted-foreground">Created custom letter for Stripe application.</p>
                  <span className="text-[10px] text-muted-foreground/60">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
