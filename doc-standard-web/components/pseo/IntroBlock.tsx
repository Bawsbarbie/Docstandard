"use client"

import type { BlockItem } from "@/lib/pseo/types"
import { FileCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

interface IntroBlockProps {
  content: BlockItem
  cityName: string
  serviceName: string
  imageUrl?: string
  // Technical data from Leah's research
  operationalRequirements?: string[]
  technicalSpecs?: string
  useCase?: string
  integrationPair?: string
}

export function IntroBlock({
  content,
  cityName,
  serviceName,
  imageUrl,
  operationalRequirements,
  technicalSpecs,
  useCase,
  integrationPair,
}: IntroBlockProps) {
  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Headline and Intro Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Integration badge */}
            {integrationPair && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-6 shadow-sm"
              >
                <Zap className="w-4 h-4" />
                {integrationPair}
              </motion.div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-gray-900 leading-[1.1]">
              Professional {serviceName}
            </h1>

            {/* Use case (for integrations) or generic intro */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              {useCase || content.text}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <Link
                href="/login"
                className="group w-full sm:w-auto bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-brand-200 hover:bg-brand-700 hover:shadow-2xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>

            {/* Technical specs badge */}
            {technicalSpecs && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-sm text-brand-600 bg-brand-50 px-4 py-2.5 rounded-lg inline-flex items-center gap-2 border border-brand-100 font-semibold"
              >
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                Technical Protocol: {technicalSpecs}
              </motion.div>
            )}

            {/* Operational Requirements (for services) */}
            {operationalRequirements && operationalRequirements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 p-6 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50"
              >
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-brand-100 rounded-md">
                    <FileCheck className="w-4 h-4 text-brand-600" />
                  </div>
                  Required Documentation
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {operationalRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-200 to-blue-200 rounded-[2.5rem] blur-2xl opacity-30 group-hover:opacity-40 transition-opacity pointer-events-none" />
            <div className="relative w-full h-[450px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`${serviceName}`}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Document Processing Hub</span>
                </div>
              )}
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Zap className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-0.5">Automated Ingestion</p>
                    <p className="text-sm font-semibold text-gray-900 leading-tight">Zero-latency data extraction enabled.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
