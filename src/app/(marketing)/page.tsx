import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  Bot,
  Compass,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Star,
  DollarSign,
  Briefcase,
  Share2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative section-padding pt-24 pb-20 hero-gradient">
        <div className="page-container text-center relative z-10 space-y-8 max-w-4xl">
          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Gen AI Career Copilot 2.0 Released</span>
            <ArrowRight className="h-3 w-3" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground text-balance">
            Land your dream job <br className="hidden sm:inline" />
            with <span className="gradient-text">Autonomous AI Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Resume reviews, ATS score optimizer, AI mock interviews, LinkedIn profile design, and personalized 6-month career roadmaps.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary via-purple-600 to-pink-500 text-white font-semibold text-base shadow-xl shadow-primary/25 hover:scale-105 transition-all"
            >
              Start Free Resume Audit <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/ats-checker"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-card border border-border/80 text-foreground font-semibold text-base hover:bg-muted transition-colors shadow-sm"
            >
              Check ATS Score
            </Link>
          </div>

          {/* Key Metric Counters */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border/40 text-left">
            <div>
              <p className="text-3xl font-extrabold text-foreground">94.2%</p>
              <p className="text-xs text-muted-foreground font-medium">ATS Match Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-foreground">3.8x</p>
              <p className="text-xs text-muted-foreground font-medium">Interview Call Rate</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-foreground">$24,500</p>
              <p className="text-xs text-muted-foreground font-medium">Avg Salary Increase</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-foreground">150,000+</p>
              <p className="text-xs text-muted-foreground font-medium">Resumes Optimized</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="section-padding bg-muted/30 border-y border-border/40">
        <div className="page-container space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground">
              Everything you need to out-compete 99% of applicants
            </h2>
            <p className="text-muted-foreground text-sm">
              Our multi-model AI suite acts as your 24/7 personal career advisor, executive recruiter, and interview coach.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-6 space-y-4 card-hover">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">AI Resume Review & ATS Score</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Scan your resume against job descriptions, fix missing keywords, eliminate formatting traps, and boost ATS score above 90.
              </p>
              <Link href="/resume-review" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Explore Resume AI <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-6 space-y-4 card-hover">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Interactive AI Mock Interviews</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Practice behavioral, STAR method, and technical interviews with real-time feedback on clarity, impact, and depth.
              </p>
              <Link href="/interview-ai" className="inline-flex items-center gap-1 text-xs font-semibold text-purple-500 hover:underline">
                Start Mock Interview <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-6 space-y-4 card-hover">
              <div className="h-12 w-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Personalized Career Roadmap</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Receive a tailored 6 to 12-month career development trajectory identifying skill gaps, high-value certifications, and projects.
              </p>
              <Link href="/career-roadmap" className="inline-flex items-center gap-1 text-xs font-semibold text-pink-500 hover:underline">
                Generate Roadmap <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-6 space-y-4 card-hover">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">LinkedIn Profile Optimizer</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Optimize your headline, summary, and experience to rank #1 in recruiter searches and increase inbound messages.
              </p>
              <Link href="/linkedin-optimizer" className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 hover:underline">
                Optimize LinkedIn <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-6 space-y-4 card-hover">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Salary & Negotiation Predictor</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Know your true market value based on location, skillset, and experience level. Get customized negotiation scripts.
              </p>
              <Link href="/salary-predictor" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 hover:underline">
                Predict Salary <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-6 space-y-4 card-hover">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Smart Job Match & Application Tracker</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Track job applications across stages, analyze fit scores, generate customized cover letters, and log interview notes.
              </p>
              <Link href="/job-match" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:underline">
                View Tracker <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="section-padding">
        <div className="page-container space-y-12 max-w-4xl">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Simple, transparent pricing</h2>
            <p className="text-muted-foreground text-sm">Invest in your career. Pay back your subscription in your first paycheck.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Free Plan */}
            <div className="glass-card p-8 space-y-6 border-border">
              <div>
                <h3 className="text-xl font-bold text-foreground">Starter</h3>
                <p className="text-xs text-muted-foreground">Essential tools for job seekers</p>
              </div>
              <div className="text-3xl font-extrabold text-foreground">$0 <span className="text-xs font-normal text-muted-foreground">/ forever</span></div>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 3 AI Analyses per month</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Basic ATS score check</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Application tracker</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 rounded-xl border border-border text-center text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="glass-card p-8 space-y-6 border-primary/50 bg-primary/5 relative glow">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Pro Unlimited</h3>
                <p className="text-xs text-muted-foreground">Full suite for aggressive career growth</p>
              </div>
              <div className="text-3xl font-extrabold text-foreground">$19 <span className="text-xs font-normal text-muted-foreground">/ month</span></div>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Unlimited AI analyses & resume audits</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Unlimited AI Mock Interviews</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Career Roadmap & Skill Gap Analyzer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> LinkedIn & Portfolio Optimizer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Multi-model AI switching (OpenAI, Gemini, Claude)</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-center text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity">
                Start Pro 7-Day Trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
