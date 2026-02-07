"use client"

import { useRouter } from "next/navigation"
import { FileUploader } from "@/components/upload/FileUploader"

export default function UploadPage() {
  const router = useRouter()

  const handleUploadComplete = (batchId: string) => {
    // Redirect to checkout after successful upload
    setTimeout(() => {
      router.push(`/checkout/${batchId}`)
    }, 2000)
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Upload Documents</h1>
          <p className="text-lg text-muted-foreground">
            Upload your logistics documents for processing. We accept PDFs, images, Word docs, and Excel files.
          </p>
          <div className="mt-4 p-4 rounded-lg bg-muted/50 border">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">$</span>
              </div>
              <div>
                <p className="font-semibold">Flat-Fee Pricing: $799</p>
                <p className="text-sm text-muted-foreground">
                  Process up to 50 documents per batch with unlimited revisions and expert review.
                </p>
              </div>
            </div>
          </div>
        </div>

        <FileUploader
          onUploadComplete={handleUploadComplete}
          maxFiles={50}
          maxSizeMB={50}
        />

        <div className="mt-8 p-6 rounded-lg border bg-card">
          <h2 className="font-semibold mb-3">What happens next?</h2>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-foreground">1.</span>
              <span>Upload your documents (PDFs, images, or Office files)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-foreground">2.</span>
              <span>Review your batch and proceed to payment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-foreground">3.</span>
              <span>Our expert team processes your documents within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-foreground">4.</span>
              <span>Download your processed, compliance-ready documents</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
