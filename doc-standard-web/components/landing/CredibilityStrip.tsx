import React from "react"
import { ShieldCheck, Briefcase, Database } from "lucide-react"

export const CredibilityStrip: React.FC = () => {
  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Used by teams handling critical business documents
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-600" />
              Operations teams
            </span>
            <span className="flex items-center gap-2">
              <Database className="w-4 h-4 text-brand-600" />
              Finance and data teams
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              Compliance focused orgs
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
