"use server"

/**
 * Checkout Actions
 * Server actions for Stripe payment processing
 */

import { createClient } from "@/lib/supabase/server"
import { stripe, STRIPE_CONFIG } from "@/lib/stripe"
import type { Order } from "@/lib/types/database"

/**
 * Create a Stripe Checkout Session for an order
 * Returns the session URL for redirect
 */
export async function createCheckoutSession(
  orderId: string
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

    // Get order and verify ownership
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single()

    if (orderError || !order) {
      return { data: null, error: "Order not found" }
    }

    if (order.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    // Check if order already paid
    if (order.paid_at) {
      return { data: null, error: "Order already paid" }
    }

    // Check if order has a valid status
    if (order.status !== "uploaded" && order.status !== "created") {
      return { data: null, error: "Order cannot be paid at this time" }
    }

    // Get file count for the order
    const { data: files, error: filesError } = await supabase
      .from("order_files")
      .select("id")
      .eq("order_id", orderId)

    const fileCount = files?.length || 0

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      client_reference_id: orderId,
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
        order_id: orderId,
        user_id: user.id,
        file_count: fileCount.toString(),
      },
    })

    // Update order with Stripe session ID
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        stripe_session_id: session.id,
      })
      .eq("id", orderId)
      .eq("user_id", user.id)

    if (updateError) {
      console.error("Error updating order with session ID:", updateError)
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
 * Get order details for display
 */
export async function getOrderForCheckout(
  orderId: string
): Promise<{ data: (Order & { file_count: number }) | null; error: string | null }> {
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

    // Get order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single()

    if (orderError || !order) {
      return { data: null, error: "Order not found" }
    }

    if (order.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    // Get file count
    const { data: files, error: filesError } = await supabase
      .from("order_files")
      .select("id")
      .eq("order_id", orderId)

    if (filesError) {
      console.error("Error getting files:", filesError)
    }

    return {
      data: {
        ...order,
        file_count: files?.length || 0,
      },
      error: null,
    }
  } catch (error) {
    console.error("Exception getting order:", error)
    return { data: null, error: "Failed to get order" }
  }
}

/**
 * Check if an order is paid
 */
export async function checkOrderPayment(
  orderId: string
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

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("status, paid_at")
      .eq("id", orderId)
      .eq("user_id", user.id)
      .single()

    if (orderError || !order) {
      return { data: null, error: "Order not found" }
    }

    return {
      data: {
        paid: !!order.paid_at,
        status: order.status,
      },
      error: null,
    }
  } catch (error) {
    console.error("Exception checking payment:", error)
    return { data: null, error: "Failed to check payment status" }
  }
}
