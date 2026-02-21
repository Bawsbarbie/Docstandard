"use client"

import { useState } from "react"
import { FileUploader } from "@/components/upload/FileUploader"
import { X } from "lucide-react"
import { SUPPORTED_UPLOAD_TYPES_LABEL } from "@/lib/upload/file-accept"

type VerticalOption = "finance" | "customs" | "integration"

const VERTICAL_OPTIONS: Array<{ label: string; value: VerticalOption; description: string }> = [
  {
    label: "Freight Audit",
    value: "finance",
    description: "Freight bills, AP invoices, charge-level audits",
  },
  {
    label: "Customs Entry",
    value: "customs",
    description: "CBP entry fields, HTS codes, bond documentation",
  },
  {
    label: "TMS-ERP Bridge",
    value: "integration",
    description: "CargoWise, Magaya, and ERP-ready normalization",
  },
]

interface UploadBatchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UploadBatchModal({ isOpen, onClose }: UploadBatchModalProps) {
  const [vertical, setVertical] = useState<VerticalOption>("finance")
  const [fileCount, setFileCount] = useState(0)

  if (!isOpen) return null

  const orderNotes = `vertical:${vertical}`
  const showComplexCTA = fileCount >= 1000

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-8">
      <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-400">
              Batch Data Ingestion
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
              Initialize Standard Batch ($799)
            </h2>
            <p className="text-slate-600 mt-2">
              Securely ingest raw .pdf, .xml, or .csv documents for normalization.
            </p>
          </div>

          <div className="grid gap-3">
            <label className="text-sm font-semibold text-slate-700">
              Normalization Context
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              {VERTICAL_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setVertical(option.value)}
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    vertical === option.value
                      ? "border-brand-600 bg-brand-50"
                      : "border-slate-200 hover:border-brand-300"
                  }`}
                >
                  <p className="font-semibold text-slate-900">{option.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          <FileUploader
            onFilesChange={setFileCount}
            orderNotes={orderNotes}
            maxFiles={2000}
            maxSizeMB={50}
            dropzoneLabel="Securely ingest your batch documents for normalization."
            dropzoneHint="Drag & drop or click to upload"
            dropzoneDetail={`${SUPPORTED_UPLOAD_TYPES_LABEL} • Max 50MB per file`}
          />

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Flat Fee Confirmation</p>
              <p className="text-xs text-slate-500">
                Standard Batch pricing is fixed at $799. Complex batches require a custom scope.
              </p>
            </div>
            {showComplexCTA && (
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white transition"
              >
                Request Complex Batch Analysis
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
