// ============================================================================
// AI Career Copilot — Database Seed
// Run: npx prisma db seed
// ============================================================================

import { PrismaClient, Role, Plan } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database …\n");

  // ──────────────────────────────────────────────────────────────────────────
  // 1. Admin user
  // ──────────────────────────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: "admin@aicareercopilot.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@aicareercopilot.com",
      emailVerified: true,
      image: null,
      role: Role.ADMIN,
      plan: Plan.ENTERPRISE,
      credits: 9999,
    },
  });
  console.log(`✅ Admin user created: ${admin.email} (${admin.id})`);

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Blog categories
  // ──────────────────────────────────────────────────────────────────────────
  const categories = [
    { name: "Career",      slug: "career",      description: "Career growth strategies and advice" },
    { name: "Resume",      slug: "resume",      description: "Resume writing tips and best practices" },
    { name: "Interview",   slug: "interview",   description: "Interview preparation and techniques" },
    { name: "AI",          slug: "ai",          description: "AI tools and trends in the job market" },
    { name: "LinkedIn",    slug: "linkedin",    description: "LinkedIn optimization and networking" },
    { name: "Jobs",        slug: "jobs",        description: "Job search strategies and market insights" },
    { name: "Skills",      slug: "skills",      description: "Skill development and learning paths" },
    { name: "Programming", slug: "programming", description: "Programming tutorials and coding career tips" },
    { name: "Portfolio",   slug: "portfolio",   description: "Portfolio building and showcasing work" },
    { name: "Technology",  slug: "technology",  description: "Technology trends and industry news" },
  ];

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`✅ ${categories.length} blog categories created`);

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Feature flags
  // ──────────────────────────────────────────────────────────────────────────
  const featureFlags = [
    {
      key: "ai_mock_interview",
      name: "AI Mock Interview",
      description: "Enable AI-powered mock interview practice sessions with real-time feedback",
      enabled: true,
      percentage: 100,
    },
    {
      key: "resume_builder_v2",
      name: "Resume Builder V2",
      description: "Next-gen resume builder with AI content suggestions and ATS optimization",
      enabled: false,
      percentage: 25,
    },
    {
      key: "career_roadmap",
      name: "Career Roadmap",
      description: "Personalized career roadmap generator based on skills and goals",
      enabled: false,
      percentage: 10,
    },
    {
      key: "salary_predictor",
      name: "Salary Predictor",
      description: "AI-driven salary prediction based on role, location, and experience",
      enabled: true,
      percentage: 50,
    },
  ];

  for (const flag of featureFlags) {
    await prisma.featureFlag.upsert({
      where: { key: flag.key },
      update: {},
      create: flag,
    });
  }
  console.log(`✅ ${featureFlags.length} feature flags created`);

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Sample blog posts
  // ──────────────────────────────────────────────────────────────────────────
  const blogPosts = [
    {
      authorId: admin.id,
      title: "How AI Is Transforming the Job Search in 2026",
      slug: "how-ai-is-transforming-job-search-2026",
      content: `The job search landscape has undergone a seismic shift. Gone are the days of blindly sending out hundreds of resumes and hoping for a callback. In 2026, artificial intelligence has become the co-pilot every job seeker needs.

## The Rise of AI-Powered Job Matching

Traditional job boards relied on keyword matching — a blunt instrument that missed qualified candidates and surfaced irrelevant roles. Modern AI systems understand context, transferable skills, and career trajectories. They can identify that a "Growth Marketing Manager" might be an excellent fit for a "Head of Demand Generation" role, even when the titles share zero keywords.

## ATS Optimization Is No Longer Optional

Applicant Tracking Systems reject up to 75% of resumes before a human ever sees them. AI-powered resume builders now analyze job descriptions in real time, suggesting keyword adjustments, reordering bullet points for maximum impact, and scoring your resume against the specific ATS the target company uses.

## Mock Interviews with Real-Time Feedback

Perhaps the most transformative application is AI mock interviews. These systems analyze not just your answers but your delivery — pacing, filler words, confidence markers, and structure. They provide the kind of candid feedback that even well-meaning friends rarely offer.

## What This Means for You

The candidates who embrace these tools aren't replacing their own effort — they're amplifying it. AI handles the optimization and pattern-matching so you can focus on what matters: telling your authentic story and building genuine connections.

Start your AI-powered job search today. The future of career development is here.`,
      excerpt: "Discover how AI tools are revolutionizing every stage of the job search — from resume optimization to mock interviews with real-time feedback.",
      category: "ai",
      tags: JSON.stringify(["ai", "job-search", "career", "technology", "resume"]),
      coverImage: null,
      published: true,
      seoTitle: "How AI Is Transforming the Job Search in 2026 | AI Career Copilot",
      seoDescription: "Learn how artificial intelligence is reshaping resume optimization, job matching, and interview preparation for modern job seekers.",
      views: 1247,
    },
    {
      authorId: admin.id,
      title: "The Ultimate ATS-Friendly Resume Guide",
      slug: "ultimate-ats-friendly-resume-guide",
      content: `Your resume might be brilliant — and still never get read. Applicant Tracking Systems (ATS) filter out candidates long before a recruiter glances at your application. Here's how to beat the bots and land in front of real humans.

## Understanding ATS Scoring

An ATS parses your resume into structured data: contact info, work history, education, and skills. It then scores you against the job description. A low score means automatic rejection, regardless of your qualifications.

### Key Factors That Affect Your Score
- **Keyword density**: Match the exact phrases from the job description
- **Formatting**: Avoid tables, columns, headers/footers, and graphics
- **File format**: Use .docx or .pdf (check the application instructions)
- **Section headings**: Stick to standard labels — "Experience", "Education", "Skills"

## The Anatomy of a High-Scoring Resume

### 1. Contact Information
Place your name, email, phone, LinkedIn URL, and location at the top. Skip the photo — most ATS systems can't parse images and they introduce bias.

### 2. Professional Summary
Write 2–3 sentences that mirror the job description's core requirements. This is prime real estate for keywords.

### 3. Experience Section
Use reverse chronological order. For each role:
- **Company name** and dates (month/year format)
- **Job title** that matches industry standards
- **Bullet points** starting with strong action verbs
- **Quantified achievements**: "Increased conversion rate by 34%" beats "Improved marketing performance"

### 4. Skills Section
List both hard and soft skills explicitly mentioned in the job description. Don't rely on context clues — spell them out.

## Common Mistakes That Tank Your Score

1. Using creative section titles like "Where I've Made an Impact" instead of "Experience"
2. Embedding text in images or using icon-based skill ratings
3. Submitting a single generic resume for every application
4. Overloading with keywords in an unnatural way (keyword stuffing)

## Your Action Plan

Tailor every resume to every job. Use our AI-powered ATS scorer to check your match percentage before you hit submit. A score above 80% dramatically increases your chances of landing an interview.`,
      excerpt: "Learn how Applicant Tracking Systems work and master the art of writing resumes that pass automated screening every time.",
      category: "resume",
      tags: JSON.stringify(["resume", "ats", "job-search", "career-tips", "formatting"]),
      coverImage: null,
      published: true,
      seoTitle: "The Ultimate ATS-Friendly Resume Guide (2026) | AI Career Copilot",
      seoDescription: "Master ATS-friendly resume writing with our comprehensive guide. Learn formatting tips, keyword strategies, and common mistakes to avoid.",
      views: 3891,
    },
    {
      authorId: admin.id,
      title: "Mastering the STAR Method for Behavioral Interviews",
      slug: "mastering-star-method-behavioral-interviews",
      content: `Behavioral interviews are the most common interview format at top companies — and the STAR method is the gold standard for answering them. Here's how to use it effectively.

## What Is the STAR Method?

STAR stands for:
- **S**ituation: Set the scene and context
- **T**ask: Describe your responsibility or the challenge
- **A**ction: Explain exactly what you did (focus on YOUR contribution)
- **R**esult: Share the outcome, ideally with metrics

## Why Interviewers Use Behavioral Questions

The premise is simple: past behavior predicts future performance. When an interviewer asks "Tell me about a time you dealt with a difficult stakeholder," they're evaluating your conflict resolution skills through real evidence, not hypotheticals.

## Crafting Your STAR Stories

### Step 1: Build Your Story Bank
Before any interview, prepare 8–10 stories that cover common themes:
- Leadership and influence
- Conflict resolution
- Failure and learning
- Innovation and initiative
- Teamwork and collaboration
- Handling ambiguity
- Delivering under pressure

### Step 2: Structure Each Story
Keep each story under 2 minutes. The biggest mistake candidates make is spending 90 seconds on the Situation and rushing through the Action and Result.

**Ideal time allocation:**
- Situation + Task: 30 seconds
- Action: 60 seconds
- Result: 30 seconds

### Step 3: Quantify Everything
Weak: "The project was successful and the client was happy."
Strong: "We delivered the project 2 weeks ahead of schedule, reducing costs by $45K, and the client renewed their contract for 3 additional years."

## Common Behavioral Questions and How to Approach Them

### "Tell me about a time you failed."
Choose a real failure — not a humble brag. Show genuine reflection and concrete changes you made afterward.

### "Describe a situation where you had to influence without authority."
Focus on your communication strategy, stakeholder mapping, and how you built consensus.

### "Give an example of when you had to make a decision with incomplete information."
Highlight your framework for decision-making, risk assessment, and how you communicated uncertainty.

## Practice Makes Permanent

Reading about the STAR method isn't enough. You need to practice out loud — ideally with our AI mock interview tool that provides real-time feedback on your story structure, pacing, and impact.

The best interviewees aren't naturally gifted. They're thoroughly prepared.`,
      excerpt: "Master the STAR method to ace behavioral interviews at top companies. Includes story-building frameworks, timing tips, and practice strategies.",
      category: "interview",
      tags: JSON.stringify(["interview", "star-method", "behavioral", "career", "preparation"]),
      coverImage: null,
      published: true,
      seoTitle: "Mastering the STAR Method for Behavioral Interviews | AI Career Copilot",
      seoDescription: "Learn the STAR method framework for behavioral interviews. Build your story bank, perfect your timing, and practice with AI feedback.",
      views: 2563,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log(`✅ ${blogPosts.length} blog posts created`);

  console.log("\n🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
