import dotenv from "dotenv"
import { createAdminClient } from "@/lib/supabase/admin"

dotenv.config({ path: ".env.local" })
dotenv.config()

const SOURCE_BUCKET = "order-files"
const TARGET_BUCKET = "batch-files"

type ListEntry = {
  name: string
  id?: string
  metadata?: { size?: number }
}

async function listAllObjects(prefix = "batches", cursor?: string) {
  const supabase = createAdminClient()
  const { data, error } = await supabase.storage
    .from(SOURCE_BUCKET)
    .list(prefix, { limit: 100, offset: cursor ? Number(cursor) : 0 })

  if (error) throw error
  return data as ListEntry[]
}

async function copyObject(path: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.storage
    .from(SOURCE_BUCKET)
    .copy(path, path, { destinationBucket: TARGET_BUCKET })
  if (error) throw error
}

async function run() {
  console.log(`Copying from ${SOURCE_BUCKET} → ${TARGET_BUCKET}`)
  let offset = 0
  let batch: ListEntry[] = []

  do {
    batch = await listAllObjects("batches", String(offset))
    for (const entry of batch) {
      if (!entry.name) continue
      const path = `batches/${entry.name}`
      try {
        await copyObject(path)
        console.log(`Copied: ${path}`)
      } catch (err) {
        console.warn(`Failed to copy ${path}:`, err)
      }
    }
    offset += batch.length
  } while (batch.length === 100)

  console.log("Done.")
}

run().catch((error) => {
  console.error("Migration failed:", error)
  process.exit(1)
})
