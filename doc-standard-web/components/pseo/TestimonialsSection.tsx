"use client"

import { Quote, Star } from "lucide-react"
import { motion } from "framer-motion"

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
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute top-0 right-0 p-12 text-slate-200 pointer-events-none opacity-50">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="10" cy="10" r="2" fill="currentColor" />
          <circle cx="30" cy="10" r="2" fill="currentColor" />
          <circle cx="50" cy="10" r="2" fill="currentColor" />
          <circle cx="70" cy="10" r="2" fill="currentColor" />
          <circle cx="90" cy="10" r="2" fill="currentColor" />
          <circle cx="10" cy="30" r="2" fill="currentColor" />
          <circle cx="30" cy="30" r="2" fill="currentColor" />
          <circle cx="50" cy="30" r="2" fill="currentColor" />
          <circle cx="70" cy="30" r="2" fill="currentColor" />
          <circle cx="90" cy="30" r="2" fill="currentColor" />
          <circle cx="10" cy="50" r="2" fill="currentColor" />
          <circle cx="30" cy="50" r="2" fill="currentColor" />
          <circle cx="50" cy="50" r="2" fill="currentColor" />
          <circle cx="70" cy="50" r="2" fill="currentColor" />
          <circle cx="90" cy="50" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Validated by <br /> <span className="text-brand-600 italic">Industry Leaders</span>
            </h2>
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real feedback from operations and finance teams who have delegated their document complexity to us.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl transition-all flex flex-col group relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 text-brand-50 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16" />
                </div>

                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-700 leading-relaxed mb-8 flex-1 italic relative z-10 text-lg">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="border-t border-gray-100 pt-6 mt-auto">
                  <p className="font-black text-gray-900 text-lg">
                    {testimonial.author}
                  </p>
                  <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mt-1">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-0.5">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
