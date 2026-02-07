import dotenv from "dotenv"
import { PDFDocument } from "pdf-lib"
import { createAdminClient } from "@/lib/supabase/admin"

dotenv.config({ path: ".env.local" })
dotenv.config()

type OrderFileRow = {
  id: string
  storage_path: string
  mime_type: string | null
  page_count: number | null
}

const BUCKET = "batch-files"

async function getPdfPageCount(arrayBuffer: ArrayBuffer): Promise<number> {
  const doc = await PDFDocument.load(arrayBuffer)
  return doc.getPageCount()
}

async function run() {
  const supabase = createAdminClient()

  const { data: files, error } = await supabase
    .from("uploads")
    .select("id, storage_path, mime_type, page_count")
    .is("page_count", null)

  if (error) {
    console.error("Failed to load files:", error)
    process.exit(1)
  }

  if (!files || files.length === 0) {
    console.log("No files to backfill.")
    return
  }

  console.log(`Backfilling ${files.length} files...`)

  for (const file of files as OrderFileRow[]) {
    const isPdf =
      file.mime_type === "application/pdf" ||
      file.storage_path.toLowerCase().endsWith(".pdf")

    let pageCount = 1

    if (isPdf) {
      const { data: download, error: downloadError } = await supabase.storage
        .from(BUCKET)
        .download(file.storage_path)

      if (downloadError || !download) {
        console.warn(`Skip ${file.storage_path}: ${downloadError?.message || "download failed"}`)
        continue
      }

      const arrayBuffer = await download.arrayBuffer()
      try {
        pageCount = await getPdfPageCount(arrayBuffer)
      } catch (err) {
        console.warn(`Failed to parse PDF ${file.storage_path}:`, err)
        continue
      }
    }

    const { error: updateError } = await supabase
      .from("uploads")
      .update({ page_count: pageCount })
      .eq("id", file.id)

    if (updateError) {
      console.warn(`Failed to update ${file.id}:`, updateError.message)
    }
  }

  console.log("Backfill complete.")
}

run().catch((error) => {
  console.error("Backfill failed:", error)
  process.exit(1)
})
