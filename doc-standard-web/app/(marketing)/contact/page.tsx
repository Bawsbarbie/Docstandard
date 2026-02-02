import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">
              Contact
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Talk to a human about your documents
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Share your scope and we will confirm fit, turnaround, and pricing.
              Response time is typically within one business day.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Ready to start?
            </h2>
            <p className="text-gray-600 mb-6">
              Upload your files and we will review the batch before processing.
            </p>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors"
            >
              Upload Documents
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Prefer email? Send details to{" "}
            <a href="mailto:hello@docstandard.co" className="text-brand-600">
              hello@docstandard.co
            </a>
            .
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
