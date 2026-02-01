"use client"

import React from "react"
import { UploadCloud, Cog, FileJson } from "lucide-react"

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-gray-900 text-white overflow-hidden relative"
    >
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-600 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="mt-4 text-xl text-gray-400">
            This is a done-for-you service, not a software tool.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-700"></div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {/* Step 1 */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full border-4 border-gray-900 flex items-center justify-center relative z-10 mb-8 shadow-lg shadow-blue-900/20">
                <UploadCloud className="w-10 h-10 text-brand-500" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Documents</h3>
              <p className="text-gray-400 max-w-xs mx-auto">
                Upload files securely or connect your document source directly to our
                intake portal.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full border-4 border-gray-900 flex items-center justify-center relative z-10 mb-8 shadow-lg shadow-blue-900/20">
                <Cog className="w-10 h-10 text-brand-500 animate-[spin_10s_linear_infinite]" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">We Process & Standardize</h3>
              <p className="text-gray-400 max-w-xs mx-auto">
                Documents are cleaned, structured, and validated through our expert
                pipeline.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full border-4 border-gray-900 flex items-center justify-center relative z-10 mb-8 shadow-lg shadow-blue-900/20">
                <FileJson className="w-10 h-10 text-brand-500" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Receive Usable Outputs</h3>
              <p className="text-gray-400 max-w-xs mx-auto">
                Delivered as structured files (Excel, CSV, JSON), ready for
                immediate downstream use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
