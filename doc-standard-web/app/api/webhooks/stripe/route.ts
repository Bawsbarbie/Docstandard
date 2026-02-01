/**
 * Stripe Webhook Handler
 * Processes Stripe events (checkout.session.completed)
 */

import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    console.error("Missing stripe-signature header")
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured")
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    )
  }

  console.log(`Received Stripe event: ${event.type}`)

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object)
        break

      case "checkout.session.async_payment_succeeded":
        await handleCheckoutSessionCompleted(event.data.object)
        break

      case "checkout.session.async_payment_failed":
        await handleCheckoutSessionFailed(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  console.log("Processing checkout.session.completed:", session.id)

  const orderId = session.metadata?.order_id
  const userId = session.metadata?.user_id

  if (!orderId || !userId) {
    console.error("Missing order_id or user_id in session metadata")
    return
  }

  const supabase = createAdminClient()

  try {
    // Update order status to queued and set paid_at timestamp
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "queued",
        paid_at: new Date().toISOString(),
        stripe_payment_intent_id: session.payment_intent as string,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .eq("user_id", userId)

    if (updateError) {
      console.error("Error updating order:", updateError)
      throw updateError
    }

    console.log(`Order ${orderId} marked as paid and queued`)

    // TODO: Send email notification to user
    // TODO: Trigger processing worker

  } catch (error) {
    console.error("Error in handleCheckoutSessionCompleted:", error)
    throw error
  }
}

/**
 * Handle failed checkout session (async payments)
 */
async function handleCheckoutSessionFailed(session: Stripe.Checkout.Session) {
  console.log("Processing checkout.session.async_payment_failed:", session.id)

  const orderId = session.metadata?.order_id
  const userId = session.metadata?.user_id

  if (!orderId || !userId) {
    console.error("Missing order_id or user_id in session metadata")
    return
  }

  const supabase = createAdminClient()

  try {
    // Update order status to failed
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "failed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .eq("user_id", userId)

    if (updateError) {
      console.error("Error updating order:", updateError)
      throw updateError
    }

    console.log(`Order ${orderId} marked as failed`)

    // TODO: Send email notification to user about failed payment

  } catch (error) {
    console.error("Error in handleCheckoutSessionFailed:", error)
    throw error
  }
}
