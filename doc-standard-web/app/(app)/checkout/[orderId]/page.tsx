"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getOrderForCheckout, createCheckoutSession } from "@/lib/actions/checkout"

interface OrderDetails {
  id: string
  status: string
  price_cents: number
  file_count: number
  created_at: string
}

export default function CheckoutPage({ params }: { params: { orderId: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processingPayment, setProcessingPayment] = useState(false)

  useEffect(() => {
    loadOrder()
  }, [params.orderId])

  const loadOrder = async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await getOrderForCheckout(params.orderId)

    if (fetchError || !data) {
      setError(fetchError || "Failed to load order")
      setLoading(false)
      return
    }

    setOrder(data)
    setLoading(false)
  }

  const handleCheckout = async () => {
    if (!order) return

    setProcessingPayment(true)
    setError(null)

    try {
      const { data, error: checkoutError } = await createCheckoutSession(order.id)

      if (checkoutError || !data) {
        setError(checkoutError || "Failed to create checkout session")
        setProcessingPayment(false)
        return
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (err) {
      console.error("Checkout error:", err)
      setError("An unexpected error occurred")
      setProcessingPayment(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="p-6 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-destructive font-medium">Error</p>
            <p className="text-sm text-destructive/80 mt-1">
              {error || "Order not found"}
            </p>
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

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Complete Your Order</h1>
          <p className="text-muted-foreground">
            Review your order details and proceed to payment
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="rounded-lg border bg-card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono text-sm">{order.id.slice(0, 8)}</span>
            </div>

            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Number of Files</span>
              <span className="font-medium">{order.file_count}</span>
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
                ${(order.price_cents / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="rounded-lg border bg-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">What's Included</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm">
                Expert processing by licensed professionals
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm">
                100% accuracy guarantee with compliance review
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm">
                Unlimited revisions until you're satisfied
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm">
                Dedicated support team available 24/7
              </span>
            </li>
          </ul>
        </div>

        {/* Payment Button */}
        <button
          onClick={handleCheckout}
          disabled={processingPayment}
          className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {processingPayment ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </span>
          ) : (
            `Pay $${(order.price_cents / 100).toFixed(2)}`
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
