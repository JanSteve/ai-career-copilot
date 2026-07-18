"use client";

import { useState } from "react";
import { User, Settings, Save, Sparkles, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [name, setName] = useState("Jan Steve Daniel");
  const [email, setEmail] = useState("user@aicareercopilot.com");
  const [aiProvider, setAiProvider] = useState("openai");

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Account & AI Preferences
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Manage your user profile, AI provider choices, and notification settings.
        </p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <User className="h-4 w-4 text-primary" /> Profile Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="text-xs h-10" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Email Address</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="text-xs h-10" />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 space-y-6 border-primary/20">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> AI Model Selection & Provider Controls
        </h3>
        <div className="space-y-3">
          <label className="text-xs font-bold text-foreground">Preferred Default AI Provider</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setAiProvider("openai")}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                aiProvider === "openai" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              <span>OpenAI (GPT-4o)</span>
              <span className="text-[10px] font-normal opacity-80">Best for JSON schemas</span>
            </button>

            <button
              onClick={() => setAiProvider("gemini")}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                aiProvider === "gemini" ? "border-purple-500 bg-purple-500/10 text-purple-500" : "border-border text-muted-foreground"
              }`}
            >
              <span>Google Gemini 2.0</span>
              <span className="text-[10px] font-normal opacity-80">Ultra Fast Speed</span>
            </button>

            <button
              onClick={() => setAiProvider("claude")}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                aiProvider === "claude" ? "border-pink-500 bg-pink-500/10 text-pink-500" : "border-border text-muted-foreground"
              }`}
            >
              <span>Claude 3.5 Sonnet</span>
              <span className="text-[10px] font-normal opacity-80">Creative Writing</span>
            </button>
          </div>
        </div>
      </div>

      <Button className="bg-primary text-white text-xs font-bold h-10 px-6">
        <Save className="h-4 w-4 mr-2" /> Save Settings
      </Button>
    </div>
  );
}
