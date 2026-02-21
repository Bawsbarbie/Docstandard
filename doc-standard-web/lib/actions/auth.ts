"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

interface SignUpData {
  email: string
  password: string
}

interface SignInData {
  email: string
  password: string
}

function resolveSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.COOLIFY_URL,
    process.env.COOLIFY_FQDN ? `https://${process.env.COOLIFY_FQDN}` : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ]

  for (const value of candidates) {
    if (!value) continue
    const trimmed = value.trim()
    if (!trimmed) continue
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed.replace(/\/+$/, "")
    }
  }

  return undefined
}

function isConfirmationEmailError(message: string) {
  return /error sending confirmation email|error sending email|smtp|mailer|email provider/i.test(message)
}

function formatSignUpError(message: string) {
  if (/already registered/i.test(message)) {
    return "This email is already registered. Try signing in instead."
  }
  if (isConfirmationEmailError(message)) {
    return "Could not send confirmation email. Please try again in a minute or contact support."
  }
  return message
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(data: SignUpData) {
  const supabase = await createClient()
  const siteUrl = resolveSiteUrl()

  const { data: signUpData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      ...(siteUrl ? { emailRedirectTo: `${siteUrl}/auth/callback` } : {}),
    },
  })

  if (error) {
    console.error("Supabase signUp failed:", {
      message: error.message,
      status: (error as { status?: number }).status,
      code: (error as { code?: string }).code,
      name: (error as { name?: string }).name,
      siteUrl,
      email: data.email,
    })

    return { error: formatSignUpError(error.message) }
  }

  if (!signUpData.session) {
    revalidatePath("/", "layout")
    redirect("/login?mode=login&check_email=1")
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

/**
 * Sign in an existing user with email and password
 */
export async function signIn(data: SignInData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Sign out failed:", error.message)
    return
  }

  revalidatePath("/", "layout")
  redirect("/login")
}

/**
 * Get the current user
 */
export async function getUser() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
