import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.warn("STRIPE_WEBHOOK_SECRET missing. Skipping verification in dev.");
      event = JSON.parse(body);
    } else {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      if (session.client_reference_id) {
        await prisma.user.update({
          where: { id: session.client_reference_id },
          data: {
            plan: "PRO",
            credits: 999999, // Unlimited
          },
        });
      }
      break;
    }
    case "customer.subscription.deleted": {
      if (session.client_reference_id) {
        await prisma.user.update({
          where: { id: session.client_reference_id },
          data: {
            plan: "FREE",
            credits: 3,
          },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
