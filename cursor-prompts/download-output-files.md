# Cursor Prompt: Download Output Files

## Goal
Allow users to download their processed files from Supabase Storage. Currently, the "Download" button in the dashboard table is UI-only and does nothing.

## Current State
- Output files are stored in Supabase Storage at: `batches/{batchId}/outputs/`
- Dashboard shows "Download" button for batches with `status: 'delivered'`
- **Clicking download does nothing**

## Required Changes

### 1. Create Server Action for Signed Download URL
**File:** `lib/actions/download.ts` (create new)

```typescript
"use server"

import { createClient } from "@/lib/supabase/server"

export async function getDownloadUrl(batchId: string): Promise<{ url: string | null; filename: string | null; error: string | null }> {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      return { url: null, filename: null, error: "Not authenticated" }
    }
    
    // Verify user owns this batch and it's delivered
    const { data: batch, error: batchError } = await supabase
      .from("batches")
      .select("id, user_id, status")
      .eq("id", batchId)
      .single()
    
    if (batchError || !batch) {
      return { url: null, filename: null, error: "Batch not found" }
    }
    
    if (batch.user_id !== userData.user.id) {
      return { url: null, filename: null, error: "Unauthorized" }
    }
    
    if (batch.status !== "delivered") {
      return { url: null, filename: null, error: "Batch not ready for download" }
    }
    
    // Get the output file
    const { data: uploads, error: uploadsError } = await supabase
      .from("uploads")
      .select("storage_path, original_name")
      .eq("batch_id", batchId)
      .eq("role", "output")
      .single()
    
    if (uploadsError || !uploads) {
      return { url: null, filename: null, error: "No output file found" }
    }
    
    // Generate signed download URL (valid for 1 hour)
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from("batch-files")
      .createSignedUrl(uploads.storage_path, 3600)
    
    if (urlError || !signedUrl) {
      return { url: null, filename: null, error: "Failed to generate download URL" }
    }
    
    return { 
      url: signedUrl.signedUrl, 
      filename: uploads.original_name,
      error: null 
    }
  } catch (error) {
    console.error("Download error:", error)
    return { url: null, filename: null, error: "Download failed" }
  }
}

// Alternative: Get multiple download URLs if there are multiple output files
export async function getBatchDownloads(batchId: string): Promise<{ files: Array<{url: string, filename: string}>, error: string | null }> {
  try {
    const supabase = await createClient()
    
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) return { files: [], error: "Not authenticated" }
    
    // Verify ownership
    const { data: batch } = await supabase
      .from("batches")
      .select("user_id, status")
      .eq("id", batchId)
      .single()
    
    if (!batch || batch.user_id !== userData.user.id) {
      return { files: [], error: "Unauthorized" }
    }
    
    if (batch.status !== "delivered") {
      return { files: [], error: "Batch not ready" }
    }
    
    // Get all output files
    const { data: uploads } = await supabase
      .from("uploads")
      .select("storage_path, original_name")
      .eq("batch_id", batchId)
      .eq("role", "output")
    
    if (!uploads || uploads.length === 0) {
      return { files: [], error: "No output files found" }
    }
    
    // Generate signed URLs for all files
    const files = await Promise.all(
      uploads.map(async (upload) => {
        const { data: signedUrl } = await supabase.storage
          .from("batch-files")
          .createSignedUrl(upload.storage_path, 3600)
        
        return {
          url: signedUrl?.signedUrl || "",
          filename: upload.original_name
        }
      })
    )
    
    return { files: files.filter(f => f.url), error: null }
  } catch (error) {
    return { files: [], error: "Failed to get downloads" }
  }
}
```

### 2. Wire Up Download Button in Dashboard
**File:** `app/(app)/dashboard/page.tsx`

Find the download button in the batches table and add onClick handler:

```typescript
// Add state for download loading
const [downloadingBatchId, setDownloadingBatchId] = useState<string | null>(null)

// Add download handler
const handleDownload = async (batchId: string) => {
  setDownloadingBatchId(batchId)
  
  const { url, filename, error } = await getDownloadUrl(batchId)
  
  if (url && filename) {
    // Create temporary link and click it
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    alert(error || "Download failed")
  }
  
  setDownloadingBatchId(null)
}

// Update the download button in the table
{batch.status === "delivered" && hasOutput ? (
  <button 
    onClick={() => handleDownload(batch.id)}
    disabled={downloadingBatchId === batch.id}
    className="text-[#2563eb] hover:text-[#1d4ed8] text-sm font-semibold disabled:opacity-50"
  >
    {downloadingBatchId === batch.id ? "Loading..." : "Download"}
  </button>
) : (
  <span className="text-slate-300">—</span>
)}
```

### 3. Alternative: Download All as ZIP
If users typically have multiple output files, consider offering a ZIP download. For MVP, individual file downloads are fine.

### 4. Storage Bucket Permissions
Ensure Supabase Storage has correct permissions. Check in Supabase Dashboard:
- Bucket: `batch-files`
- Policy: Users can read files from their own batch folders

**SQL to verify/add policy:**
```sql
-- Users can download their own files
CREATE POLICY "Users can download own files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'batch-files' AND
  EXISTS (
    SELECT 1 FROM batches
    WHERE storage.path = 'batches/' || batches.id || '/%'
    AND batches.user_id = auth.uid()
  )
);
```

## Testing Steps
1. Manually create a batch with `status: 'delivered'` (via Supabase SQL or manual update)
2. Manually upload a file to `batch-files/batches/{batchId}/outputs/test.csv`
3. Create an upload record with `role: 'output'` pointing to that path
4. Click "Download" button in dashboard
5. File should download

## Files to Create/Modify
- Create: `lib/actions/download.ts`
- Modify: `app/(app)/dashboard/page.tsx` (add download handler)

## Notes
- Signed URLs expire after 1 hour — that's fine for immediate downloads
- For large files, consider streaming or multipart downloads (not needed for MVP)
