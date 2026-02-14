"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDownloadUrl(batchId: string): Promise<{
  url: string | null
  filename: string | null
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { url: null, filename: null, error: "Not authenticated" }
    }

    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("id, user_id, status")
      .eq("id", batchId)
      .single()

    if (batchError || !batch) {
      return { url: null, filename: null, error: "Batch not found" }
    }

    if (batch.user_id !== user.id) {
      return { url: null, filename: null, error: "Unauthorized" }
    }

    if (batch.status !== "delivered") {
      return { url: null, filename: null, error: "Batch not ready for download" }
    }

    const { data: outputFile, error: outputError } = await supabase
      .from("uploads")
      .select("storage_path, original_name")
      .eq("batch_id", batchId)
      .eq("role", "output")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (outputError || !outputFile) {
      return { url: null, filename: null, error: "No output file found" }
    }

    const { data: signedUrl, error: urlError } = await supabase.storage
      .from("batch-files")
      .createSignedUrl(outputFile.storage_path, 3600)

    if (urlError || !signedUrl) {
      return { url: null, filename: null, error: "Failed to generate download URL" }
    }

    return {
      url: signedUrl.signedUrl,
      filename: outputFile.original_name,
      error: null,
    }
  } catch (error) {
    console.error("Download error:", error)
    return { url: null, filename: null, error: "Download failed" }
  }
}

export async function getBatchDownloads(batchId: string): Promise<{
  files: Array<{ url: string; filename: string }>
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { files: [], error: "Not authenticated" }
    }

    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("id, user_id, status")
      .eq("id", batchId)
      .single()

    if (batchError || !batch) {
      return { files: [], error: "Batch not found" }
    }

    if (batch.user_id !== user.id) {
      return { files: [], error: "Unauthorized" }
    }

    if (batch.status !== "delivered") {
      return { files: [], error: "Batch not ready for download" }
    }

    const { data: outputFiles, error: outputError } = await supabase
      .from("uploads")
      .select("storage_path, original_name")
      .eq("batch_id", batchId)
      .eq("role", "output")
      .order("created_at", { ascending: false })

    if (outputError || !outputFiles || outputFiles.length === 0) {
      return { files: [], error: "No output files found" }
    }

    const filesWithUrls = await Promise.all(
      outputFiles.map(async (file) => {
        const { data: signedUrl, error: urlError } = await supabase.storage
          .from("batch-files")
          .createSignedUrl(file.storage_path, 3600)

        if (urlError || !signedUrl) return null

        return {
          url: signedUrl.signedUrl,
          filename: file.original_name,
        }
      })
    )

    const files = filesWithUrls.filter((file): file is { url: string; filename: string } => !!file)

    if (files.length === 0) {
      return { files: [], error: "Failed to generate download URLs" }
    }

    return { files, error: null }
  } catch (error) {
    console.error("Batch download error:", error)
    return { files: [], error: "Download failed" }
  }
}
