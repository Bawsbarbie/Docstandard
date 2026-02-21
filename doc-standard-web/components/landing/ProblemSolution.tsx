import React from "react"
import { FileWarning, ArrowRightLeft, Database } from "lucide-react"

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            Businesses generate documents constantly, but documents aren’t usable data.
          </h2>
          <p className="text-xl text-gray-600">
            DocStandard exists to bridge that gap. We process unstructured documents
            into clean outputs your systems can actually use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center relative">
          {/* Step 1: Problem */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <FileWarning className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              You Send Documents
            </h3>
            <p className="text-gray-600">
              Unstructured forms, invoices, and messy PDFs that block automation.
            </p>
          </div>

          {/* Connection Icon (Desktop) */}
          <div className="hidden md:flex justify-center absolute left-1/3 -translate-x-1/2 z-10">
            <div className="w-10 h-10 bg-white rounded-full shadow border border-gray-200 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Middle: The Gap */}
          <div className="bg-brand-900 p-8 rounded-2xl shadow-xl h-full flex flex-col items-center text-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-950 z-0"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                No Internal Processing
              </h3>
              <ul className="text-blue-100 space-y-2 text-sm text-left inline-block">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span> No
                  tools to configure
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span> No
                  dashboards to learn
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span> No
                  manual entry
                </li>
              </ul>
            </div>
          </div>

          {/* Connection Icon (Desktop) */}
          <div className="hidden md:flex justify-center absolute right-1/3 translate-x-1/2 z-10">
            <div className="w-10 h-10 bg-white rounded-full shadow border border-gray-200 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Step 3: Solution */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <Database className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">We Deliver Data</h3>
            <p className="text-gray-600">
              Clean, consistent, structured outputs ready for your workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
