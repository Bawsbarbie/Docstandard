import dotenv from "dotenv"
import { createAdminClient } from "@/lib/supabase/admin"

dotenv.config({ path: ".env.local" })
dotenv.config()

const BUCKET = "order-files"

async function run() {
  const supabase = createAdminClient()

  console.log(`Deleting bucket: ${BUCKET}`)
  const { error } = await supabase.storage.deleteBucket(BUCKET)

  if (error) {
    throw error
  }

  console.log("Bucket deleted.")
}

run().catch((error) => {
  console.error("Delete bucket failed:", error)
  process.exit(1)
})
