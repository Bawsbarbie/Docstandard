import type { Metadata } from "next"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { buildMeta } from "@/lib/pseo/metadata"

export const metadata: Metadata = buildMeta({
  title: "Privacy Policy",
  description: "Read DocStandard's privacy policy. Learn how we collect, use, and protect your data when you use our document processing platform.",
  canonicalPath: "/privacy",
})

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">Last updated: February 2026</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <p>
              DocStandard (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
              respects your privacy and is committed to protecting your personal
              and business information. This Privacy Policy explains how we
              collect, use, and safeguard information when you use our website or
              services.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                1. Information We Collect
              </h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Contact information (such as name and email address) when you
                  contact us or submit a request
                </li>
                <li>
                  Business documents and files that you voluntarily upload for
                  processing
                </li>
                <li>
                  Technical data such as browser type, device, and basic usage
                  analytics
                </li>
              </ul>
              <p className="mt-4">
                We do not sell or rent your data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                2. How We Use Your Information
              </h2>
              <p>We use your information only to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Deliver document cleaning, structuring, and standardization
                  services
                </li>
                <li>Communicate with you about your request or batch</li>
                <li>Improve our website and service quality</li>
                <li>
                  Meet legal or compliance requirements if necessary
                </li>
              </ul>
              <p className="mt-4">
                Your documents are processed solely for the purpose you request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                3. Document Confidentiality
              </h2>
              <p>
                All uploaded files are treated as confidential business material.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Documents are accessed only for processing and quality control
                </li>
                <li>Files are not reused, shared, or repurposed</li>
                <li>
                  Documents are deleted after delivery unless otherwise agreed
                </li>
              </ul>
              <p className="mt-4">
                DocStandard is a document readiness service, not a data broker.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                4. Cookies &amp; Analytics
              </h2>
              <p>
                We may use basic cookies or analytics tools to understand how
                visitors use our website. These tools do not identify you
                personally and are used only to improve performance and
                usability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                5. Data Security
              </h2>
              <p>
                We take reasonable technical and organizational measures to
                protect your information against unauthorized access, loss, or
                misuse.
              </p>
              <p className="mt-4">
                However, no online system can be guaranteed 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                6. Your Rights
              </h2>
              <p>
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Request access to your data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent for communication</li>
              </ul>
              <p className="mt-4">
                You can make these requests by emailing us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                7. Contact Information
              </h2>
              <p>
                If you have any questions about this Privacy Policy, contact us
                at:
              </p>
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
