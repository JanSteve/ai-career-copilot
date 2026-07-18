import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Sparkles, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    notFound();
  }

  // Schema.org Article & FAQ JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "AI Career Copilot",
      url: "https://ai-career-copilot-neon.vercel.app",
    },
    datePublished: post.date,
    mainEntityOfPage: `https://ai-career-copilot-neon.vercel.app/blog/${post.slug}`,
  };

  const faqJsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="section-padding page-container max-w-4xl space-y-10 pb-20">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{post.title}</span>
        </div>

        {/* Header */}
        <div className="space-y-4 border-b border-border pb-8">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readingTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs border border-primary/30">
                {post.author.avatar}
              </div>
              <div>
                <div className="font-bold text-foreground">{post.author.name}</div>
                <div className="text-[10px] text-muted-foreground">{post.author.role}</div>
              </div>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div
          className="prose dark:prose-invert max-w-none text-sm md:text-base text-foreground/90 space-y-6 leading-relaxed border-b border-border pb-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* FAQ Section */}
        {post.faqs && post.faqs.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {post.faqs.map((faq, i) => (
                <div key={i} className="glass-card p-5 space-y-2 border-border/80">
                  <h4 className="text-sm font-bold text-foreground">{faq.question}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Feature CTA Box */}
        {post.ctaTool && (
          <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/20 via-purple-500/15 to-pink-500/10 border border-primary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> {post.ctaTool.title}
              </h3>
              <p className="text-xs text-muted-foreground max-w-md">{post.ctaTool.description}</p>
            </div>
            <Link
              href={post.ctaTool.href}
              className="px-6 py-3 rounded-xl bg-primary text-white font-bold text-xs shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity shrink-0"
            >
              {post.ctaTool.buttonText}
            </Link>
          </div>
        )}
      </article>
    </>
  );
}
