import type { Metadata } from "next"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { buildMeta } from "@/lib/pseo/metadata"

export const metadata: Metadata = buildMeta({
  title: "Terms of Service",
  description: "Read DocStandard's terms of service. Understand the rules governing use of our document processing and data normalization platform.",
  canonicalPath: "/terms",
})

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600">Last updated: February 2026</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <p>
              By accessing or using DocStandard&apos;s website or services, you
              agree to the following Terms of Service.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                1. Services Overview
              </h2>
              <p>
                DocStandard provides document cleaning, structuring, and
                standardization services.
              </p>
              <p className="mt-4">
                We prepare business documents to be system-ready (e.g. clean
                PDFs, structured spreadsheets, JSON, CSV, or XML).
              </p>
              <p className="mt-4">
                We do not provide data entry, data scraping, or manual content
                creation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                2. Client Responsibilities
              </h2>
              <p>You agree that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  You have the legal right to upload and submit the documents
                  you provide
                </li>
                <li>
                  The documents do not violate any laws or third-party rights
                </li>
                <li>
                  You understand that output accuracy depends on the quality of
                  source files
                </li>
                <li>You are responsible for reviewing final outputs before use.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                3. Turnaround &amp; Scope
              </h2>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Standard batches are processed within the stated turnaround
                  time
                </li>
                <li>
                  Unusually complex or oversized batches may require scope
                  confirmation
                </li>
                <li>
                  We reserve the right to decline documents outside our service
                  scope
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                4. Payments &amp; Refunds
              </h2>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>All prices are stated clearly before processing</li>
                <li>Payments are required before work begins</li>
                <li>
                  Due to the custom nature of document processing, refunds are
                  not guaranteed once work has started
                </li>
                <li>
                  If there is a service issue, we will make reasonable efforts to
                  correct it.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                5. Intellectual Property
              </h2>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>You retain full ownership of your original documents</li>
                <li>You own the processed outputs delivered to you</li>
                <li>DocStandard retains no rights to your content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                6. Limitation of Liability
              </h2>
              <p>DocStandard is not liable for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Business losses resulting from how processed documents are used
                </li>
                <li>
                  Errors caused by incomplete, poor-quality, or misleading source
                  files
                </li>
                <li>Indirect or consequential damages</li>
              </ul>
              <p className="mt-4">
                Our liability is limited to the amount paid for the specific
                service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                7. Termination
              </h2>
              <p>
                We reserve the right to refuse or terminate service if:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>These terms are violated</li>
                <li>Documents involve illegal or unethical use</li>
                <li>Abuse or misuse of the service occurs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                8. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of The Netherlands.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                9. Contact Information
              </h2>
              <p>For questions regarding these Terms:</p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hello@docstandard.co"
                    className="text-brand-600 hover:underline"
                  >
                    hello@docstandard.co
                  </a>
                </p>
                <p>
                  <strong>Address:</strong>
                </p>
                <p className="pl-4">
                  DocStandard
                  <br />
                  Keizersgracht 555
                  <br />
                  1017 DR Amsterdam
                  <br />
                  The Netherlands
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
