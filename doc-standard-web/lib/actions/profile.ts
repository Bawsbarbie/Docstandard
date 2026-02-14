"use server"

import { createClient } from "@/lib/supabase/server"

export interface UpdateProfileInput {
  full_name?: string
  company?: string
}

export async function updateProfile(
  input: UpdateProfileInput
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

    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        full_name: input.full_name ?? null,
        company: input.company ?? null,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "id",
      }
    )

    if (error) {
      console.error("Error updating profile:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Exception updating profile:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

