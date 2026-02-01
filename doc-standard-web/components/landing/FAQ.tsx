"use client"

import React, { useState } from "react"
import { Plus, Minus } from "lucide-react"

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
      "No. DocStandard is a professional service. We handle the processing and deliver results. You don’t need to configure or manage software.",
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
]

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{item.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-brand-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
