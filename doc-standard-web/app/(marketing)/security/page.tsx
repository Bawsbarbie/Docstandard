import type { Metadata } from "next"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { buildMeta } from "@/lib/pseo/metadata"

export const metadata: Metadata = buildMeta({
  title: "Security",
  description: "DocStandard's security practices: encryption in transit and at rest, access controls, audit logging, and data handling for enterprise document processing.",
  canonicalPath: "/security",
})

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">
              Security and Compliance
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Data handling built for enterprise expectations
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              DocStandard is a service layer for sensitive document processing.
              We emphasize access control, traceability, and clear retention
              policies.
            </p>
          </div>

          <div className="space-y-10">
            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Data handling
              </h2>
              <p className="text-gray-600">
                Files are processed in private environments with least privilege
                access. Data is scoped to your batch and never mixed across
                clients.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Access controls
              </h2>
              <p className="text-gray-600">
                Access is limited to authorized personnel involved in your
                processing workflow. Operational access is logged and reviewed.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Retention policy
              </h2>
              <p className="text-gray-600">
                We retain files only for the period required to complete your
                batch and deliver outputs. Extended retention is available on
                request.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Private processing environments
              </h2>
              <p className="text-gray-600">
                Processing occurs in isolated environments with strict
                separation of client data and consistent operational controls.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">NDA</h2>
              <p className="text-gray-600">
                NDA available on request. We are comfortable working within
                procurement and legal review processes.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                GDPR ready
              </h2>
              <p className="text-gray-600">
                We follow GDPR aligned practices and can provide documentation
                for data handling and retention standards.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
