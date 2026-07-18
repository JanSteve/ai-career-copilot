import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, User, Clock, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Career Copilot Blog — Resume Strategy, ATS Hacks & Interview Guides",
  description: "Explore actionable guides on ATS optimization, STAR interview strategies, salary negotiation tactics, and LinkedIn growth.",
};

export default function BlogIndexPage() {
  const postsList = Object.values(BLOG_POSTS);

  return (
    <div className="section-padding hero-gradient space-y-12 pb-20">
      <div className="page-container text-center space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary border border-primary/20">
          <Sparkles className="h-3.5 w-3.5" /> AI Career Insights & Research
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          Career Acceleration Guides & Strategy Insights
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          In-depth guides on passing ATS scanners, mastering STAR interviews, negotiating maximum compensation, and building recruiter-magnet LinkedIn profiles.
        </p>
      </div>

      <div className="page-container grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl">
        {postsList.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card p-7 space-y-5 card-hover flex flex-col justify-between border border-border/80 hover:border-primary/40 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold border border-primary/20">
                  {post.category}
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readingTime}
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-5 border-t border-border/60">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {post.date}
              </span>
              <span className="flex items-center text-primary font-bold group-hover:translate-x-1 transition-transform">
                Read Full Guide <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
