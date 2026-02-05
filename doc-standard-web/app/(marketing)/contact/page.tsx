"use client"

import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Upload } from "lucide-react"

function ContactForm() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    workEmail: "",
    companyName: "",
    documentTypes: "",
    fileCount: "",
    outputFormat: "",
    uploadLater: false,
    deadline: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Pre-fill document type from URL query parameter
  useEffect(() => {
    const service = searchParams?.get("service")
    if (service) {
      setFormData((prev) => ({ ...prev, documentTypes: service }))
    }
  }, [searchParams])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement server action to send email or save to database
    // For now, we'll use mailto as fallback
    const subject = encodeURIComponent("Document Processing Request")
    const body = encodeURIComponent(`
Work Email: ${formData.workEmail}
Company: ${formData.companyName || "Not provided"}
Document Types: ${formData.documentTypes}
Approx. Files/Pages: ${formData.fileCount}
Output Format: ${formData.outputFormat}
Upload Later: ${formData.uploadLater ? "Yes" : "No"}
Deadline: ${formData.deadline || "Not specified"}
Notes: ${formData.notes || "None"}
    `)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-28 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Request Submitted
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We&apos;ll review your scope and get back to you within one
                business day with fit, turnaround, and pricing.
              </p>
              <Link
                href="/upload"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Documents
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
              Share your document scope and we&apos;ll confirm fit, turnaround,
              and pricing before processing.
            </p>
          </div>

          {/* Intake Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div className="rounded-2xl border border-gray-100 p-6 space-y-6">
              {/* Work Email - Required */}
              <div>
                <label
                  htmlFor="workEmail"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  required
                  value={formData.workEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              {/* Company Name - Optional */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors"
                  placeholder="Your company"
                />
              </div>

              {/* Document Types - Required */}
              <div>
                <label
                  htmlFor="documentTypes"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Document Type(s) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="documentTypes"
                  name="documentTypes"
                  required
                  value={formData.documentTypes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors"
                  placeholder="e.g., Invoices, Contracts, Forms"
                />
              </div>

              {/* File Count - Required */}
              <div>
                <label
                  htmlFor="fileCount"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Approx. Number of Files / Pages{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fileCount"
                  name="fileCount"
                  required
                  value={formData.fileCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors"
                  placeholder="e.g., 50 files, ~200 pages"
                />
              </div>

              {/* Output Format - Required */}
              <div>
                <label
                  htmlFor="outputFormat"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Desired Output Format <span className="text-red-500">*</span>
                </label>
                <select
                  id="outputFormat"
                  name="outputFormat"
                  required
                  value={formData.outputFormat}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors bg-white"
                >
                  <option value="">Select format...</option>
                  <option value="Excel">Excel</option>
                  <option value="CSV">CSV</option>
                  <option value="JSON">JSON</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>

              {/* Upload Option - Required */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="uploadLater"
                    checked={formData.uploadLater}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-700">
                    I&apos;ll upload files after review
                  </span>
                </label>
              </div>

              {/* Deadline - Optional */}
              <div>
                <label
                  htmlFor="deadline"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Deadline / Urgency
                </label>
                <input
                  type="text"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors"
                  placeholder="e.g., End of month, ASAP, Flexible"
                />
              </div>

              {/* Notes - Optional */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors resize-none"
                  placeholder="Any specific requirements or context..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit for review"}
            </button>
          </form>

          {/* Upload Documents CTA */}
          <div className="rounded-2xl border border-gray-100 p-6 mb-8">
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
              <Upload className="w-5 h-5 mr-2" />
              Upload Documents
            </Link>
          </div>

          {/* Email Fallback */}
          <div className="text-sm text-gray-500 text-center">
            Prefer email? Send details to{" "}
            <a
              href="mailto:hello@docstandard.co"
              className="text-brand-600 hover:underline"
            >
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

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-28 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <ContactForm />
    </Suspense>
  )
}
