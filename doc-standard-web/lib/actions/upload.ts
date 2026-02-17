"use server"

/**
 * Upload Actions
 * Server actions for file upload and batch management
 */

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import type {
  Batch,
  Upload,
  BatchWithUploads,
  CreateBatchInput,
  CreateUploadInput,
} from "@/lib/types/database"

/**
 * Create a new batch for the authenticated user
 */
export async function createBatch(
  input?: CreateBatchInput
): Promise<{ data: Batch | null; error: string | null }> {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    // Insert batch
    const { data, error } = await supabase
      .from("batches")
      .insert({
        user_id: user.id,
        tier: input?.tier || "standard",
        notes: input?.notes || null,
        status: "created",
        price_cents: 79900, // $799.00
        total_pages: input?.total_pages ?? 2000,
        total_files: input?.total_files ?? 1000,
        customer_email: user.email ?? null,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating batch:", error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Exception creating batch:", error)
    return { data: null, error: "Failed to create batch" }
  }
}

/**
 * Get a signed upload URL for Supabase Storage
 * This allows the client to upload directly to storage securely
 */
export async function getSignedUploadUrl(
  batchId: string,
  fileName: string
): Promise<{ data: { url: string; path: string } | null; error: string | null }> {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    // Verify user owns this batch
    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("id, user_id")
      .eq("id", batchId)
      .single()

    if (batchError || !batch) {
      return { data: null, error: "Batch not found" }
    }

    if (batch.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    // Generate unique file path
    const fileExt = fileName.split(".").pop()
    const uniqueId = crypto.randomUUID()
    const path = `batches/${batchId}/inputs/${uniqueId}.${fileExt}`

    // Generate signed URL (valid for 1 hour). Prefer admin client so storage RLS
    // does not block authenticated users who already passed ownership checks.
    let urlData: { signedUrl: string } | null = null
    let urlError: { message: string } | null = null

    try {
      const admin = createAdminClient()
      const adminResult = await admin.storage.from("batch-files").createSignedUploadUrl(path)
      urlData = adminResult.data
      urlError = adminResult.error
    } catch {
      const userResult = await supabase.storage.from("batch-files").createSignedUploadUrl(path)
      urlData = userResult.data
      urlError = userResult.error
    }

    if (urlError) {
      console.error("Error creating signed URL:", urlError)
      return { data: null, error: urlError.message }
    }

    return {
      data: {
        url: urlData.signedUrl,
        path: path,
      },
      error: null,
    }
  } catch (error) {
    console.error("Exception creating signed URL:", error)
    return { data: null, error: "Failed to generate upload URL" }
  }
}

/**
 * Create an upload record after successful upload
 */
export async function createUpload(
  input: CreateUploadInput
): Promise<{ data: Upload | null; error: string | null }> {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    // Verify user owns this batch
    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("id, user_id")
      .eq("id", input.batch_id)
      .single()

    if (batchError || !batch) {
      return { data: null, error: "Batch not found" }
    }

    if (batch.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    // Use provided storage path when available to match actual upload
    let storagePath = input.storage_path ?? null
    if (!storagePath) {
      const fileExt = input.original_name.split(".").pop()
      const uniqueId = crypto.randomUUID()
      storagePath = `batches/${input.batch_id}/inputs/${uniqueId}.${fileExt}`
    }

    // Insert upload record
    const { data, error } = await supabase
      .from("uploads")
      .insert({
        batch_id: input.batch_id,
        role: input.role ?? "input",
        storage_path: storagePath,
        original_name: input.original_name,
        file_size_bytes: input.file_size_bytes,
        mime_type: input.mime_type,
        page_count: input.page_count ?? null,
        document_types: input.document_types ?? null,
        status: input.status ?? "completed",
        delivery_eta: input.delivery_eta ?? null,
        uploaded_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating upload:", error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Exception creating upload:", error)
    return { data: null, error: "Failed to create upload record" }
  }
}

/**
 * Complete batch upload (mark as uploaded)
 */
export async function completeBatchUpload(
  batchId: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { success: false, error: "Not authenticated" }
    }

    // Update batch status
    const { error } = await supabase
      .from("batches")
      .update({ status: "uploaded" })
      .eq("id", batchId)
      .eq("user_id", user.id)

    if (error) {
      console.error("Error updating batch:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Exception completing upload:", error)
    return { success: false, error: "Failed to complete batch upload" }
  }
}

const isCreditSettledStatus = (status: string) =>
  status === "queued" ||
  status === "processing" ||
  status === "needs_review" ||
  status === "delivered"

/**
 * Finalize a newly uploaded batch using existing account credits (no Stripe checkout).
 */
export async function queueBatchUsingCredits(
  batchId: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { success: false, error: "Not authenticated" }
    }

    const { data: targetBatch, error: targetBatchError } = await supabase
      .from("batches")
      .select("id, user_id, status, paid_at, uploads(role, page_count)")
      .eq("id", batchId)
      .single()

    if (targetBatchError || !targetBatch) {
      return { success: false, error: "Batch not found" }
    }

    if (targetBatch.user_id !== user.id) {
      return { success: false, error: "Unauthorized" }
    }

    if (targetBatch.paid_at) {
      return { success: true, error: null }
    }

    if (targetBatch.status !== "uploaded") {
      return { success: false, error: "Batch must be uploaded before using credits." }
    }

    const targetInputs = (targetBatch.uploads || []).filter((file) => file.role === "input")
    const targetFilesUsed = targetInputs.length
    const targetPagesUsed = targetInputs.reduce(
      (sum, file) => sum + (typeof file.page_count === "number" ? file.page_count : 1),
      0
    )

    if (targetFilesUsed === 0) {
      return { success: false, error: "No uploaded files found for this batch." }
    }

    const { data: allBatches, error: allBatchesError } = await supabase
      .from("batches")
      .select("id, status, paid_at, total_pages, total_files, uploads(role, page_count)")
      .eq("user_id", user.id)

    if (allBatchesError || !allBatches) {
      return { success: false, error: "Failed to verify available credits." }
    }

    let totalCreditsPages = 0
    let totalCreditsFiles = 0
    let usedPages = 0
    let usedFiles = 0

    for (const batch of allBatches) {
      if (batch.id === batchId) continue
      const isSettled = Boolean(batch.paid_at) || isCreditSettledStatus(batch.status)
      if (!isSettled) continue

      totalCreditsPages += Math.max(batch.total_pages ?? 0, 0)
      totalCreditsFiles += Math.max(batch.total_files ?? 0, 0)

      const inputs = (batch.uploads || []).filter((file) => file.role === "input")
      usedFiles += inputs.length
      usedPages += inputs.reduce(
        (sum, file) => sum + (typeof file.page_count === "number" ? file.page_count : 1),
        0
      )
    }

    const remainingPages = Math.max(totalCreditsPages - usedPages, 0)
    const remainingFiles = Math.max(totalCreditsFiles - usedFiles, 0)

    if (targetPagesUsed > remainingPages || targetFilesUsed > remainingFiles) {
      return {
        success: false,
        error: `Not enough credits remaining (${remainingPages} pages / ${remainingFiles} files left).`,
      }
    }

    const { error: updateError } = await supabase
      .from("batches")
      .update({
        status: "queued",
        paid_at: new Date().toISOString(),
        total_pages: 0,
        total_files: 0,
        pages_used: targetPagesUsed,
        files_used: targetFilesUsed,
        updated_at: new Date().toISOString(),
      })
      .eq("id", batchId)
      .eq("user_id", user.id)

    if (updateError) {
      return { success: false, error: updateError.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Exception queuing batch with credits:", error)
    return { success: false, error: "Failed to queue batch with existing credits" }
  }
}

/**
 * Get user's batches
 */
export async function getUserBatches(): Promise<{
  data: Batch[] | null
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data, error } = await supabase
      .from("batches")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching batches:", error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Exception fetching batches:", error)
    return { data: null, error: "Failed to fetch batches" }
  }
}

/**
 * Get user's batches with upload metadata
 */
export async function getUserBatchesWithUploads(): Promise<{
  data: BatchWithUploads[] | null
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    const { data, error } = await supabase
      .from("batches")
      .select(
        "*, uploads(id, batch_id, role, storage_path, original_name, file_size_bytes, mime_type, page_count, created_at, uploaded_at)"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching batches with uploads:", error)
      return { data: null, error: error.message }
    }

    return { data: data as BatchWithUploads[], error: null }
  } catch (error) {
    console.error("Exception fetching batches with uploads:", error)
    return { data: null, error: "Failed to fetch batches" }
  }
}

/**
 * Get uploads for a batch
 */
export async function getBatchUploads(
  batchId: string
): Promise<{ data: Upload[] | null; error: string | null }> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    // Verify user owns this batch
    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("id, user_id")
      .eq("id", batchId)
      .single()

    if (batchError || !batch) {
      return { data: null, error: "Batch not found" }
    }

    if (batch.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase
      .from("uploads")
      .select("*")
      .eq("batch_id", batchId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching uploads:", error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Exception fetching uploads:", error)
    return { data: null, error: "Failed to fetch uploads" }
  }
}
