"use client"

import React from "react"
import { CheckCircle2 } from "lucide-react"

export const Advantage: React.FC = () => {
  const bulletPoints = [
    "Designed for operational, financial, and data teams",
    "Handles real-world document messiness, not ideal inputs",
    "Structured outputs delivered in Excel, CSV, or JSON",
    "No dashboards, training, or internal process changes",
    "One clear scope. One fixed price. Predictable results.",
  ]

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Side: Professional Neutral Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-100 rounded-2xl z-0"></div>
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop"
              alt="Professional document processing workflow"
              className="relative z-10 w-full h-auto rounded-2xl shadow-xl object-cover aspect-[4/3]"
            />
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-600 text-xs font-semibold uppercase tracking-wide mb-6">
              DocStandard Advantage
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
              Professional Document Processing Built for Business-Critical Data
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
              <p>
                As organizations grow, documents multiply: invoices, contracts,
                reports, and scanned records, often trapped in formats that systems
                can't reliably use. Internal teams are left managing exceptions,
                inconsistencies, and manual cleanup that slows operations and
                introduces risk.
              </p>
              <p>
                DocStandard exists to remove that burden. We process complex,
                unstructured business documents and deliver clean, standardized
                outputs your systems can actually rely on, without software setup,
                subscriptions, or ongoing configuration.
              </p>
              <p className="text-base text-gray-500 italic border-l-4 border-brand-200 pl-6 py-2 bg-gray-50/50 rounded-r-xl">
                Unlike self-serve tools or manual outsourcing, DocStandard combines
                structured processing, validation, and human oversight to ensure
                consistency across every batch. We don't guess, auto-fill blindly,
                or leave edge cases unresolved. Every delivery is reviewed,
                standardized, and ready for downstream use.
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-xl font-bold text-gray-900 pt-6 border-t border-gray-100">
              You don't adopt a tool. You offload a problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
