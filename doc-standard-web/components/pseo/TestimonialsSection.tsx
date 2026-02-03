"use client"

import { useState } from "react"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

type TestimonialKind = "finance" | "shipping" | "customs" | "inventory" | "general"

const testimonialSets: Record<TestimonialKind, Testimonial[]> = {
  finance: [
    {
      quote:
        "DocStandard delivered reconciled freight bills and GL-coded exports that dropped straight into NetSuite. My team didn’t touch a pivot table, and accruals finally match operations by close.",
      author: "Thomas Reed",
      role: "Controller",
      company: "Brink Manufacturing",
    },
    {
      quote:
        "We stopped burning hours on invoice disputes. Their team flags penny-gap issues and tax mismatches before they hit AP, so I see fewer reversals and cleaner monthly closes.",
      author: "Sarah Bennett",
      role: "VP of Finance",
      company: "Northwood Partners",
    },
    {
      quote:
        "Board pack panic solved: 400 PDFs in, standardized cash flow schedules out in under 36 hours. That reliability is why finance owns the DocStandard relationship, not IT.",
      author: "Elena Vasquez",
      role: "Financial Planning Lead",
      company: "Atlas Ventures",
    },
  ],
  shipping: [
    {
      quote:
        "They normalize BOLs from every carrier into one schema, so our TMS ingest is finally consistent. It cut our arrival notice prep time by half.",
      author: "Michael Chen",
      role: "Operations Director",
      company: "Fulcrum Logistics",
    },
    {
      quote:
        "Air waybills used to stall handoffs to warehouse teams. Now the data lands clean in our WMS with UN/LOCODEs validated. Zero rework for my ops coordinators.",
      author: "Aisha Patel",
      role: "Director of Operations",
      company: "Concord Supply Chain",
    },
    {
      quote:
        "We process mixed packing lists from overseas suppliers. DocStandard catches unit-of-measure drift and repacks SKUs into our carton logic automatically.",
      author: "David Park",
      role: "Operations Manager",
      company: "Harbor Freight Network",
    },
  ],
  customs: [
    {
      quote:
        "Their team aligns CF 7501 line items to tariff codes with audit notes. Our brokers stopped kicking back entries for missing COO and valuation fields.",
      author: "Linda Gomez",
      role: "Customs Compliance Lead",
      company: "Interport Global",
    },
  ],
  inventory: [
    {
      quote:
        "They standardize vendor packing lists into our SKU catalog and flag lot/expiry gaps before receiving. Dock-to-stock time dropped materially.",
      author: "Priya Narang",
      role: "Inventory Control Manager",
      company: "Everline Distribution",
    },
  ],
  general: [
    {
      quote:
        "DocStandard's team knows documents inside and out. We were drowning in vendor invoices that our automation software kept misreading, and their team stepped in with a level of care we didn't expect.",
      author: "Michael Chen",
      role: "Operations Director",
      company: "Fulcrum Logistics",
    },
    {
      quote:
        "I ran the math on hiring a temp versus using DocStandard. After training and error correction, the batch pricing was cheaper—and I stopped managing backlogs.",
      author: "Thomas Reed",
      role: "Controller",
      company: "Brink Manufacturing",
    },
    {
      quote:
        "Our ERP needs JSON in a specific shape. They matched our schema on the first batch without extra back-and-forth, so data now flows directly into our pipeline.",
      author: "Aisha Patel",
      role: "Director of Operations",
      company: "Concord Supply Chain",
    },
  ],
}

const ITEMS_PER_PAGE = 3

interface TestimonialsSectionProps {
  kind?: string
}

export function TestimonialsSection({ kind }: TestimonialsSectionProps) {
  const normalizedKind = (kind || "general").toLowerCase() as TestimonialKind
  const reviews =
    testimonialSets[normalizedKind as TestimonialKind] || testimonialSets.general

  const [currentIndex, setCurrentIndex] = useState(0)
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE)

  const currentTestimonials = reviews.slice(
    currentIndex * ITEMS_PER_PAGE,
    currentIndex * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

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

          {/* Carousel Container */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-brand-50 hover:border-brand-300 transition-all group"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-brand-600 transition-colors" />
            </button>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-0">
              <AnimatePresence mode="wait">
                {currentTestimonials.map((testimonial, index) => {
                  const globalIndex = currentIndex * ITEMS_PER_PAGE + index
                  return (
                    <motion.div
                      key={globalIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
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
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-brand-50 hover:border-brand-300 transition-all group"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-brand-600 transition-colors" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-brand-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
