"use server"

/**
 * Checkout Actions
 * Server actions for Stripe payment processing
 */

import { createClient } from "@/lib/supabase/server"
import { getStripe, STRIPE_CONFIG } from "@/lib/stripe"
import type { Batch } from "@/lib/types/database"

/**
 * Create a Stripe Checkout Session for a batch
 * Returns the session URL for redirect
 */
export async function createCheckoutSession(
  batchId: string
): Promise<{ data: { url: string } | null; error: string | null }> {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    // Get batch and verify ownership
    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("*")
      .eq("id", batchId)
      .single()

    if (batchError || !batch) {
      return { data: null, error: "Batch not found" }
    }

    if (batch.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    // Check if batch already paid
    if (batch.paid_at) {
      return { data: null, error: "Batch already paid" }
    }

    // Check if batch has a valid status
    if (batch.status !== "uploaded" && batch.status !== "created") {
      return { data: null, error: "Batch cannot be paid at this time" }
    }

    // Get file count for the batch
    const { data: files, error: filesError } = await supabase
      .from("uploads")
      .select("id")
      .eq("batch_id", batchId)

    const fileCount = files?.length || 0

    // Create Stripe Checkout Session
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      client_reference_id: batchId,
      line_items: [
        {
          price_data: {
            currency: STRIPE_CONFIG.currency,
            unit_amount: STRIPE_CONFIG.price_cents,
            product_data: {
              name: "Document Processing Service",
              description: `Professional document processing for ${fileCount} file${fileCount !== 1 ? "s" : ""}`,
              images: [],
            },
          },
          quantity: 1,
        },
      ],
      success_url: STRIPE_CONFIG.success_url,
      cancel_url: STRIPE_CONFIG.cancel_url,
      metadata: {
        batch_id: batchId,
        user_id: user.id,
        file_count: fileCount.toString(),
      },
    })

    // Update batch with Stripe session ID
    const { error: updateError } = await supabase
      .from("batches")
      .update({
        stripe_session_id: session.id,
      })
      .eq("id", batchId)
      .eq("user_id", user.id)

    if (updateError) {
      console.error("Error updating batch with session ID:", updateError)
      // Don't fail the request - session is created
    }

    if (!session.url) {
      return { data: null, error: "Failed to create checkout session" }
    }

    return { data: { url: session.url }, error: null }
  } catch (error) {
    console.error("Exception creating checkout session:", error)
    return { data: null, error: "Failed to create checkout session" }
  }
}

/**
 * Get batch details for display
 */
export async function getBatchForCheckout(
  batchId: string
): Promise<{ data: (Batch & { file_count: number }) | null; error: string | null }> {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    // Get batch
    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("*")
      .eq("id", batchId)
      .single()

    if (batchError || !batch) {
      return { data: null, error: "Batch not found" }
    }

    if (batch.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    // Get file count
    const { data: files, error: filesError } = await supabase
      .from("uploads")
      .select("id")
      .eq("batch_id", batchId)

    if (filesError) {
      console.error("Error getting files:", filesError)
    }

    return {
      data: {
        ...batch,
        file_count: files?.length || 0,
      },
      error: null,
    }
  } catch (error) {
    console.error("Exception getting batch:", error)
    return { data: null, error: "Failed to get batch" }
  }
}

/**
 * Check if a batch is paid
 */
export async function checkBatchPayment(
  batchId: string
): Promise<{ data: { paid: boolean; status: string } | null; error: string | null }> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("status, paid_at")
      .eq("id", batchId)
      .eq("user_id", user.id)
      .single()

    if (batchError || !batch) {
      return { data: null, error: "Batch not found" }
    }

    return {
      data: {
        paid: !!batch.paid_at,
        status: batch.status,
      },
      error: null,
    }
  } catch (error) {
    console.error("Exception checking payment:", error)
    return { data: null, error: "Failed to check payment status" }
  }
}
