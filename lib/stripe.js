import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PLANS = {
  spark: {
    name: 'Spark',
    price_id: process.env.STRIPE_PRICE_SPARK,
    description: '1–2 week sprint for a focused project',
  },
  signal: {
    name: 'Signal',
    price_id: process.env.STRIPE_PRICE_SIGNAL,
    description: '3–4 week campaign: film + stills + social cuts',
  },
  studio: {
    name: 'Studio',
    price_id: process.env.STRIPE_PRICE_STUDIO,
    description: 'Monthly retainer: dedicated hours + pipeline work',
  },
};

export async function createCheckoutSession(plan, leadEmail) {
  const planData = PLANS[plan];
  if (!planData) throw new Error(`Invalid plan: ${plan}`);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: planData.price_id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.VERCEL_URL || 'https://artimind.art'}/?booking=success`,
    cancel_url: `${process.env.VERCEL_URL || 'https://artimind.art'}/?booking=cancel`,
    customer_email: leadEmail,
    metadata: {
      plan,
      lead_email: leadEmail,
    },
  });

  return session;
}

export function verifyWebhookSignature(body, signature) {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

export async function retrieveSession(sessionId) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent'],
  });
}

export const PLAN_NAMES = Object.keys(PLANS).reduce((acc, key) => {
  acc[key] = PLANS[key].name;
  return acc;
}, {});
