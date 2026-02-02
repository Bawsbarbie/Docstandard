import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import { Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Hero Section */}
          <div className="text-center mb-16 mt-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Turning business documents into usable data — so your team can
              focus on what matters.
            </p>
          </div>

          <div className="space-y-12">
            {/* The Problem */}
            <section>
              <p className="text-lg text-gray-700 leading-relaxed">
                At enterprises and mid-size companies alike, documents are
                everywhere — invoices, contracts, reports, forms, scans. They
                touch every team, but they rarely speak the same language.
                Systems break. Analysts spend hours cleaning data instead of
                using it. Critical decisions get delayed by messy inputs.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                That&apos;s the problem we kept seeing. And it wasn&apos;t just
                technical — it was felt by the people stuck in the middle of
                it.
              </p>
            </section>

            {/* Why DocStandard Exists */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Why DocStandard Exists
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Most solutions in the market are either:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6 ml-4">
                <li>
                  Software tools that require setup, configuration, dashboards to
                  learn, and constant tuning, or
                </li>
                <li>
                  Outsourced data entry that trades speed for accuracy and
                  creates new bottlenecks.
                </li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">
                Neither solves the real problem: reliable, standardized data
                outputs that teams can trust immediately. So we built a service
                instead of another tool.
              </p>
            </section>

            {/* We Believe */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                We believe:
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Accuracy comes first</strong> — because imperfect
                    data still costs time, money, and trust.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Simple, predictable outcomes</strong> matter more
                    than subscriptions or hidden complexity.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Your team should work with usable data</strong>, not
                    manage documents.
                  </p>
                </li>
              </ul>
            </section>

            {/* Who We Serve */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Who We Serve
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We partner with professionals who depend on data to get work done
                — like:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6 ml-4">
                <li>Operations teams streamlining processes</li>
                <li>Finance teams reconciling records and reporting</li>
                <li>Data teams feeding analytics and automation workflows</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">
                You don&apos;t need another dashboard. You need consistent,
                trustworthy data outputs that plug right into your systems and
                workflows.
              </p>
            </section>

            {/* How We Work */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                How We Work
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We take your documents — however messy and inconsistent — and
                turn them into structured, standardized data you can actually
                use. We do this through a careful process of cleaning,
                validation, and verification that respects both precision and
                business context.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our approach is:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Human-focused</strong> — because automation alone
                    misses real-world complexity
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Outcome-oriented</strong> — delivering Excel, CSV, or
                    JSON ready for your workflows
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Predictable</strong> — we agree scope and price
                    upfront, with no surprises
                  </p>
                </li>
              </ul>
            </section>

            {/* Our Philosophy */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Philosophy
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We&apos;ve chosen to focus on service over software because most
                teams don&apos;t want another tool. They want results.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                So we operate with principles that reflect that reality:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Clarity over complexity</strong> — no dashboards, no
                    endless configuration
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Accountability over ambiguity</strong> — we stand by
                    our outputs
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-600 font-bold mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Partnership over products</strong> — we take work
                    off your plate so you can focus on your goals
                  </p>
                </li>
              </ul>
            </section>

            {/* Our Team */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Our Team
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We&apos;re a small group of operators and data practitioners who
                have lived the chaos of unstructured documents. Our backgrounds
                are in operations, analytics, and workflow automation — and we
                built DocStandard to solve the pain we saw every day.
              </p>
            </section>

            {/* Where We're Headquartered */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Where We&apos;re Headquartered
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                DocStandard is a Dutch-registered company, serving teams around
                the world:
              </p>
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-1" />
                <div className="text-gray-700">
                  <p className="font-semibold">DocStandard</p>
                  <p>Keizersgracht 555</p>
                  <p>1017 DR Amsterdam</p>
                  <p>The Netherlands</p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="text-center py-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Want to stay connected?
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Whether you want to ask a question, discuss a specific workflow,
                or share your document challenges — we&apos;re here.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                hello@docstandard.co
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
