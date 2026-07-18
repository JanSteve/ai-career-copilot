import Link from "next/link";
import { ArrowLeft, Calendar, User, Sparkles } from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <article className="section-padding page-container max-w-3xl space-y-8">
      <Link href="/blog" className="inline-flex items-center text-xs font-semibold text-primary hover:underline">
        <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Blog Index
      </Link>

      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
          Career Strategy
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
          How to Beat ATS Resume Scanners in 2026: The Ultimate Guide
        </h1>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-b border-border pb-4">
          <span className="flex items-center"><User className="h-3.5 w-3.5 mr-1" /> AI Career Intelligence Team</span>
          <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1" /> Published July 15, 2026</span>
        </div>
      </div>

      <div className="prose dark:prose-invert text-xs md:text-sm text-foreground/90 space-y-6 leading-relaxed">
        <p className="text-base text-muted-foreground font-medium leading-relaxed">
          Over 98% of Fortune 500 companies and tech startups use Applicant Tracking Systems (ATS) to automatically screen and filter resumes before a human recruiter ever sees them.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">1. Understand How ATS Parsers Work</h2>
        <p>
          Modern ATS engines tokenize your resume text into structured entities: contact details, education history, work experience bullet points, and explicit skill keywords.
        </p>

        <h2 className="text-xl font-bold text-foreground pt-4">2. Avoid Formatting Pitfalls</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Avoid complex two-column graphic tables that break text parser ordering.</li>
          <li>Use standard section titles like &quot;Work Experience&quot; and &quot;Skills&quot;.</li>
          <li>Always submit plain text or standard PDF files.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground pt-4">3. Use AI to Match Job Descriptions</h2>
        <p>
          Scan your target job description through an AI ATS Checker to extract missing high-frequency keywords and add them naturally into your bullet points.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4 mt-12">
        <div>
          <h3 className="text-sm font-bold text-foreground">Audit Your Resume Right Now</h3>
          <p className="text-xs text-muted-foreground">Run a free instant ATS score check against any job description.</p>
        </div>
        <Link
          href="/ats-checker"
          className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/25 hover:opacity-90 shrink-0"
        >
          Check ATS Score Free
        </Link>
      </div>
    </article>
  );
}
