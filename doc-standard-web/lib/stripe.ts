/**
 * Stripe Configuration
 * Singleton instance of Stripe client
 */

import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
})

// Stripe configuration constants
export const STRIPE_CONFIG = {
  currency: "usd",
  price_cents: 79900, // $799.00
  success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/upload`,
} as const
