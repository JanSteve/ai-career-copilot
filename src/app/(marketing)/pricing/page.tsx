import Link from "next/link";
import { CheckCircle2, Zap, Sparkles, ShieldCheck } from "lucide-react";
import { PLANS } from "@/lib/stripe";

export default function PricingPage() {
  return (
    <div className="section-padding hero-gradient space-y-16">
      <div className="page-container text-center space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> 100% Risk-Free Guarantee
        </div>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
          Invest in your career. Pay back your plan with one interview.
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Choose the plan that fits your career goals. Upgrade or cancel anytime with zero lock-in.
        </p>
      </div>

      <div className="page-container grid md:grid-cols-3 gap-8 max-w-6xl">
        {/* Free Tier */}
        <div className="glass-card p-8 space-y-6 border-border flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">{PLANS.FREE.name}</h3>
            <p className="text-xs text-muted-foreground">{PLANS.FREE.description}</p>
            <div className="text-4xl font-extrabold text-foreground">$0 <span className="text-xs text-muted-foreground font-normal">/ month</span></div>
            <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border">
              {PLANS.FREE.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/signup" className="block w-full py-3 rounded-xl border border-border text-center text-xs font-bold text-foreground hover:bg-muted transition-colors">
            Get Started Free
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="glass-card p-8 space-y-6 border-primary/50 bg-primary/5 relative glow flex flex-col justify-between">
          <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
            Best Value
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">{PLANS.PRO.name}</h3>
            <p className="text-xs text-muted-foreground">{PLANS.PRO.description}</p>
            <div className="text-4xl font-extrabold text-foreground">$19 <span className="text-xs text-muted-foreground font-normal">/ month</span></div>
            <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/60">
              {PLANS.PRO.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-medium text-foreground">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/signup" className="block w-full py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-center text-xs font-bold text-white shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity">
            Start Pro 7-Day Trial
          </Link>
        </div>

        {/* Enterprise Tier */}
        <div className="glass-card p-8 space-y-6 border-border flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">{PLANS.ENTERPRISE.name}</h3>
            <p className="text-xs text-muted-foreground">{PLANS.ENTERPRISE.description}</p>
            <div className="text-4xl font-extrabold text-foreground">$49 <span className="text-xs text-muted-foreground font-normal">/ month</span></div>
            <ul className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border">
              {PLANS.ENTERPRISE.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/signup" className="block w-full py-3 rounded-xl border border-border text-center text-xs font-bold text-foreground hover:bg-muted transition-colors">
            Contact Enterprise Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
