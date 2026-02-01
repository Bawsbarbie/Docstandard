"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
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
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-xl text-muted-foreground mb-2">
              Your order has been confirmed and payment processed
            </p>
            {sessionId && (
              <p className="text-sm text-muted-foreground font-mono">
                Session: {sessionId.slice(0, 20)}...
              </p>
            )}
          </div>

          {/* Status Card */}
          <div className="rounded-lg border bg-card p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">Processing Started</h2>
                <p className="text-sm text-muted-foreground">
                  Your documents are now queued for processing. Our expert team will
                  begin working on your order shortly.
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">What happens next?</h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>
                    You'll receive a confirmation email with your order details
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  <span>
                    Our team will process your documents within 24 hours
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  <span>
                    We'll notify you when processing is complete
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">4.</span>
                  <span>
                    Download your processed documents from the dashboard
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold text-center hover:opacity-90 transition-opacity"
            >
              View Dashboard
            </Link>
            <Link
              href="/upload"
              className="flex-1 py-3 px-6 border rounded-lg font-semibold text-center hover:bg-muted transition-colors"
            >
              Upload More Files
            </Link>
          </div>

          {/* Auto-redirect Notice */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Redirecting to dashboard in {countdown} second{countdown !== 1 ? "s" : ""}...
          </p>
        </div>
      </div>
    </div>
  )
}
