"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { getBatchForCheckout, createCheckoutSession } from "@/lib/actions/checkout"

// Initialise Stripe once — outside the component to avoid re-creating on each render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface BatchDetails {
  id: string
  status: string
  price_cents: number
  file_count: number
  created_at: string
}

export default function CheckoutPage({ params }: { params: { orderId: string } }) {
  const router = useRouter()
  const [batch, setBatch] = useState<BatchDetails | null>(null)
  const [loadingBatch, setLoadingBatch] = useState(true)
  const [batchError, setBatchError] = useState<string | null>(null)

  // showForm = true once the user clicks Pay and we have a clientSecret
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [creatingSession, setCreatingSession] = useState(false)

  // clientSecret is passed to EmbeddedCheckoutProvider
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  // ── Load batch summary ──────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      const { data, error } = await getBatchForCheckout(params.orderId)
      if (error || !data) {
        setBatchError(error ?? "Failed to load batch")
      } else {
        setBatch(data)
      }
      setLoadingBatch(false)
    }
    load()
  }, [params.orderId])

  // ── fetchClientSecret is passed to EmbeddedCheckoutProvider ────────────────
  // Stripe calls this automatically when the provider mounts.
  const fetchClientSecret = useCallback(async () => {
    if (!batch) return ""
    const { data, error } = await createCheckoutSession(batch.id)
    if (error || !data) {
      setFormError(error ?? "Failed to create checkout session")
      return ""
    }
    return data.clientSecret
  }, [batch])

  // ── User clicks "Pay" → reveal the embedded form ───────────────────────────
  const handleShowCheckout = async () => {
    if (!batch) return
    setCreatingSession(true)
    setFormError(null)

    // Pre-fetch the client secret so the form appears immediately
    const { data, error } = await createCheckoutSession(batch.id)
    if (error || !data) {
      setFormError(error ?? "Failed to start checkout")
      setCreatingSession(false)
      return
    }
    setClientSecret(data.clientSecret)
    setShowForm(true)
    setCreatingSession(false)
  }

  // ── Loading / error states ──────────────────────────────────────────────────
  if (loadingBatch) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </div>
    )
  }

  if (batchError || !batch) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-destructive font-medium">Error</p>
            <p className="text-sm text-destructive/80 mt-1">{batchError ?? "Batch not found"}</p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 px-6 py-2 text-sm font-medium hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // ── Embedded checkout form ─────────────────────────────────────────────────
  if (showForm && clientSecret) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1">Complete Payment</h1>
            <p className="text-muted-foreground text-sm">
              {batch.file_count} file{batch.file_count !== 1 ? "s" : ""} ·{" "}
              ${(batch.price_cents / 100).toFixed(2)}
            </p>
          </div>

          {/* Stripe's embedded checkout renders its own iframe here */}
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>

          <button
            onClick={() => {
              setShowForm(false)
              setClientSecret(null)
            }}
            className="mt-6 w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            ← Back to order summary
          </button>
        </div>
      </div>
    )
  }

  // ── Order summary + Pay button ─────────────────────────────────────────────
  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Complete Your Batch</h1>
          <p className="text-muted-foreground">
            Review your batch details and proceed to payment
          </p>
        </div>

        {/* Batch Summary Card */}
        <div className="rounded-lg border bg-card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Batch Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Batch ID</span>
              <span className="font-mono text-sm">{batch.id.slice(0, 8)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Number of Files</span>
              <span className="font-medium">{batch.file_count}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium">Document Processing</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Processing Time</span>
              <span className="font-medium">24 hours</span>
            </div>
            <div className="flex justify-between py-3 pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold">
                ${(batch.price_cents / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="rounded-lg border bg-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">What&apos;s Included</h2>
          <ul className="space-y-3">
            {[
              "Expert processing by licensed professionals",
              "100% accuracy guarantee with compliance review",
              "Unlimited revisions until you're satisfied",
              "Dedicated support team available 24/7",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Error message */}
        {formError && (
          <div className="mb-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{formError}</p>
          </div>
        )}

        {/* Pay button — opens the embedded form inline */}
        <button
          onClick={handleShowCheckout}
          disabled={creatingSession}
          className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {creatingSession ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              Preparing checkout…
            </span>
          ) : (
            `Pay $${(batch.price_cents / 100).toFixed(2)}`
          )}
        </button>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Secure payment powered by Stripe
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  )
}
