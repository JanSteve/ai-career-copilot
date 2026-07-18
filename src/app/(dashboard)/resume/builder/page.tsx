"use client";

import { useState } from "react";
import { Sparkles, Save, Download, Plus, Trash2, Layout, Eye, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [template, setTemplate] = useState<"modern" | "executive" | "minimal">("modern");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [enhancingIndex, setEnhancingIndex] = useState<number | null>(null);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Jan Steve Daniel",
    headline: "Senior Full Stack Architect & Tech Lead",
    email: "jansteve@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/jansteve",
    github: "github.com/jansteve",
    summary: "Senior Full Stack Architect with 6+ years of experience leading cross-functional engineering teams and building high-throughput cloud platforms with React, Next.js, TypeScript, Node.js, and PostgreSQL.",
    skills: "React, Next.js, TypeScript, Node.js, PostgreSQL, Prisma, GraphQL, Tailwind CSS, AWS, Docker, Stripe, Better Auth, System Design",
  });

  const [experiences, setExperiences] = useState([
    {
      company: "Apex Innovations Inc.",
      role: "Lead Full Stack Architect",
      period: "2023 - Present",
      bullets: "• Spearheaded redesign of SaaS platform using Next.js 15, reducing P99 API response times by 48%.\n• Managed 6 senior developers delivering multi-tenant microservices architecture.\n• Implemented Better Auth and Stripe recurring subscriptions driving $1.2M ARR growth.",
    },
    {
      company: "CloudScale Software Solutions",
      role: "Senior Full Stack Engineer",
      period: "2020 - 2023",
      bullets: "• Architected automated continuous integration pipelines with GitHub Actions and Vercel.\n• Reduced database query load by 60% through Prisma query optimization and Redis caching layer.",
    },
  ]);

  const addPosition = () => {
    setExperiences([
      ...experiences,
      {
        company: "New Company Inc.",
        role: "Software Engineer",
        period: "2023 - Present",
        bullets: "• Developed core features using TypeScript, React, and Node.js.\n• Collaborated across teams to improve user onboarding conversion by 25%.",
      },
    ]);
  };

  const removePosition = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const enhanceBulletsWithAI = (index: number) => {
    setEnhancingIndex(index);
    setTimeout(() => {
      const exp = experiences[index];
      const enhanced = exp.bullets
        .split("\n")
        .map((b) => {
          if (b.trim().startsWith("•")) {
            return b.replace("•", "• Empowered cross-functional team by executing") + " with 99.9% uptime metric.";
          }
          return "• Optimized " + b;
        })
        .join("\n");

      const updated = [...experiences];
      updated[index].bullets = enhanced;
      setExperiences(updated);
      setEnhancingIndex(null);
    }, 600);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportPDF = () => {
    setActiveTab("preview");
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            AI Resume Builder & Tailor
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Build high-converting, ATS-friendly resumes backed by AI bullet point enhancement.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex p-1 rounded-xl bg-muted border border-border">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "edit" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "preview" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
              }`}
            >
              Preview
            </button>
          </div>

          <Button
            onClick={handleSave}
            size="sm"
            className="bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:opacity-90"
          >
            {savedSuccess ? <Check className="h-4 w-4 mr-1.5 text-emerald-300" /> : <Save className="h-4 w-4 mr-1.5" />}
            {savedSuccess ? "Saved to Profile!" : "Save Progress"}
          </Button>

          <Button onClick={handleExportPDF} size="sm" variant="outline" className="text-xs font-bold border-border">
            <Download className="h-4 w-4 mr-1.5" /> Export PDF / Print
          </Button>
        </div>
      </div>

      {/* Template Chooser Bar */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/40 border border-border w-fit">
        <span className="text-[11px] font-bold text-muted-foreground px-2">Style Template:</span>
        <button
          onClick={() => setTemplate("modern")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            template === "modern" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Modern Clean
        </button>
        <button
          onClick={() => setTemplate("executive")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            template === "executive" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Executive Slate
        </button>
        <button
          onClick={() => setTemplate("minimal")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            template === "minimal" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Minimal Classic
        </button>
      </div>

      {activeTab === "edit" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Contact & Identity</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Full Name"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                  className="text-xs"
                />
                <Input
                  placeholder="Target Role Headline"
                  value={personalInfo.headline}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, headline: e.target.value })}
                  className="text-xs"
                />
                <Input
                  placeholder="Email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="text-xs"
                />
                <Input
                  placeholder="Phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="text-xs"
                />
                <Input
                  placeholder="Location"
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  className="text-xs"
                />
                <Input
                  placeholder="LinkedIn URL"
                  value={personalInfo.linkedin}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Executive Summary</h3>
              <textarea
                rows={4}
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs resize-none font-sans leading-relaxed"
              />
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Core Competencies & Skills</h3>
              <textarea
                rows={3}
                value={personalInfo.skills}
                onChange={(e) => setPersonalInfo({ ...personalInfo, skills: e.target.value })}
                className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs resize-none font-mono"
              />
            </div>
          </div>

          {/* Work Experience List */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Work Experience</h3>
              <Button onClick={addPosition} size="sm" variant="outline" className="text-xs text-primary font-bold">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Position
              </Button>
            </div>

            {experiences.map((exp, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border space-y-3 relative group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-primary">Position #{i + 1}</span>
                  {experiences.length > 1 && (
                    <button
                      onClick={() => removePosition(i)}
                      className="text-muted-foreground hover:text-destructive text-xs p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[i].company = e.target.value;
                      setExperiences(updated);
                    }}
                    className="text-xs"
                  />
                  <Input
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[i].role = e.target.value;
                      setExperiences(updated);
                    }}
                    className="text-xs"
                  />
                </div>

                <Input
                  placeholder="Period (e.g. 2021 - Present)"
                  value={exp.period}
                  onChange={(e) => {
                    const updated = [...experiences];
                    updated[i].period = e.target.value;
                    setExperiences(updated);
                  }}
                  className="text-xs"
                />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-semibold text-muted-foreground">Bullet Points</label>
                    <button
                      onClick={() => enhanceBulletsWithAI(i)}
                      disabled={enhancingIndex === i}
                      className="text-[11px] text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                    >
                      {enhancingIndex === i ? (
                        <RefreshCw className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      {enhancingIndex === i ? "Enhancing..." : "AI Bullet Polish"}
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="• Achieved X metric using Y skill..."
                    value={exp.bullets}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[i].bullets = e.target.value;
                      setExperiences(updated);
                    }}
                    className="w-full p-2.5 rounded-lg bg-background border border-border text-xs font-mono resize-none leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Preview Component with live template styling */
        <div
          className={`glass-card p-10 max-w-3xl mx-auto shadow-2xl rounded-xl space-y-6 font-sans border border-slate-200 ${
            template === "modern"
              ? "bg-slate-950 text-slate-100 border-slate-800"
              : template === "executive"
              ? "bg-stone-900 text-stone-100 border-stone-800"
              : "bg-white text-slate-900 border-slate-200"
          }`}
        >
          <div className="border-b border-muted-foreground/20 pb-4 text-center space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight">{personalInfo.fullName}</h2>
            <p className="text-xs font-semibold text-primary">{personalInfo.headline}</p>
            <p className="text-xs opacity-80">
              {personalInfo.email} • {personalInfo.phone} • {personalInfo.location} • {personalInfo.linkedin}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1">
              Professional Summary
            </h4>
            <p className="text-xs leading-relaxed opacity-90">{personalInfo.summary}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1">
              Work Experience
            </h4>
            {experiences.map((exp, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>
                    {exp.role} <span className="font-normal opacity-70">at {exp.company}</span>
                  </span>
                  <span className="opacity-70 text-[11px]">{exp.period}</span>
                </div>
                <div className="text-xs whitespace-pre-line opacity-85 font-sans leading-relaxed">
                  {exp.bullets}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/20 pb-1">
              Core Skills
            </h4>
            <p className="text-xs opacity-90 leading-relaxed font-mono">{personalInfo.skills}</p>
          </div>
        </div>
      )}
    </div>
  );
}
