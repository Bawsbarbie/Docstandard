/**
 * Database types for DocStandard.co
 * Matches the Supabase schema
 */

export type OrderStatus =
  | "created"
  | "uploaded"
  | "queued"
  | "processing"
  | "needs_review"
  | "delivered"
  | "failed"

export type BatchScope = "standard" | "large" | "complex"

export type BatchTier = "standard" | "expedited" | "compliance"

export type FileRole = "input" | "output"

export type UploadStatus = "pending" | "processing" | "completed" | "failed"

export interface Batch {
  id: string
  user_id: string
  status: OrderStatus
  tier: BatchTier
  total_pages: number
  total_files: number
  pages_used: number
  files_used: number
  price_cents: number
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  customer_email?: string | null
  notes: string | null
  created_at: string
  updated_at: string
  paid_at: string | null
  processed_at: string | null
  delivered_at: string | null
}

export interface Upload {
  id: string
  batch_id: string
  role: FileRole
  storage_path: string
  original_name: string
  file_size_bytes: number | null
  mime_type: string | null
  page_count: number | null
  document_types?: string[] | null
  status?: UploadStatus | null
  delivery_eta?: string | null
  created_at: string
  uploaded_at: string | null
}

export interface BatchWithUploads extends Batch {
  uploads?: Upload[] | null
}

export interface CreateBatchInput {
  tier?: BatchTier
  notes?: string
  total_pages?: number
  total_files?: number
}

export interface CreateUploadInput {
  batch_id: string
  original_name: string
  file_size_bytes: number
  mime_type: string
  page_count?: number | null
  storage_path?: string | null
  role?: FileRole
  document_types?: string[]
  status?: UploadStatus
  delivery_eta?: string | null
}

export interface SignedUploadUrl {
  url: string
  path: string
  token: string
}
