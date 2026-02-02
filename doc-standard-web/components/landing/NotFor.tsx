import React from "react"
import { XCircle } from "lucide-react"

export const NotFor: React.FC = () => {
  const items = [
    "Not a SaaS dashboard",
    "Not self serve OCR",
    "Not cheap offshore data entry",
    "Not a black box API",
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-gray-50 p-10 md:p-12">
          <div className="text-center mb-10">
            <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">
              Clear Fit
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              What DocStandard is not
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We are a service partner, focused on accuracy and accountability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-4"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
