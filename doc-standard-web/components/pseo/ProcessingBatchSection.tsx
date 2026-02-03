import {
  FileSearch,
  CheckCircle2,
  LayoutGrid,
  CopyX,
  ShieldCheck,
} from "lucide-react"

interface ProcessingItem {
  icon: React.ReactNode
  title: string
  description: string
}

const processingItems: ProcessingItem[] = [
  {
    icon: <FileSearch className="w-6 h-6 text-brand-600" />,
    title: "Data Extraction & Enrichment",
    description:
      "We capture more than just text. Our team extracts critical business data, context, and relationships from your documents—whether they're scanned forms, complex tables, or mixed-format PDFs. We enrich raw document content into structured fields your systems can actually use, including cross-references to external data sources when needed.",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-brand-600" />,
    title: "Accuracy Validation",
    description:
      "Every field is verified before delivery. Our specialists check for inconsistencies, missing information, and formatting errors that automated tools miss. You receive data you can trust for critical decisions without the manual review burden on your internal team.",
  },
  {
    icon: <LayoutGrid className="w-6 h-6 text-brand-600" />,
    title: "Format Standardization",
    description:
      "Stop wrestling with inconsistent layouts. We transform documents into uniform, predictable structures—standardizing date formats, currency representations, naming conventions, and taxonomy across your entire document set. Your downstream systems receive consistently formatted outputs regardless of source.",
  },
  {
    icon: <CopyX className="w-6 h-6 text-brand-600" />,
    title: "Duplicate Detection & Removal",
    description:
      "We identify and eliminate redundant documents, revised versions, and overlapping records that clutter your database and confuse reporting. Our process ensures only the authoritative, most current version of each document enters your workflow.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
    title: "Quality Assurance Audits",
    description:
      "Before any batch is delivered, we run integrity checks against your specific requirements. This final verification ensures compliance with your internal data standards and confirms every output meets our accuracy thresholds.",
  },
]

export function ProcessingBatchSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Title with blue underline */}
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              What&apos;s Included in Every Processing Batch
            </h2>
            <div className="w-24 h-1 bg-brand-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional document handling without the overhead of software or
              internal teams
            </p>
          </div>

          {/* Processing Items */}
          <div className="mt-12 space-y-0">
            {processingItems.map((item, index) => (
              <div key={index}>
                <div className="flex items-start gap-6 py-8">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Dashed separator (except after last item) */}
                {index < processingItems.length - 1 && (
                  <div className="border-t border-dashed border-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
