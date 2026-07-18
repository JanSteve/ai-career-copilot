"use client";

import { useState } from "react";
import { Sparkles, Save, Download, Plus, Trash2, Layout, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Jan Steve Daniel",
    email: "jansteve@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    summary: "Senior Full Stack Architect with 6+ years of experience leading cross-functional engineering teams and building high-throughput cloud platforms.",
  });

  const [experiences, setExperiences] = useState([
    {
      company: "Acme Tech Inc.",
      role: "Lead Software Architect",
      period: "2023 - Present",
      bullets: "Architected micro-frontend platform serving 2M+ active users; Reduced page load latency by 45%.",
    },
  ]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            AI Resume Builder
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Build high-converting, ATS-friendly resumes backed by AI bullet point enhancement.
          </p>
        </div>
        <div className="flex items-center gap-3">
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
          <Button size="sm" className="bg-primary text-white text-xs">
            <Save className="h-4 w-4 mr-1.5" /> Save
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Download className="h-4 w-4 mr-1.5" /> Export PDF
          </Button>
        </div>
      </div>

      {activeTab === "edit" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Contact Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Full Name"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
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
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground">Professional Summary</h3>
              <textarea
                rows={4}
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs resize-none"
              />
            </div>
          </div>

          {/* Experience List */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Work Experience</h3>
              <Button size="sm" variant="ghost" className="text-xs text-primary">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Position
              </Button>
            </div>
            {experiences.map((exp, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Company" value={exp.company} className="text-xs" />
                  <Input placeholder="Role" value={exp.role} className="text-xs" />
                </div>
                <textarea
                  rows={3}
                  placeholder="Bullet points..."
                  value={exp.bullets}
                  className="w-full p-2.5 rounded-lg bg-background border border-border text-xs resize-none"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 max-w-3xl mx-auto bg-white text-slate-900 shadow-2xl rounded-xl space-y-6 font-sans">
          <div className="border-b pb-4 text-center space-y-1">
            <h2 className="text-2xl font-bold">{personalInfo.fullName}</h2>
            <p className="text-xs text-slate-600">{personalInfo.email} • {personalInfo.phone} • {personalInfo.location}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b pb-1">Professional Summary</h4>
            <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b pb-1">Work Experience</h4>
            {experiences.map((exp, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="text-slate-500 font-normal">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-700">{exp.bullets}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
