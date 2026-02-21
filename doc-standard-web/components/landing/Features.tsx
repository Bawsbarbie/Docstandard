import React from "react"
import {
  FileText,
  FileSpreadsheet,
  ScrollText,
  ClipboardList,
  Paperclip,
  Files,
} from "lucide-react"

export const Features: React.FC = () => {
  const docTypes = [
    {
      icon: FileText,
      title: "Invoices & Billing",
      desc: "Extract line items, dates, and totals accurately.",
    },
    {
      icon: ScrollText,
      title: "Contracts & Agreements",
      desc: "Standardize terms, parties, and key clauses.",
    },
    {
      icon: ClipboardList,
      title: "Forms & Applications",
      desc: "Convert handwritten or digital forms to databases.",
    },
    {
      icon: Files,
      title: "Reports & Statements",
      desc: "Financial summaries and operational logs.",
    },
    {
      icon: Paperclip,
      title: "Scanned Archives",
      desc: "Digitize legacy records into searchable formats.",
    },
    {
      icon: FileSpreadsheet,
      title: "Complex Attachments",
      desc: "Multi-page mixed formats and tables.",
    },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">
            Capabilities
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Types of Documents We Handle
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Not limited to one format. If a document contains business-critical
            information, DocStandard can process it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docTypes.map((doc, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-100 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                <doc.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{doc.title}</h3>
              <p className="text-gray-600 leading-relaxed">{doc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
