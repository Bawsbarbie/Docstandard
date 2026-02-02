interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
