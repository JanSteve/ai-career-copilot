"use client";

import { useState } from "react";
import { Zap, Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateAIResponse, getCoverLetterPrompt } from "@/services/ai";

export default function CoverLetterPage() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!company || !position || !resumeText || !jobDescription) return;
    setLoading(true);

    try {
      const { systemPrompt, userPrompt, schema } = getCoverLetterPrompt(
        resumeText,
        jobDescription,
        company,
        position
      );
      const res = await generateAIResponse(
        {
          systemPrompt,
          userPrompt,
          jsonMode: true,
        },
        schema
      );
      setResult(res.parsed || res.content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const text = result?.coverLetterText || result;
    if (text) {
      navigator.clipboard.writeText(typeof text === "string" ? text : JSON.stringify(text));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-bold text-blue-500">
          <Zap className="h-3.5 w-3.5" /> AI Cover Letter Generator
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Tailored Cover Letter AI
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Generate customized cover letters that highlight your most relevant achievements for specific companies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Company Name (e.g. Stripe, OpenAI)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="text-xs h-10"
        />
        <Input
          placeholder="Position Title (e.g. Staff Software Engineer)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="text-xs h-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          rows={6}
          placeholder="Paste Job Description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="p-3 rounded-xl bg-muted/40 border border-border text-xs resize-none"
        />
        <textarea
          rows={6}
          placeholder="Paste Your Resume Content..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="p-3 rounded-xl bg-muted/40 border border-border text-xs resize-none"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading || !company || !position || !jobDescription || !resumeText}
        className="w-full h-11 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/20 hover:opacity-90"
      >
        {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
        {loading ? "Writing Personalized Cover Letter..." : "Generate Cover Letter"}
      </Button>

      {result && (
        <div className="glass-card p-6 space-y-4 border-blue-500/30 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Generated Cover Letter</span>
            <Button size="sm" variant="ghost" onClick={copyToClipboard} className="text-xs">
              {copied ? <Check className="h-4 w-4 text-emerald-500 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? "Copied!" : "Copy Text"}
            </Button>
          </div>
          <div className="p-4 rounded-xl bg-muted/30 border border-border whitespace-pre-line text-xs font-mono text-foreground leading-relaxed">
            {result.coverLetterText || JSON.stringify(result, null, 2)}
          </div>
        </div>
      )}
    </div>
  );
}
