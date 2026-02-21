import React from "react"

interface FAQItem {
  question: string
  answer: string
}

const questions: FAQItem[] = [
  {
    question: "What kinds of documents can you process?",
    answer:
      "We handle a wide range of business documents across industries including invoices, contracts, forms, and reports. If the information can be extracted and standardized, we can process it.",
  },
  {
    question: "Is this a software platform?",
    answer:
      "No. DocStandard is a professional service. We handle the processing and deliver results. You don't need to configure or manage software.",
  },
  {
    question: "How are documents delivered?",
    answer:
      "Processed outputs are delivered securely in structured formats such as Excel, CSV, or standardized document files, ready for downstream use.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Files are handled in private processing environments and delivered via secure links. Security is our top priority.",
  },
  {
    question: "Can you handle large or complex batches?",
    answer:
      "Yes. For unusually large or complex batches, scope is confirmed before processing to ensure accuracy and timely delivery.",
  },
  {
    question: "Is this the same as data entry?",
    answer:
      "No. We don't perform manual data entry. DocStandard focuses on cleaning, structuring, validating, and standardizing existing documents so the information becomes system-ready and consistent.",
  },
  {
    question: "How do you handle messy or inconsistent documents?",
    answer:
      "Real-world documents are rarely clean. We process inconsistent layouts, missing fields, duplicates, and multi-page files by standardizing structure and resolving edge cases instead of guessing or auto-filling blindly.",
  },
  {
    question: "Do you validate the data before delivery?",
    answer:
      "Yes. Every batch includes validation and quality checks to identify inconsistencies, duplicates, incomplete records, and formatting issues before delivery.",
  },
  {
    question: "Can you remove duplicate records?",
    answer:
      "Yes. If duplicates exist within a batch, we identify and clean them so your final dataset reflects accurate, up-to-date information only.",
  },
  {
    question: "What is included in the $799 batch price?",
    answer:
      "The flat $799 price covers a standard processing batch, including document intake, cleaning, structuring, validation, and delivery. If a batch is unusually large or complex, scope is confirmed upfront before work begins.",
  },
  {
    question: "How long does processing take?",
    answer:
      "Typical turnaround is 3-5 business days for standard batches. Timelines may vary for larger or more complex document sets, which we'll communicate clearly before starting.",
  },
  {
    question: "Can you handle large or ongoing volumes?",
    answer:
      "Yes. DocStandard is designed to scale. For recurring or high-volume needs, we can define a repeatable structure and processing approach to maintain consistency over time.",
  },
  {
    question: "What happens if something in my documents is unclear?",
    answer:
      "We flag unclear or ambiguous data instead of making assumptions. Accuracy and consistency matter more than speed, and we prioritize clarity over guesswork.",
  },
]

export const FAQ: React.FC = () => {
  const midPoint = Math.ceil(questions.length / 2)
  const leftColumn = questions.slice(0, midPoint)
  const rightColumn = questions.slice(midPoint)

  const renderFAQItem = (item: FAQItem, index: number, columnOffset: number) => {
    const globalIndex = index + columnOffset

    return (
      <details
        key={globalIndex}
        className="group rounded-xl border border-gray-100 bg-white shadow-sm"
        open={globalIndex === 0}
      >
        <summary className="cursor-pointer list-none px-6 py-4 font-semibold text-gray-900 marker:content-none">
          <span className="inline-flex w-full items-center justify-between gap-4">
            <span>{item.question}</span>
            <span className="text-brand-600 transition-transform group-open:rotate-45">+</span>
          </span>
        </summary>
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">{item.answer}</div>
      </details>
    )
  }

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-4">
            {leftColumn.map((item, index) => renderFAQItem(item, index, 0))}
          </div>

          <div className="space-y-4">
            {rightColumn.map((item, index) => renderFAQItem(item, index, midPoint))}
          </div>
        </div>
      </div>
    </section>
  )
}
