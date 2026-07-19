"use client";

import { useState, useEffect } from "react";
import { User, Settings, Save, Sparkles, Key, Check, ShieldCheck, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StorageService } from "@/lib/storage";

export default function SettingsPage() {
  const [name, setName] = useState("Jan Steve Daniel");
  const [email, setEmail] = useState("user@aicareercopilot.com");
  const [aiProvider, setAiProvider] = useState<"OPENAI" | "GEMINI" | "CLAUDE">("OPENAI");
  const [apiKey, setApiKey] = useState("");
  const [targetRole, setTargetRole] = useState("Software Architect");
  const [targetSalary, setTargetSalary] = useState("$180,000");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const s = StorageService.getSettings();
    if (s.aiProvider) setAiProvider(s.aiProvider);
    if (s.apiKey) setApiKey(s.apiKey);
    if (s.targetRole) setTargetRole(s.targetRole);
    if (s.targetSalary) setTargetSalary(s.targetSalary);
  }, []);

  const handleSave = () => {
    StorageService.saveSettings({
      aiProvider,
      apiKey,
      targetRole,
      targetSalary,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Account & AI Preferences
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Configure your personal details, custom AI API keys, and model selection.
        </p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <User className="h-4 w-4 text-primary" /> Profile & Target Career Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Email Address</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Target Role Title</label>
            <Input value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Target Compensation Band</label>
            <Input value={targetSalary} onChange={(e) => setTargetSalary(e.target.value)} className="text-xs h-10 bg-muted/40" />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 space-y-6 border-primary/30">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Cpu className="h-4 w-4 text-primary" /> AI Model Selection & Provider Controls
        </h3>
        
        <div className="space-y-3">
          <label className="text-xs font-bold text-foreground">Active AI Provider Engine</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setAiProvider("OPENAI")}
              className={`p-3.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                aiProvider === "OPENAI"
                  ? "border-primary bg-primary/10 text-primary shadow-sm"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>OpenAI (GPT-4o)</span>
              <span className="text-[10px] font-normal opacity-80">Default Provider</span>
            </button>

            <button
              onClick={() => setAiProvider("GEMINI")}
              className={`p-3.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                aiProvider === "GEMINI"
                  ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-sm"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Google Gemini 2.0</span>
              <span className="text-[10px] font-normal opacity-80">High Speed Flash</span>
            </button>

            <button
              onClick={() => setAiProvider("CLAUDE")}
              className={`p-3.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                aiProvider === "CLAUDE"
                  ? "border-pink-500 bg-pink-500/10 text-pink-400 shadow-sm"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>Claude 3.5 Sonnet</span>
              <span className="text-[10px] font-normal opacity-80">Creative Writing</span>
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border/60">
          <label className="text-xs font-bold text-foreground flex items-center justify-between">
            <span className="flex items-center gap-1.5"><Key className="h-3.5 w-3.5 text-primary" /> Optional Custom API Key</span>
            <span className="text-[10px] text-muted-foreground font-normal">Stored locally in browser</span>
          </label>
          <Input
            type="password"
            placeholder="sk-proj-... or AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="text-xs h-10 bg-muted/40 font-mono"
          />
          <p className="text-[11px] text-muted-foreground">
            Provide your personal API key to bypass rate limits or use custom model endpoints.
          </p>
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="bg-primary text-white text-xs font-bold h-10 px-6 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
      >
        {savedSuccess ? <Check className="h-4 w-4 mr-2 text-emerald-300" /> : <Save className="h-4 w-4 mr-2" />}
        {savedSuccess ? "Preferences Saved!" : "Save All Settings"}
      </Button>
    </div>
  );
}
