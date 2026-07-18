import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Column: Form Container */}
      <div className="flex flex-col justify-between p-8 sm:p-12 z-10">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-purple-600 to-pink-500 text-white font-bold shadow-md shadow-primary/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg gradient-text">AI Career Copilot</span>
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto space-y-6 py-8">
          {children}
        </div>

        <div className="text-xs text-muted-foreground text-center">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>

      {/* Right Column: Visual Showcase */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-l border-border relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-50" />
        <div className="relative z-10 space-y-4 max-w-lg my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Empowered by GPT-4o, Gemini 2.0 & Claude 3.5
          </div>
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight text-balance">
            Elevate your career trajectory with automated AI intelligence.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Join 150,000+ engineers, product managers, designers, and executives who use AI Career Copilot to optimize resumes, practice interviews, and negotiate salaries.
          </p>
        </div>
      </div>
    </div>
  );
}
