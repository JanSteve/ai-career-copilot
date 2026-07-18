import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mockKeyForBuild1234567890", {
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: "Free",
    description: "Get started with basic career tools",
    price: 0,
    priceId: "",
    credits: 3,
    features: [
      "3 AI analyses per month",
      "Basic resume review",
      "ATS score check",
      "1 resume version",
      "Community access",
    ],
  },
  PRO: {
    name: "Pro",
    description: "Unlock your full career potential",
    price: 19,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro_mock",
    credits: -1, // unlimited
    features: [
      "Unlimited AI analyses",
      "Advanced resume builder",
      "AI mock interviews",
      "LinkedIn optimizer",
      "Career roadmap",
      "Salary predictor",
      "Cover letter generator",
      "Priority support",
      "All resume versions",
      "Job match scoring",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    description: "For teams and career professionals",
    price: 49,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || "price_ent_mock",
    credits: -1,
    features: [
      "Everything in Pro",
      "Team management",
      "API access",
      "Custom AI prompts",
      "White-label reports",
      "Dedicated support",
      "Analytics dashboard",
      "Bulk resume processing",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
