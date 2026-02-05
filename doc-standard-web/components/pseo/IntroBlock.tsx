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
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Headline and Intro Text */}
        <div className="space-y-8">
          {/* Integration badge */}
          {integrationPair && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              {integrationPair}
            </div>
          )}

          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1]">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{serviceName}</span>
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            {useCase || content.text}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/login"
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="group bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2"
            >
              Learn More
            </Link>
          </div>

          {/* Technical specs badge */}
          {technicalSpecs && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
               Technical Protocol: {technicalSpecs}
            </div>
          )}

           {/* Operational Requirements (for services) */}
           {operationalRequirements && operationalRequirements.length > 0 && (
              <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <div className="p-1 bg-blue-50 rounded-md">
                    <FileCheck className="w-3 h-3 text-blue-600" />
                  </div>
                  Required Documentation
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {operationalRequirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        {/* Right Column: Hero Image */}
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-2 md:p-4">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`${serviceName}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                    <span className="text-slate-400 text-sm">Document Processing Hub</span>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
