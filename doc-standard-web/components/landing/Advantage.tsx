"use client"

import React from "react"
import { CircleCheck } from "lucide-react"

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
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">
          {/* Left Side: Image with Offset Border */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-4 left-4 w-full h-full border border-brand-200 rounded-2xl z-0"></div>
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-lg border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1586762523080-6e9a66e47d6c?q=80&w=2000&auto=format&fit=crop"
                alt="Document analysis and data extraction workflow"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Right Side: Content Hierarchy */}
          <div className="w-full lg:w-1/2 pt-2">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-brand-500 text-[11px] font-bold uppercase tracking-wider mb-6 border border-blue-100">
              DocStandard Advantage
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] mb-6">
              Professional Document Processing Built for Business-Critical Data
            </h2>

            <div className="w-20 h-1 bg-brand-500 mb-8"></div>

            <div className="space-y-6 text-[17px] text-gray-600 leading-relaxed mb-10">
              <p>
                As organizations grow, your database will become bigger and more
                complex; as a result, your data assets may lose visibility and
                effectiveness within the organization.
              </p>
              <p>
                DocStandard exists to remove that burden. We process complex,
                unstructured business documents and deliver clean, standardized
                outputs your systems can actually rely on—without software setup,
                subscriptions, or ongoing configuration.
              </p>
              <p>
                Our service is devised to remove obsolete or inaccurate data
                records so you can maintain an up-to-date, reliable, and accurate
                data collection that ensures sustained growth. Our quick and
                efficient document processing services include:
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CircleCheck className="w-5 h-5 text-brand-400 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8 border-t border-gray-100">
              <p className="text-lg font-bold text-gray-900">
                You don&apos;t adopt a tool. You offload a problem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
