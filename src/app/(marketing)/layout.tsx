import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Marketing Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="page-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-purple-600 to-pink-500 text-white font-bold shadow-md shadow-primary/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg gradient-text">AI Career Copilot</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/features" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/ats-checker" className="hover:text-foreground transition-colors">
              ATS Checker
            </Link>
            <Link href="/interview-ai" className="hover:text-foreground transition-colors">
              Mock Interview
            </Link>
            <Link href="/career-roadmap" className="hover:text-foreground transition-colors">
              Roadmap
            </Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary via-purple-600 to-pink-500 text-white shadow-lg shadow-primary/25 hover:opacity-90 transition-all hover:scale-105"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">{children}</main>

      {/* Marketing Footer */}
      <footer className="border-t border-border/40 bg-card/40 section-padding py-12">
        <div className="page-container grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-pink-500 text-white font-bold">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-base gradient-text">AI Career Copilot</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              The premier AI platform for career growth, resume optimization, mock interviews, and compensation prediction.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">SEO Tools</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/ats-checker" className="hover:text-foreground">Free ATS Checker</Link></li>
              <li><Link href="/resume-review" className="hover:text-foreground">AI Resume Review</Link></li>
              <li><Link href="/linkedin-optimizer" className="hover:text-foreground">LinkedIn Optimizer</Link></li>
              <li><Link href="/cover-letter-generator" className="hover:text-foreground">Cover Letter AI</Link></li>
              <li><Link href="/interview-ai" className="hover:text-foreground">Mock Interview</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Career Intelligence</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/career-roadmap" className="hover:text-foreground">Career Roadmap</Link></li>
              <li><Link href="/salary-predictor" className="hover:text-foreground">Salary Predictor</Link></li>
              <li><Link href="/portfolio-review" className="hover:text-foreground">Portfolio Analyzer</Link></li>
              <li><Link href="/job-match" className="hover:text-foreground">Job Match Score</Link></li>
              <li><Link href="/github-review" className="hover:text-foreground">GitHub Review</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/pricing" className="hover:text-foreground">Pricing Plans</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Career Blog</Link></li>
              <li><Link href="/login" className="hover:text-foreground">User Sign In</Link></li>
              <li><Link href="/signup" className="hover:text-foreground">Create Account</Link></li>
            </ul>
          </div>
        </div>

        <div className="page-container mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© 2026 AI Career Copilot Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
