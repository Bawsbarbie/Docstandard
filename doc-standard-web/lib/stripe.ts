/**
 * Stripe Configuration
 * Singleton instance of Stripe client
 */

import Stripe from "stripe"
import type { BatchTier } from "@/lib/types/database"

// Initialize Stripe lazily to avoid build-time errors
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    })
  }
  return stripeInstance
}

// For backward compatibility
export const stripe = {
  get checkout() {
    return getStripe().checkout
  },
  get webhooks() {
    return getStripe().webhooks
  },
}

// Stripe configuration constants
export const STRIPE_CONFIG = {
  currency: "usd",
  price_cents: 79900, // Default standard tier price ($799.00)
  success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/upload`,
} as const

export const STRIPE_PRICE_BY_TIER: Record<BatchTier, number> = {
  standard: 79900,
  expedited: 129900,
  compliance: 129900,
}

export function getTierPriceCents(tier?: BatchTier | null): number {
  if (!tier) return STRIPE_PRICE_BY_TIER.standard
  return STRIPE_PRICE_BY_TIER[tier] ?? STRIPE_PRICE_BY_TIER.standard
}
