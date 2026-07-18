# 🚀 AI Career Copilot — Production SaaS Platform

AI Career Copilot is an autonomous, multi-model AI platform designed to empower professionals to optimize resumes, pass ATS filters, practice STAR-method mock interviews, analyze skill gaps, predict market compensation, and accelerate career trajectories.

---

## 🌟 Key Features

- **AI Resume Review & ATS Engine**: Scans raw resume content against job descriptions, outputs ATS scores (0-100), detects missing keywords, and provides bullet point fixes.
- **Interactive AI Mock Interview Coach**: Role-tailored behavioral, technical, and system design mock sessions with real-time STAR evaluation.
- **Personalized 6-12 Month Career Roadmap**: Generates structured milestone execution phases for senior, principal, and executive transitions.
- **Skill Gap Audit**: Compares candidate skill sets against job postings to identify critical missing hard/soft skills and learning resources.
- **Salary & Negotiation Predictor**: Benchmark compensation bands based on geo-location, experience level, and skill set with custom counter-offer scripts.
- **LinkedIn Profile Optimizer**: Enhances headlines, about sections, and experience bullets for top recruiter search placement.
- **Cover Letter AI**: Instant tailored cover letter generation matching candidate achievements to company needs.
- **Multi-Provider AI Fallback**: Seamlessly switches between **OpenAI (GPT-4o)**, **Google Gemini 2.0**, and **Anthropic Claude 3.5**.
- **Full Stripe Integration**: Subscriptions, tiered feature gating, customer portal, and idempotent webhooks.
- **Better Auth Integration**: Self-hosted authentication supporting Google, GitHub, LinkedIn, and Email login.
- **Programmatic SEO**: 15+ keyword-targeted landing pages, dynamic sitemaps, robots.txt, and Schema.org JSON-LD data.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack, Server Actions)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4, shadcn/ui, Framer Motion
- **Database**: PostgreSQL with Prisma ORM (20 normalized models)
- **Auth**: Better Auth (Google, GitHub, LinkedIn, Email)
- **Payments**: Stripe Checkout & Webhooks
- **Caching & Rate Limiting**: Upstash Redis
- **Email**: Resend

---

## 🚀 Quick Start & Development

### 1. Prerequisites
Ensure Node.js 18.17+ or Node.js 20+ is installed.

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in required keys:
- `DATABASE_URL` (PostgreSQL connection string)
- `BETTER_AUTH_SECRET`
- `OPENAI_API_KEY`, `GOOGLE_GEMINI_API_KEY`, `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

### 3. Database Migration & Seed
```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to launch the application.

---

## 📄 Documentation

- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)
- [License](./LICENSE)
