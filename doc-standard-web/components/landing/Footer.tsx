"use client"

import React from "react"
import { FileText, Twitter, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-brand-50 rounded-3xl p-12 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stop Managing Documents. Start Using Data.
          </h2>
          <p className="text-gray-600 mb-8">
            Get standardized, clean data delivered to you today.
          </p>
          <Link
            href="/login"
            className="inline-block bg-brand-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-brand-700 transition-colors"
          >
            Upload Documents · Get Started
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center mr-2">
                <FileText className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-gray-900">DocStandard</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Turns unstructured business documents into clean, structured, usable
              data delivered as a service.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Service</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#how-it-works" className="hover:text-brand-600">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-brand-600">
                  Pricing
                </a>
              </li>
              <li>
                <Link href="/security" className="hover:text-brand-600">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-brand-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-600">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-600">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-500">
          <p>Registered in the EU. Operated by DocStandard.</p>
          <p className="mt-1">
            © {new Date().getFullYear()} DocStandard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
