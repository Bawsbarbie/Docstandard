"use server"

/**
 * Upload Actions
 * Server actions for file upload and order management
 */

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import type {
  Order,
  OrderFile,
  CreateOrderInput,
  CreateOrderFileInput,
} from "@/lib/types/database"

/**
 * Create a new order for the authenticated user
 */
export async function createOrder(
  input?: CreateOrderInput
): Promise<{ data: Order | null; error: string | null }> {
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

    // Insert order
    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        scope: input?.scope || "standard",
        notes: input?.notes || null,
        status: "created",
        price_cents: 79900, // $799.00
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating order:", error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Exception creating order:", error)
    return { data: null, error: "Failed to create order" }
  }
}

/**
 * Get a signed upload URL for Supabase Storage
 * This allows the client to upload directly to storage securely
 */
export async function getSignedUploadUrl(
  orderId: string,
  fileName: string,
  fileType: string
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

    // Verify user owns this order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, user_id")
      .eq("id", orderId)
      .single()

    if (orderError || !order) {
      return { data: null, error: "Order not found" }
    }

    if (order.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    // Generate unique file path
    const fileExt = fileName.split(".").pop()
    const uniqueId = crypto.randomUUID()
    const path = `orders/${orderId}/inputs/${uniqueId}.${fileExt}`

    // Generate signed URL (valid for 1 hour)
    const { data: urlData, error: urlError } = await supabase.storage
      .from("order-files")
      .createSignedUploadUrl(path)

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
 * Create an order file record after successful upload
 */
export async function createOrderFile(
  input: CreateOrderFileInput
): Promise<{ data: OrderFile | null; error: string | null }> {
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

    // Verify user owns this order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, user_id")
      .eq("id", input.order_id)
      .single()

    if (orderError || !order) {
      return { data: null, error: "Order not found" }
    }

    if (order.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    // Generate storage path
    const fileExt = input.original_name.split(".").pop()
    const uniqueId = crypto.randomUUID()
    const storagePath = `orders/${input.order_id}/inputs/${uniqueId}.${fileExt}`

    // Insert order file record
    const { data, error } = await supabase
      .from("order_files")
      .insert({
        order_id: input.order_id,
        role: "input",
        storage_path: storagePath,
        original_name: input.original_name,
        file_size_bytes: input.file_size_bytes,
        mime_type: input.mime_type,
        uploaded_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating order file:", error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Exception creating order file:", error)
    return { data: null, error: "Failed to create file record" }
  }
}

/**
 * Upload file to Supabase Storage using signed URL
 * This is a server action that coordinates the upload
 */
export async function uploadFileToStorage(
  signedUrl: string,
  file: File
): Promise<{ success: boolean; error: string | null }> {
  try {
    const response = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
        "x-upsert": "true",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Upload failed:", response.status, errorText)
      return { success: false, error: `Upload failed: ${response.statusText}` }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Exception uploading file:", error)
    return { success: false, error: "Failed to upload file" }
  }
}

/**
 * Complete order upload (mark as uploaded)
 */
export async function completeOrderUpload(
  orderId: string
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

    // Update order status
    const { error } = await supabase
      .from("orders")
      .update({ status: "uploaded" })
      .eq("id", orderId)
      .eq("user_id", user.id)

    if (error) {
      console.error("Error updating order:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Exception completing upload:", error)
    return { success: false, error: "Failed to complete upload" }
  }
}

/**
 * Get user's orders
 */
export async function getUserOrders(): Promise<{
  data: Order[] | null
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
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching orders:", error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Exception fetching orders:", error)
    return { data: null, error: "Failed to fetch orders" }
  }
}

/**
 * Get files for an order
 */
export async function getOrderFiles(
  orderId: string
): Promise<{ data: OrderFile[] | null; error: string | null }> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { data: null, error: "Not authenticated" }
    }

    // Verify user owns this order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, user_id")
      .eq("id", orderId)
      .single()

    if (orderError || !order) {
      return { data: null, error: "Order not found" }
    }

    if (order.user_id !== user.id) {
      return { data: null, error: "Unauthorized" }
    }

    const { data, error } = await supabase
      .from("order_files")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching order files:", error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Exception fetching order files:", error)
    return { data: null, error: "Failed to fetch files" }
  }
}
