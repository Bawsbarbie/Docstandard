"use server"

/**
 * Stripe Actions (Compat Layer)
 *
 * The codebase already has `lib/actions/checkout.ts` which owns the Stripe logic.
 * This file provides the Cursor-prompted shape: `{ url, error }`.
 */

import { createCheckoutSession as createCheckoutSessionInternal } from "@/lib/actions/checkout"

export async function createCheckoutSession(
  batchId: string
): Promise<{ url: string | null; error: string | null }> {
  const { data, error } = await createCheckoutSessionInternal(batchId)
  return { url: data?.url ?? null, error }
}

