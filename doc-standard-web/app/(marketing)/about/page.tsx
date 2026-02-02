import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">
              About DocStandard
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
              Built for teams who need accuracy over automation
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We help operations, finance, and data teams convert messy documents
              into structured outputs without the overhead of new software.
            </p>
          </div>

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
