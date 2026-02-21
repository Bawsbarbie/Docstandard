"use client"

/**
 * FileUploader Component
 * Drag-and-drop file uploader with progress tracking
 */

import { useCallback, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import { PDFDocument } from "pdf-lib"
import { createBatch, getSignedUploadUrl, createUpload, completeBatchUpload } from "@/lib/actions/upload"
import { createCheckoutSession } from "@/lib/actions/stripe"
import { DROPZONE_ACCEPT, SUPPORTED_UPLOAD_TYPES_LABEL } from "@/lib/upload/file-accept"

interface UploadFile {
  file: File
  id: string
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  error?: string
  storagePath?: string
  pageCount?: number
}

interface FileUploaderProps {
  onUploadComplete?: (batchId: string) => void
  onFilesChange?: (fileCount: number) => void
  maxFiles?: number
  maxSizeMB?: number
  orderNotes?: string
  scopeOverride?: "standard" | "large" | "complex"
  dropzoneLabel?: string
  dropzoneHint?: string
  dropzoneDetail?: string
}

export function FileUploader({
  onUploadComplete,
  onFilesChange,
  maxFiles = 50,
  maxSizeMB = 50,
  orderNotes,
  scopeOverride,
  dropzoneLabel,
  dropzoneHint,
  dropzoneDetail,
}: FileUploaderProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [batchId, setBatchId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Check file count limit
      if (uploadFiles.length + acceptedFiles.length > maxFiles) {
        setUploadError(`Maximum ${maxFiles} files allowed`)
        return
      }

      // Check file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024
      const oversizedFiles = acceptedFiles.filter((f) => f.size > maxSizeBytes)

      if (oversizedFiles.length > 0) {
        setUploadError(`Files must be under ${maxSizeMB}MB`)
        return
      }

      // Add files to state
      const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
        file,
        id: crypto.randomUUID(),
        progress: 0,
        status: "pending",
      }))

      setUploadFiles((prev) => {
        const next = [...prev, ...newFiles]
        if (onFilesChange) onFilesChange(next.length)
        return next
      })
      setUploadError(null)

      // Calculate page counts for new files
      for (const uploadFile of newFiles) {
        const pageCount = await getPageCount(uploadFile.file)
        setUploadFiles((prev) =>
          prev.map((f) => (f.id === uploadFile.id ? { ...f, pageCount } : f))
        )
      }
    },
    [uploadFiles.length, maxFiles, maxSizeMB, onFilesChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: DROPZONE_ACCEPT,
    disabled: isUploading,
  })

  const removeFile = (fileId: string) => {
    setUploadFiles((prev) => {
      const next = prev.filter((f) => f.id !== fileId)
      if (onFilesChange) onFilesChange(next.length)
      return next
    })
  }

  const uploadSingleFile = async (
    uploadFile: UploadFile,
    currentBatchId: string
  ): Promise<boolean> => {
    try {
      // Update status to uploading
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: "uploading", progress: 10 } : f
        )
      )

      // Get signed URL
      const { data: urlData, error: urlError } = await getSignedUploadUrl(
        currentBatchId,
        uploadFile.file.name
      )

      if (urlError || !urlData) {
        throw new Error(urlError || "Failed to get upload URL")
      }

      // Update progress
      setUploadFiles((prev) =>
        prev.map((f) => (f.id === uploadFile.id ? { ...f, progress: 30 } : f))
      )

      const pageCount = await getPageCount(uploadFile.file)

      const uploadResponse = await fetch(urlData.url, {
        method: "PUT",
        body: uploadFile.file,
        headers: {
          "Content-Type": uploadFile.file.type || "application/octet-stream",
          "x-upsert": "true",
        },
      })

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`)
      }

      const { error: recordError } = await createUpload({
        batch_id: currentBatchId,
        original_name: uploadFile.file.name,
        file_size_bytes: uploadFile.file.size,
        mime_type: uploadFile.file.type || "application/octet-stream",
        page_count: pageCount,
        storage_path: urlData.path,
      })

      if (recordError) {
        throw new Error(recordError)
      }

      // Update progress to complete
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: "success",
                progress: 100,
                storagePath: urlData.path,
                pageCount,
              }
            : f
        )
      )

      return true
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? {
                ...f,
                status: "error",
                error: error instanceof Error ? error.message : "Upload failed",
              }
            : f
        )
      )
      return false
    }
  }

  const getPageCount = async (file: File): Promise<number> => {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    if (!isPdf) return 1
    try {
      const buffer = await file.arrayBuffer()
      const doc = await PDFDocument.load(buffer)
      return doc.getPageCount()
    } catch (error) {
      console.error("Failed to read PDF pages:", error)
      return 1
    }
  }

  const startUpload = async () => {
    if (uploadFiles.length === 0) {
      setUploadError("Please add files to upload")
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      // Create batch
      const derivedTier =
        uploadFiles.length > 1000 ? "compliance" : uploadFiles.length > 50 ? "expedited" : "standard"
      const tierOverride =
        scopeOverride === "complex"
          ? "compliance"
          : scopeOverride === "large"
            ? "expedited"
            : "standard"
      const { data: batch, error: batchError } = await createBatch({
        tier: scopeOverride ? tierOverride : derivedTier,
        notes: orderNotes || undefined,
      })

      if (batchError || !batch) {
        throw new Error(batchError || "Failed to create batch")
      }

      setBatchId(batch.id)

      // Upload all files
      let successCount = 0
      for (const uploadFile of uploadFiles) {
        const success = await uploadSingleFile(uploadFile, batch.id)
        if (success) successCount++
      }

      // Complete the upload
      if (successCount > 0) {
        const completeResult = await completeBatchUpload(batch.id)
        if (!completeResult.success) {
          throw new Error(completeResult.error || "Failed to finalize upload")
        }

        // Create Stripe checkout session and redirect user to payment.
        const { url, error } = await createCheckoutSession(batch.id)
        if (url) {
          window.location.href = url
          return
        }

        if (onUploadComplete) {
          onUploadComplete(batch.id)
          return
        }

        throw new Error(error || "Failed to create checkout session")
      } else {
        throw new Error("No files uploaded successfully")
      }
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const allFilesUploaded = uploadFiles.length > 0 && uploadFiles.every((f) => f.status === "success")
  const totalPages = useMemo(() => {
    return uploadFiles.reduce(
      (sum, f) => sum + (typeof f.pageCount === "number" ? f.pageCount : 0),
      0
    )
  }, [uploadFiles])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
          ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg
              className="w-16 h-16 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-lg font-medium">
              {isDragActive ? "Drop files here..." : dropzoneLabel || "Drag & drop files here"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {dropzoneHint || "or click to select files"}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {dropzoneDetail ||
                `${SUPPORTED_UPLOAD_TYPES_LABEL} • Max ${maxSizeMB}MB per file • Up to ${maxFiles} files`}
            </p>
            {uploadFiles.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Detected: {uploadFiles.length} file{uploadFiles.length === 1 ? "" : "s"} •{" "}
                {totalPages} page{totalPages === 1 ? "" : "s"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Error display */}
      {uploadError && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{uploadError}</p>
        </div>
      )}

      {/* File list */}
      {uploadFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Files ({uploadFiles.length}/{maxFiles})
            </h3>
            <div className="text-sm text-muted-foreground">Total pages: {totalPages}</div>
            {!isUploading && !allFilesUploaded && (
              <button
                onClick={() => {
                  setUploadFiles([])
                  if (onFilesChange) onFilesChange(0)
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-2">
            {uploadFiles.map((uploadFile) => (
              <div
                key={uploadFile.id}
                className="p-4 rounded-lg border bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">
                        {uploadFile.file.name}
                      </p>
                      {uploadFile.status === "success" && (
                        <span className="text-green-600">✓</span>
                      )}
                      {uploadFile.status === "error" && (
                        <span className="text-destructive">✗</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(uploadFile.file.size)} •{" "}
                      {typeof uploadFile.pageCount === "number"
                        ? `${uploadFile.pageCount} page${uploadFile.pageCount === 1 ? "" : "s"}`
                        : "Calculating pages…"}
                    </p>

                    {/* Progress bar */}
                    {uploadFile.status === "uploading" && (
                      <div className="mt-2 w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${uploadFile.progress}%` }}
                        />
                      </div>
                    )}

                    {/* Error message */}
                    {uploadFile.status === "error" && uploadFile.error && (
                      <p className="text-sm text-destructive mt-1">
                        {uploadFile.error}
                      </p>
                    )}
                  </div>

                  {/* Remove button */}
                  {!isUploading && uploadFile.status === "pending" && (
                    <button
                      onClick={() => removeFile(uploadFile.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Upload button */}
          {!allFilesUploaded && (
            <button
              onClick={startUpload}
              disabled={isUploading || uploadFiles.length === 0}
              className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {isUploading ? "Uploading..." : `Upload ${uploadFiles.length} file${uploadFiles.length !== 1 ? "s" : ""}`}
            </button>
          )}

          {/* Success message */}
          {allFilesUploaded && batchId && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm font-medium text-green-900">
                ✓ All files uploaded successfully!
              </p>
              <p className="text-xs text-green-700 mt-1">
                Batch ID: {batchId}
              </p>
              {onUploadComplete ? (
                <p className="text-xs text-green-700 mt-2">
                  Redirecting to checkout...
                </p>
              ) : (
                <p className="text-xs text-green-700 mt-2">
                  Your batch is queued for review.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
