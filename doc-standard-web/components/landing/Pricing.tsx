"use client"

import React from "react"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-900 to-blue-900 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col md:flex-row">
          <div className="p-10 md:p-14 md:w-3/5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Professional Document Processing Service
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                One simple rate for complex needs.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0" />
                  <span>Secure document intake</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0" />
                  <span>Processing & standardization</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0" />
                  <span>Structured output delivery</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 flex-shrink-0" />
                  <span>Private environments</span>
                </li>
              </ul>
            </div>

            <div className="mt-10 flex items-center text-sm text-blue-200 gap-4">
              <span>No subscriptions</span> • <span>No usage tracking</span> •{" "}
              <span>No long-term contracts</span>
            </div>
          </div>

          <div className="bg-white text-gray-900 p-10 md:p-14 md:w-2/5 flex flex-col justify-center items-center text-center">
            <span className="text-gray-500 font-medium mb-2">Starting at</span>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-bold text-brand-900">$799</span>
              <span className="text-gray-500 ml-2">/batch</span>
            </div>
            <p className="text-sm text-gray-500 mb-8">Standard processing batch</p>

            <Link
              href="/login"
              className="w-full bg-brand-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:bg-brand-700 hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center"
            >
              Start Processing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="mt-4 text-xs text-gray-400">
              Secure. Reliable. Done for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
