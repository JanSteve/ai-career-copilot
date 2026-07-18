import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { emailOTP, magicLink, twoFactor } from "better-auth/plugins";

const appBaseUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

const secretKey =
  process.env.BETTER_AUTH_SECRET ||
  "fallback_secret_key_for_build_environment_min_32_characters_long_12345";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: secretKey,
  baseURL: appBaseUrl,
  appName: "AI Career Copilot",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    requireEmailVerification: false, // Set to true when email server is connected
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      console.log(`[Better Auth] Sending Verification Email to ${user.email}: ${url}`);
      // Integrates with Resend email service
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "mock_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_google_secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "mock_github_id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "mock_github_secret",
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID || "mock_linkedin_id",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "mock_linkedin_secret",
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`[Better Auth OTP] Sending OTP ${otp} (${type}) to ${email}`);
      },
    }),
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        console.log(`[Better Auth MagicLink] Sending link to ${email}: ${url}`);
      },
    }),
    twoFactor({
      issuer: "AI Career Copilot",
      allowPasswordless: true,
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "linkedin"],
    },
  },
  advanced: {
    cookiePrefix: "acc",
    generateId: false,
  },
});

export type Session = typeof auth.$Infer.Session;
