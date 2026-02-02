import React from "react"
import { FileSpreadsheet, FileJson, FileText, CheckCircle } from "lucide-react"

export const Deliverables: React.FC = () => {
  const items = [
    {
      icon: FileSpreadsheet,
      title: "Excel and CSV outputs",
      desc: "Clean rows and columns, ready for import.",
    },
    {
      icon: FileJson,
      title: "JSON for systems",
      desc: "Consistent schemas for APIs and internal tools.",
    },
    {
      icon: FileText,
      title: "Validated fields",
      desc: "Human reviewed data for accuracy and consistency.",
    },
  ]

  const badges = [
    "Consistent schemas",
    "Validated fields",
    "Ready for ERP and BI",
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">
            What You Receive
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Clean, structured outputs your systems can use
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            We deliver standardized data formats with predictable structure and
            verified fields.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-lg flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
