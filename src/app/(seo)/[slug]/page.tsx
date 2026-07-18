import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Metadata } from "next";

const seoPagesData: Record<
  string,
  {
    title: string;
    description: string;
    h1: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    features: string[];
    faqs: { q: string; a: string }[];
  }
> = {
  "ats-checker": {
    title: "Free AI ATS Resume Checker 2026 — Score & Optimize Match Rate",
    description: "Scan your resume against any job description. Get instant ATS compatibility score, missing keywords, and structural fixes.",
    h1: "Free AI ATS Resume Compatibility Checker",
    subtitle: "Outperform applicant tracking systems with automated keyword matching & formatting analysis.",
    ctaText: "Check ATS Score Free",
    ctaHref: "/resume/ats",
    features: [
      "Real-time keyword density auditing",
      "Format compliance verification",
      "Job description match scoring",
      "Actionable section-by-section improvements",
    ],
    faqs: [
      {
        q: "What is an ATS Resume Checker?",
        a: "An ATS Resume Checker scans your resume text using Applicant Tracking System algorithms to verify keyword density and format parsing.",
      },
      {
        q: "Is this ATS checker free?",
        a: "Yes, our starter tier includes free instant ATS score audits.",
      },
    ],
  },
  "resume-review": {
    title: "AI Resume Reviewer — Instant Executive Feedback & Grading",
    description: "Get executive-level feedback on your resume. Improve impact statements, bullet points, and recruiter impression.",
    h1: "Executive AI Resume Review & Scoring",
    subtitle: "Elevate your resume with senior recruiter intelligence and metric-driven bullet enhancements.",
    ctaText: "Run AI Resume Review",
    ctaHref: "/resume/review",
    features: [
      "STAR method bullet point strengthening",
      "Executive summary rewrites",
      "Quantifiable impact metrics checker",
      "Recruiter readability grading",
    ],
    faqs: [
      {
        q: "How does AI Resume Review work?",
        a: "Our AI model evaluates your resume against thousands of top-performing candidate resumes to highlight weaknesses and write improvements.",
      },
    ],
  },
  "linkedin-optimizer": {
    title: "AI LinkedIn Profile Optimizer — Boost Recruiter Inbound DMs",
    description: "Optimize your LinkedIn headline, about summary, and experience to rank #1 in recruiter candidate searches.",
    h1: "AI LinkedIn Profile Optimizer",
    subtitle: "Drive 5x more recruiter inbounds with search-optimized headlines and personal brand copy.",
    ctaText: "Optimize LinkedIn Profile",
    ctaHref: "/career/linkedin",
    features: [
      "High-converting headline templates",
      "Story-driven about section copy",
      "Recruiter search keyword injection",
      "Social Selling Index (SSI) guidance",
    ],
    faqs: [
      {
        q: "Why is LinkedIn optimization important?",
        a: "Over 87% of recruiters regularly search LinkedIn for candidates. Optimizing your profile increases your search appearance frequency dramatically.",
      },
    ],
  },
  "interview-ai": {
    title: "AI Mock Interview Simulator — Practice Behavioral & Technical Questions",
    description: "Practice interactive mock interviews with real-time feedback on your answers using the STAR method framework.",
    h1: "AI Mock Interview Coach & Simulator",
    subtitle: "Master behavioral, technical, and system design interviews with instant AI feedback.",
    ctaText: "Start Mock Interview",
    ctaHref: "/interview/mock",
    features: [
      "Role-tailored interview question panels",
      "Real-time STAR method answer scoring",
      "High-signal sample answer generation",
      "Behavioral and technical practice rounds",
    ],
    faqs: [
      {
        q: "Can AI really coach me for interviews?",
        a: "Yes, our AI analyzes your verbal or written responses against top-rated candidate answers to evaluate clarity, depth, and structure.",
      },
    ],
  },
  "career-roadmap": {
    title: "AI Career Roadmap Generator — 6-12 Month Growth Trajectory",
    description: "Generate a personalized 6 to 12-month career progression roadmap detailing skill gaps, certifications, and high-impact projects.",
    h1: "Autonomous AI Career Roadmap Generator",
    subtitle: "Chart your path from senior engineer to principal architect or engineering director.",
    ctaText: "Generate Career Roadmap",
    ctaHref: "/career/roadmap",
    features: [
      "Step-by-step milestone execution plans",
      "Skill gap identification",
      "Target project recommendations",
      "Seniority progression readiness metrics",
    ],
    faqs: [
      {
        q: "What is a career roadmap?",
        a: "A career roadmap outlines specific technical milestones, skills to acquire, and projects to complete to achieve your target title.",
      },
    ],
  },
  "salary-predictor": {
    title: "AI Salary Predictor & Offer Negotiation Intelligence",
    description: "Predict market compensation ranges based on your role, location, experience, and skill set. Get negotiation scripts.",
    h1: "AI Salary Predictor & Negotiation Guide",
    subtitle: "Know your true market value and negotiate higher base pay with proven scripts.",
    ctaText: "Predict Your Salary",
    ctaHref: "/career/salary",
    features: [
      "Geo-location salary benchmark data",
      "Total compensation range estimation",
      "Counter-offer negotiation scripts",
      "Equity and bonus valuation insights",
    ],
    faqs: [
      {
        q: "How accurate is the salary predictor?",
        a: "Our models combine real-time compensation data across tech hubs, remote offers, and skill rarity benchmarks.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPagesData[slug];
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
    },
  };
}

export default async function ProgrammaticSEOPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = seoPagesData[slug];

  if (!page) {
    notFound();
  }

  // Schema.org JSON-LD SoftwareApplication & FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.h1,
    description: page.description,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="section-padding hero-gradient space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="page-container text-center space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Autonomous AI Career Platform
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight text-balance">
          {page.h1}
        </h1>
        <p className="text-lg text-muted-foreground text-pretty max-w-xl mx-auto">
          {page.subtitle}
        </p>
        <div>
          <Link
            href={page.ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-base shadow-xl shadow-primary/25 hover:scale-105 transition-all"
          >
            {page.ctaText} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Feature List */}
      <div className="page-container max-w-4xl">
        <div className="glass-card p-8 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Core Capabilities</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {page.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border text-xs font-semibold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {page.faqs.length > 0 && (
        <div className="page-container max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold text-foreground text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {page.faqs.map((faq, i) => (
              <div key={i} className="glass-card p-6 space-y-2 border-border">
                <h3 className="text-sm font-bold text-foreground">{faq.q}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
