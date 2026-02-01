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

export type FileRole = "input" | "output"

export interface Order {
  id: string
  user_id: string
  status: OrderStatus
  scope: BatchScope
  price_cents: number
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  notes: string | null
  created_at: string
  updated_at: string
  paid_at: string | null
  processed_at: string | null
  delivered_at: string | null
}

export interface OrderFile {
  id: string
  order_id: string
  role: FileRole
  storage_path: string
  original_name: string
  file_size_bytes: number | null
  mime_type: string | null
  created_at: string
  uploaded_at: string | null
}

export interface CreateOrderInput {
  scope?: BatchScope
  notes?: string
}

export interface CreateOrderFileInput {
  order_id: string
  original_name: string
  file_size_bytes: number
  mime_type: string
}

export interface SignedUploadUrl {
  url: string
  path: string
  token: string
}
