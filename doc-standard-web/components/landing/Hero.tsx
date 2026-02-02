"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Upload, Database, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-brand-600 text-xs font-semibold uppercase tracking-wide mb-6">
              <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 animate-pulse"></span>
              Professional Document Processing
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              From Documents to{" "}
              <span className="gradient-text">Structured Data</span>. Done for You
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              DocStandard processes complex business documents and delivers clean,
              standardized digital outputs without software, subscriptions, or
              manual work on your side.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/upload"
                className="flex items-center justify-center px-8 py-4 bg-brand-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:bg-brand-700 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all group"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Documents
                <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center justify-center px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-5 text-sm text-gray-500 flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
              <span>Scope confirmed before processing.</span>
              <span className="hidden sm:inline">•</span>
              <span>Edge cases flagged, not guessed.</span>
              <span className="hidden sm:inline">•</span>
              <span>No silent automation failures.</span>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1.5" /> One Service
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1.5" /> One Price
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1.5" /> Real Results
              </span>
            </div>
          </motion.div>

          {/* Right Visual Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Background Glass Plate */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 rounded-[2.5rem] shadow-2xl border border-white/50 backdrop-blur-xl z-0"></div>

              {/* Floating Elements Container */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                {/* Left Card: Messy Doc */}
                <motion.div
                  animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute left-4 top-1/4 w-40 h-52 bg-white rounded-xl shadow-lg border border-gray-100 p-3 transform -rotate-6"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <FileText className="text-gray-400 w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-100 rounded w-full"></div>
                    <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-100 rounded w-full mt-4"></div>
                    <div className="h-2 bg-gray-100 rounded w-full"></div>
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400"></div>
                </motion.div>

                {/* Arrow / Connection */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-gray-200 via-brand-400 to-gray-200 opacity-30"></div>

                {/* Center Processing Node */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-600 rounded-2xl shadow-xl shadow-brand-500/40 flex items-center justify-center z-20 border-4 border-white"
                >
                  <Database className="text-white w-8 h-8" />
                </motion.div>

                {/* Right Card: Structured Data */}
                <motion.div
                  animate={{ x: [0, -5, 0], y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className="absolute right-4 bottom-1/4 w-48 h-56 bg-white rounded-xl shadow-xl border border-blue-50 p-0 overflow-hidden transform rotate-3"
                >
                  <div className="bg-slate-50 border-b border-gray-100 p-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      data_export.csv
                    </div>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <React.Fragment key={i}>
                        <div className="h-6 bg-blue-50 rounded flex items-center px-2 text-[8px] text-blue-600 font-mono">
                          ID_{100 + i}
                        </div>
                        <div className="h-6 bg-slate-50 rounded flex items-center px-2 text-[8px] text-slate-500 font-mono">
                          Value
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
