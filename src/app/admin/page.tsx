"use client";

import { Users, DollarSign, Bot, Shield, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <div className="space-y-8 p-8 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-xs font-bold text-destructive mb-2">
            <Shield className="h-3.5 w-3.5" /> Platform Admin Portal
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">AI Career Copilot Control Center</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">Total Registered Users</span>
          <div className="text-3xl font-extrabold text-foreground">14,280</div>
          <span className="text-[10px] text-emerald-500 font-bold">+18% this month</span>
        </div>
        <div className="glass-card p-5 space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">Monthly Recurring Revenue</span>
          <div className="text-3xl font-extrabold text-emerald-500">$48,200</div>
          <span className="text-[10px] text-emerald-500 font-bold">Stripe Active</span>
        </div>
        <div className="glass-card p-5 space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">Total AI Invocations</span>
          <div className="text-3xl font-extrabold text-purple-500">284,910</div>
          <span className="text-[10px] text-purple-500 font-bold">Avg $0.004 / request</span>
        </div>
        <div className="glass-card p-5 space-y-1">
          <span className="text-xs text-muted-foreground font-semibold">Active Pro Subscriptions</span>
          <div className="text-3xl font-extrabold text-pink-500">2,536</div>
          <span className="text-[10px] text-pink-500 font-bold">17.7% conversion</span>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground">Recent Platform Signups</h3>
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">Sarah Jenkins</p>
              <p className="text-muted-foreground">sarah.j@example.com • Google OAuth</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary font-bold text-[10px]">Pro Plan</span>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">Alex Rivera</p>
              <p className="text-muted-foreground">alex.r@example.com • GitHub OAuth</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-bold text-[10px]">Free Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
