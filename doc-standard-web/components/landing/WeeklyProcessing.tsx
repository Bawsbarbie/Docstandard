import React from "react"
import { FileStack, Layers, ShieldCheck, Sparkles } from "lucide-react"

export const WeeklyProcessing: React.FC = () => {
  const stats = [
    {
      icon: FileStack,
      title: "Thousands of pages",
      desc: "High volume batches processed with consistent standards.",
    },
    {
      icon: Layers,
      title: "Dozens of document types",
      desc: "Invoices, contracts, forms, reports, and more.",
    },
    {
      icon: ShieldCheck,
      title: "Human verified outputs",
      desc: "Edge cases flagged. Accuracy confirmed before delivery.",
    },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">
            Proof Without Clients
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            What we process every week
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Real operational workloads, handled with strict quality control and
            traceable output standards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-lg flex items-center justify-center mb-5">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {stat.title}
              </h3>
              <p className="text-gray-600">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-brand-700 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Scope confirmed before processing. Edge cases flagged, not guessed.
          </div>
        </div>
      </div>
    </section>
  )
}
