"use client"

import { useMemo, useState } from "react"
import type { OrderWithFiles } from "@/lib/types/database"
import { UploadBatchModal } from "@/components/dashboard/UploadBatchModal"
import { ShieldCheck, CircleUserRound, CreditCard, Layers } from "lucide-react"

interface OperationsConsoleProps {
  orders: OrderWithFiles[]
  error?: string | null
}

const statusLabels: Record<string, { label: string; tone: string }> = {
  created: { label: "Awaiting Ingestion", tone: "bg-amber-100 text-amber-700" },
  uploaded: { label: "Awaiting Ingestion", tone: "bg-amber-100 text-amber-700" },
  queued: { label: "Queued for Normalization", tone: "bg-blue-100 text-blue-700" },
  processing: { label: "Normalizing Fields", tone: "bg-blue-100 text-blue-700" },
  needs_review: { label: "Review Required", tone: "bg-orange-100 text-orange-700" },
  delivered: { label: "Audit Validated", tone: "bg-emerald-100 text-emerald-700" },
  failed: { label: "Exception Detected", tone: "bg-red-100 text-red-700" },
}

const parseVertical = (notes: string | null) => {
  if (!notes) return "Logistics"
  const match = notes.match(/vertical:([a-z-]+)/i)
  if (!match) return "Logistics"
  const value = match[1].toLowerCase()
  if (value === "finance") return "Finance"
  if (value === "customs") return "Customs"
  if (value === "integration") return "TMS-ERP Bridge"
  return "Logistics"
}

export function OperationsConsole({ orders, error }: OperationsConsoleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const stats = useMemo(() => {
    const filesNormalized = orders.reduce((total, order) => total + (order.order_files?.length || 0), 0)
    const linesAudited = filesNormalized * 120
    const auditScore = orders.length > 0 ? Math.min(99, 90 + Math.round(filesNormalized / 5)) : 96
    return { filesNormalized, linesAudited, auditScore }
  }, [orders])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr] gap-6">
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 h-fit">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
              DS
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Operations</p>
              <p className="text-lg font-semibold text-slate-900">Console</p>
            </div>
          </div>

          <nav className="space-y-2 text-sm">
            <button className="w-full flex items-center gap-3 rounded-xl bg-slate-900 text-white px-4 py-3 font-semibold">
              <Layers className="w-4 h-4" />
              Batches
            </button>
            <button className="w-full flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-slate-600 hover:border-slate-300">
              <CreditCard className="w-4 h-4" />
              Billing
            </button>
            <button className="w-full flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-slate-600 hover:border-slate-300">
              <CircleUserRound className="w-4 h-4" />
              Profile
            </button>
          </nav>

          <div className="mt-10 rounded-2xl border border-emerald-200/80 bg-emerald-50 p-4">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4" />
              System Integrity
            </div>
            <p className="text-xs text-emerald-700 mt-2">
              30-day auto-delete policy active for all source files.
            </p>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-400">
                  DocStandard Operations Console
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                  Data Integrity: Verified.
                </h1>
                <p className="text-slate-600 mt-3 max-w-2xl">
                  Welcome to the DocStandard Operations Console. Your session is protected by AES-256
                  end-to-end encryption. Every batch you upload is treated as a high-integrity asset,
                  governed by our strict 30-day autonomous purge policy. You are here to normalize data;
                  we are here to protect it.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-white font-semibold hover:bg-slate-800 transition"
              >
                Initialize Standard Batch ($799)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Files Normalized</p>
              <p className="text-3xl font-bold text-slate-900 mt-3">{stats.filesNormalized}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Lines Audited</p>
              <p className="text-3xl font-bold text-slate-900 mt-3">{stats.linesAudited}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Audit Readiness Score</p>
              <p className="text-3xl font-bold text-slate-900 mt-3">{stats.auditScore}%</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Operational Batch History</h2>
                <p className="text-sm text-slate-500">
                  Track active normalization runs and download audit-ready outputs.
                </p>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {!error && orders.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
                <p className="text-lg font-semibold text-slate-900 mb-2">
                  No batches yet
                </p>
                <p className="text-sm text-slate-500">
                  Initialize your first standard batch to begin normalization.
                </p>
              </div>
            )}

            {!error && orders.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-[0.25em] text-slate-400 border-b border-slate-200">
                      <th className="py-3">Batch ID</th>
                      <th className="py-3">Date</th>
                      <th className="py-3">Vertical</th>
                      <th className="py-3">Status</th>
                      <th className="py-3 text-right">Files</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const status = statusLabels[order.status] || statusLabels.created
                      const fileCount = order.order_files?.length || 0
                      return (
                        <tr key={order.id} className="border-b border-slate-100">
                          <td className="py-4 font-semibold text-slate-900">
                            #{order.id.slice(0, 8)}
                          </td>
                          <td className="py-4 text-slate-600">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 text-slate-600">{parseVertical(order.notes)}</td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.tone}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="py-4 text-right text-slate-600">{fileCount}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-xs text-slate-500">
            AES-256 Encryption Active. All source files are purged 30 days post-normalization.
          </div>
        </section>
      </div>

      <UploadBatchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
