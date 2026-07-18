import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, User } from "lucide-react";

const posts = [
  {
    slug: "how-to-beat-ats-resume-trackers-2026",
    title: "How to Beat ATS Resume Scanners in 2026: The Ultimate Guide",
    excerpt: "Learn how modern Applicant Tracking Systems parse resume keywords, formats, and structures to rank candidates top of the pile.",
    category: "Resume & ATS",
    date: "Jul 15, 2026",
    author: "AI Career Research Team",
  },
  {
    slug: "star-method-interview-questions-framework",
    title: "Mastering the STAR Method for Behavioral Interviews",
    excerpt: "Step-by-step framework to structure Situation, Task, Action, and Result answers for engineering and product leadership roles.",
    category: "Interview Prep",
    date: "Jul 10, 2026",
    author: "Career Coach Lead",
  },
  {
    slug: "linkedin-headline-optimizer-strategies",
    title: "10 LinkedIn Headline Formats That Get 5x More Recruiter DMs",
    excerpt: "Optimize your LinkedIn headline with target title keywords, authority markers, and value propositions.",
    category: "LinkedIn Optimization",
    date: "Jul 05, 2026",
    author: "Personal Branding Team",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="section-padding hero-gradient space-y-12">
      <div className="page-container text-center space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> AI Career Insights Blog
        </div>
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
          Career Acceleration Guides & AI Research
        </h1>
        <p className="text-muted-foreground text-sm">
          Actionable strategies on resumes, interview preparation, compensation negotiation, and LinkedIn growth.
        </p>
      </div>

      <div className="page-container grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card p-6 space-y-4 card-hover flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                {post.category}
              </span>
              <h2 className="text-base font-bold text-foreground hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-4 border-t border-border/60">
              <span>{post.date}</span>
              <span className="flex items-center text-primary font-semibold">
                Read Article <ArrowRight className="h-3 w-3 ml-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
