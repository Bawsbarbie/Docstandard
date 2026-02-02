import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { Advantage } from "@/components/landing/Advantage"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <Advantage />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-10">
            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                The problem we kept seeing
              </h2>
              <p className="text-gray-600">
                Critical workflows break when documents are inconsistent,
                incomplete, or trapped in PDFs. Teams lose time cleaning data
                instead of using it.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Why automation alone fails
              </h2>
              <p className="text-gray-600">
                Pure OCR and black box tools miss edge cases, introduce silent
                errors, and still require manual cleanup. Accuracy is the real
                requirement.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Why we built a service instead of software
              </h2>
              <p className="text-gray-600">
                You do not need another dashboard. You need reliable outputs
                that can be used immediately. We built DocStandard to deliver
                that outcome with accountability.
              </p>
            </section>

            <section className="rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Our philosophy
              </h2>
              <p className="text-gray-600">
                Accuracy comes first. Speed is important, but only after quality
                and verification. Scale follows once the output is proven.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
