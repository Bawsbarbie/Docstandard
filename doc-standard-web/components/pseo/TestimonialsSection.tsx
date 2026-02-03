import { Quote } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "DocStandard's team knows documents inside and out. We were drowning in vendor invoices that our automation software kept misreading, and their team stepped in with a level of care we didn't expect. They handled our custom formatting requirements without us needing to configure a single template. The accuracy was noticeably better than what we were getting from our internal team rushing through manual entry. Professional, responsive, and genuinely easy to work with.",
    author: "Michael Chen",
    role: "Operations Director",
    company: "Fulcrum Logistics",
  },
  {
    quote:
      "I spent weeks evaluating OCR tools and data entry services for our contract migration project. Everything else required us to learn new software or manage offshore teams with inconsistent results. DocStandard was the only option that felt like a true partnership—no dashboards to master, no training required. Six months in, they've processed thousands of our legacy agreements without a single follow-up question from my team. I wish we'd found them sooner.",
    author: "Sarah Bennett",
    role: "VP of Finance",
    company: "Northwood Partners",
  },
  {
    quote:
      "I've been burned by 'intelligent document processing' vendors that promised 99% accuracy but delivered gibberish. DocStandard is different because they're honest about what it takes to get clean data—actual humans reviewing edge cases, not just algorithms guessing. They deliver exactly what they commit to, when they commit to it. For the quality we're getting, the batch pricing is remarkably straightforward. No surprise fees, no usage tiers, just reliable results.",
    author: "David Park",
    role: "Compliance Manager",
    company: "Meridian Healthcare Systems",
  },
  {
    quote:
      "We had a board meeting in 48 hours and discovered our quarterly reports were trapped in 400+ scanned PDFs from different regional offices. DocStandard turned them around in a day and a half—clean spreadsheets, standardized currency formats, cross-referenced account numbers. They saved us from showing up with incomplete data. That kind of responsiveness is rare.",
    author: "Elena Vasquez",
    role: "Financial Planning Lead",
    company: "Atlas Ventures",
  },
  {
    quote:
      "I ran the math on hiring a temp to handle our invoice backlog versus using DocStandard. By the time I factored in training, management overhead, and error correction, the batch pricing was actually cheaper—plus I didn't have to deal with HR paperwork. We've now processed six batches over eight months and I haven't had to think about staffing once.",
    author: "Thomas Reed",
    role: "Controller",
    company: "Brink Manufacturing",
  },
  {
    quote:
      "Our ERP system is temperamental and requires data in a very specific JSON structure. DocStandard adapted to our schema on the first batch without me having to explain our technical setup three times. The data flows directly into our pipeline now. It's the first time I've outsourced something and didn't have to build a custom integration layer to make it work.",
    author: "Aisha Patel",
    role: "Director of Operations",
    company: "Concord Supply Chain",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Real feedback from teams who&apos;ve trusted DocStandard with their
              document processing
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-brand-600 opacity-50" />
                </div>

                {/* Quote Text */}
                <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
