# Vercel Deployment Guide

Follow these steps to deploy AI Career Copilot to production on Vercel.

## 1. Prerequisites
- Vercel Account
- Managed PostgreSQL database (e.g. Supabase, Neon, or Railway)
- Upstash Redis database

## 2. Deploying via Vercel CLI
```bash
npx vercel
```

## 3. Environment Variables
Add the environment variables in your Vercel Project Settings:
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `OPENAI_API_KEY`
- `GOOGLE_GEMINI_API_KEY`
- `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

## 4. Database Migrations
Run Prisma migrations against your production database:
```bash
npx prisma migrate deploy
```
