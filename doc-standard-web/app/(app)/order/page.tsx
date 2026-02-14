import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, FileText, Shield, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Start Processing | DocStandard",
  description: "Submit your documents for processing. Flat rate of $799 per batch. No subscriptions, no hidden fees.",
}

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Document Processing Batch
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Flat rate of $799 per batch. No subscriptions, no hidden fees.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Secure upload
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              24-48 hour turnaround
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Human verified
            </span>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Batch Details</h2>
            
            <form className="space-y-6" action="/api/order" method="POST">
              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Document Type
                </label>
                <select 
                  name="documentType" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select document type...</option>
                  <option value="invoices">Invoices & Billing</option>
                  <option value="contracts">Contracts & Agreements</option>
                  <option value="forms">Forms & Applications</option>
                  <option value="reports">Reports & Statements</option>
                  <option value="logistics">Logistics Documents (BOL, POD, etc.)</option>
                  <option value="customs">Customs & Compliance</option>
                  <option value="mixed">Mixed Document Types</option>
                </select>
              </div>

              {/* Estimated Volume */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Estimated Document Count
                </label>
                <select 
                  name="documentCount" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select range...</option>
                  <option value="1-50">1 - 50 documents</option>
                  <option value="51-100">51 - 100 documents</option>
                  <option value="101-250">101 - 250 documents</option>
                  <option value="251-500">251 - 500 documents</option>
                  <option value="500+">500+ documents</option>
                </select>
                <p className="mt-2 text-sm text-slate-500">
                  Flat $799 covers up to 1,000 pages. Additional pages billed at $0.50/page.
                </p>
              </div>

              {/* Output Format */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Desired Output Format
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Excel", "CSV", "JSON"].map((format) => (
                    <label key={format} className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <input 
                        type="radio" 
                        name="outputFormat" 
                        value={format.toLowerCase()}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="font-medium text-slate-700">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text"
                    name="name"
                    required
                    placeholder="John Smith"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name
                </label>
                <input 
                  type="text"
                  name="company"
                  placeholder="Acme Logistics Inc."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Additional Requirements (Optional)
                </label>
                <textarea 
                  name="notes"
                  rows={4}
                  placeholder="Any specific formatting requirements, field mappings, or special instructions..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Submit */}
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                Continue to Secure Upload <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            What's Included
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Document Processing</h3>
              <p className="text-slate-600">
                OCR extraction, field identification, and data structuring for all document types.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Human Verification</h3>
              <p className="text-slate-600">
                Edge cases and complex documents reviewed by trained operators for 99%+ accuracy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Fast Turnaround</h3>
              <p className="text-slate-600">
                Standard 24-48 hour delivery. Expedited processing available for urgent batches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Common Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "What file formats can I upload?",
                a: "We accept PDF, TIFF, JPG, PNG, and scanned images. For digital documents, we can also process CSV, XML, and JSON exports."
              },
              {
                q: "How is the $799 pricing calculated?",
                a: "The flat rate covers one batch of up to 1,000 pages. Additional pages are $0.50 each. Complex document types may require custom quoting."
              },
              {
                q: "What if I'm not satisfied with the output?",
                a: "We offer free revisions for any accuracy issues. If you're not satisfied after revisions, we provide a full refund."
              },
              {
                q: "Is my data secure?",
                a: "Yes. All uploads use TLS encryption. Documents are processed in isolated environments and deleted after 30 days. We are SOC 2 Type II compliant."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
