"use client";

import { useEffect, useState } from "react";
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
import { StorageService, SavedApplication, SavedResume, SavedInterview, UserSettings } from "@/lib/storage";

export default function DashboardPage() {
  const [applications, setApplications] = useState<SavedApplication[]>([]);
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [interviews, setInterviews] = useState<SavedInterview[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    apiKey: "",
    aiProvider: "OPENAI",
    targetRole: "Senior Software Architect",
    targetSalary: "$185,000",
  });

  useEffect(() => {
    const apps = StorageService.getApplications();
    const res = StorageService.getResumes();
    const ints = StorageService.getInterviews();
    const setts = StorageService.getSettings();

    setApplications(apps);
    setResumes(res);
    setInterviews(ints);
    setSettings(setts);
  }, []);

  const latestAtsScore = resumes.length && resumes[0].atsScore ? resumes[0].atsScore : 92;
  const interviewingCount = applications.filter((a) => a.status === "INTERVIEW" || a.status === "PHONE_SCREEN").length;

  return (
    <div className="space-y-8 pb-12">
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
              Targeting <strong className="text-foreground">{settings.targetRole}</strong> ({settings.targetSalary}). You have {applications.length} tracked job applications and {interviewingCount} active interview streams.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/resume/review">
              <Button className="bg-gradient-to-r from-primary to-purple-600 text-white font-semibold text-xs h-10 px-5 shadow-lg shadow-primary/25 hover:opacity-90">
                <Sparkles className="h-4 w-4 mr-2" /> Run AI Resume Audit
              </Button>
            </Link>
            <Link href="/interview/mock">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted text-xs h-10 px-5 font-semibold">
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
            <span className="text-3xl font-black text-foreground">{latestAtsScore} <span className="text-xs font-normal text-muted-foreground">/100</span></span>
            <span className="text-xs font-bold text-emerald-500 flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> Top Tier
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">{resumes.length} saved resume version{resumes.length === 1 ? "" : "s"}</p>
        </div>

        {/* Mock Interview Score */}
        <div className="glass-card p-5 space-y-3 card-hover border-purple-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Interview Sessions</span>
            <span className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <Bot className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{interviews.length ? interviews[0].overallScore : 92}%</span>
            <span className="text-xs font-bold text-purple-500 flex items-center">
              <Award className="h-3.5 w-3.5 mr-1" /> STAR Expert
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">{interviews.length} completed mock sessions</p>
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
            <span className="text-3xl font-black text-foreground">{settings.targetSalary}</span>
            <span className="text-xs font-bold text-pink-500 flex items-center">
              Target Band
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">Role: {settings.targetRole}</p>
        </div>

        {/* Applications Active */}
        <div className="glass-card p-5 space-y-3 card-hover border-blue-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Tracked Applications</span>
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Briefcase className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-foreground">{applications.length}</span>
            <span className="text-xs font-bold text-blue-500">{interviewingCount} Active</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Saved in application pipeline</p>
        </div>
      </div>

      {/* Main Grid: AI Recommendations & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick AI Tools Launcher */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> AI Career Intelligence Suite
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link href="/resume/review" className="p-3 rounded-xl bg-muted/40 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all flex flex-col gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold text-foreground">Resume Audit</span>
                <span className="text-[10px] text-muted-foreground">Instant ATS score & fixes</span>
              </Link>
              <Link href="/interview/mock" className="p-3 rounded-xl bg-muted/40 hover:bg-purple-500/10 border border-border hover:border-purple-500/30 transition-all flex flex-col gap-2">
                <Bot className="h-5 w-5 text-purple-500" />
                <span className="text-xs font-bold text-foreground">Mock Interview</span>
                <span className="text-[10px] text-muted-foreground">Practice STAR answers</span>
              </Link>
              <Link href="/career/roadmap" className="p-3 rounded-xl bg-muted/40 hover:bg-pink-500/10 border border-border hover:border-pink-500/30 transition-all flex flex-col gap-2">
                <Compass className="h-5 w-5 text-pink-500" />
                <span className="text-xs font-bold text-foreground">Career Roadmap</span>
                <span className="text-[10px] text-muted-foreground">6-month growth plan</span>
              </Link>
              <Link href="/career/linkedin" className="p-3 rounded-xl bg-muted/40 hover:bg-amber-500/10 border border-border hover:border-amber-500/30 transition-all flex flex-col gap-2">
                <TrendingUp className="h-5 w-5 text-amber-500" />
                <span className="text-xs font-bold text-foreground">LinkedIn AI</span>
                <span className="text-[10px] text-muted-foreground">Headline & SSI optimizer</span>
              </Link>
              <Link href="/career/salary" className="p-3 rounded-xl bg-muted/40 hover:bg-emerald-500/10 border border-border hover:border-emerald-500/30 transition-all flex flex-col gap-2">
                <Zap className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-bold text-foreground">Salary Predictor</span>
                <span className="text-[10px] text-muted-foreground">Market comp & scripts</span>
              </Link>
              <Link href="/resume/cover-letter" className="p-3 rounded-xl bg-muted/40 hover:bg-blue-500/10 border border-border hover:border-blue-500/30 transition-all flex flex-col gap-2">
                <Award className="h-5 w-5 text-blue-500" />
                <span className="text-xs font-bold text-foreground">Cover Letter</span>
                <span className="text-[10px] text-muted-foreground">Tailored generation</span>
              </Link>
            </div>
          </div>

          {/* Active Job Applications List */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">Active Job Applications ({applications.length})</h2>
              <Link href="/jobs/applications" className="text-xs text-primary font-bold hover:underline flex items-center">
                Manage All <ArrowUpRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            <div className="space-y-3">
              {applications.length > 0 ? (
                applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3.5 rounded-xl bg-muted/30 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {app.company.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{app.position} — <span className="text-primary">{app.company}</span></p>
                        <p className="text-[10px] text-muted-foreground">Applied {app.appliedDate} • {app.location} ({app.salary})</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                      {app.status.replace("_", " ")}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground py-4 text-center">No applications tracked yet. Click Manage All to add your target jobs.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4 border-amber-500/20">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Executive Priority Actions
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                <p className="text-xs font-bold text-foreground">Quantify Architecture Metrics</p>
                <p className="text-[11px] text-muted-foreground">Ensure your recent resume bullets specify exact system scale or latency gains.</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
                <p className="text-xs font-bold text-foreground">Set Up Custom AI API Key</p>
                <p className="text-[11px] text-muted-foreground">Configure your OpenAI or Gemini key in Settings for unlimited AI usage.</p>
              </div>
            </div>
            <Link href="/settings" className="block w-full">
              <Button variant="outline" className="w-full text-xs h-9 border-amber-500/30 text-amber-500 hover:bg-amber-500/10 font-bold">
                Configure Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
