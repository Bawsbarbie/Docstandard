"use client"

import React from "react"
import { Check, X, Minus } from "lucide-react"

export const Comparison: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why DocStandard?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            You don’t adopt a tool. You offload a problem.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px] bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
              <div className="p-6"></div>
              <div className="p-6 text-center font-bold text-gray-600">
                Software Tools
              </div>
              <div className="p-6 text-center font-bold text-gray-600">
                Manual Outsourcing
              </div>
              <div className="p-6 text-center font-bold text-brand-700 bg-brand-50/50">
                DocStandard
              </div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="p-6 font-medium text-gray-700 flex items-center">
                Setup & Config
              </div>
              <div className="p-6 flex justify-center">
                <div className="flex flex-col items-center text-red-500">
                  <X className="w-6 h-6 mb-1" />
                  <span className="text-xs">Heavy</span>
                </div>
              </div>
              <div className="p-6 flex justify-center">
                <div className="flex flex-col items-center text-green-500">
                  <Check className="w-6 h-6 mb-1" />
                  <span className="text-xs">None</span>
                </div>
              </div>
              <div className="p-6 flex justify-center bg-brand-50/30">
                <div className="flex flex-col items-center text-green-600 font-bold">
                  <Check className="w-6 h-6 mb-1" />
                  <span className="text-xs">None</span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="p-6 font-medium text-gray-700 flex items-center">
                Data Consistency
              </div>
              <div className="p-6 flex justify-center">
                <div className="flex flex-col items-center text-green-500">
                  <Check className="w-6 h-6 mb-1" />
                  <span className="text-xs">High</span>
                </div>
              </div>
              <div className="p-6 flex justify-center">
                <div className="flex flex-col items-center text-red-500">
                  <X className="w-6 h-6 mb-1" />
                  <span className="text-xs">Low</span>
                </div>
              </div>
              <div className="p-6 flex justify-center bg-brand-50/30">
                <div className="flex flex-col items-center text-green-600 font-bold">
                  <Check className="w-6 h-6 mb-1" />
                  <span className="text-xs">Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="p-6 font-medium text-gray-700 flex items-center">
                Turnaround Speed
              </div>
              <div className="p-6 flex justify-center">
                <div className="flex flex-col items-center text-green-500">
                  <Check className="w-6 h-6 mb-1" />
                  <span className="text-xs">Instant</span>
                </div>
              </div>
              <div className="p-6 flex justify-center">
                <div className="flex flex-col items-center text-orange-400">
                  <Minus className="w-6 h-6 mb-1" />
                  <span className="text-xs">Slow</span>
                </div>
              </div>
              <div className="p-6 flex justify-center bg-brand-50/30">
                <div className="flex flex-col items-center text-green-600 font-bold">
                  <Check className="w-6 h-6 mb-1" />
                  <span className="text-xs">Optimized</span>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
              <div className="p-6 font-medium text-gray-700 flex items-center">
                Scalability
              </div>
              <div className="p-6 flex justify-center">
                <div className="flex flex-col items-center text-orange-400">
                  <Minus className="w-6 h-6 mb-1" />
                  <span className="text-xs">Costly</span>
                </div>
              </div>
              <div className="p-6 flex justify-center">
                <div className="flex flex-col items-center text-red-500">
                  <X className="w-6 h-6 mb-1" />
                  <span className="text-xs">Hard to scale</span>
                </div>
              </div>
              <div className="p-6 flex justify-center bg-brand-50/30">
                <div className="flex flex-col items-center text-green-600 font-bold">
                  <Check className="w-6 h-6 mb-1" />
                  <span className="text-xs">Unlimited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
