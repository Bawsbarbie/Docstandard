"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { OnboardingModal } from "@/components/OnboardingModal"

const COMPLETE_KEY = "onboarding_complete"

export function OnboardingGate() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let isMounted = true
    const run = async () => {
      if (localStorage.getItem(COMPLETE_KEY) === "true") {
        if (isMounted) {
          setIsLoading(false)
          setIsOpen(false)
        }
        return
      }

      const supabase = createClient()
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      if (!user) {
        if (isMounted) {
          setIsLoading(false)
          setIsOpen(false)
        }
        return
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", user.id)
        .maybeSingle()

      if (error) {
        console.error("Failed to load onboarding profile", error)
      }

      if (profile?.onboarding_complete) {
        localStorage.setItem(COMPLETE_KEY, "true")
        if (isMounted) {
          setIsLoading(false)
          setIsOpen(false)
        }
        return
      }

      if (isMounted) {
        setIsLoading(false)
        setIsOpen(true)
      }
    }

    run()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) return null

  return (
    <OnboardingModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSkip={() => {
        setIsOpen(false)
        router.push("/login")
      }}
      onComplete={async (data) => {
        const supabase = createClient()
        const { data: userData } = await supabase.auth.getUser()
        const user = userData.user

        if (!user) return

        await supabase
          .from("profiles")
          .upsert(
            {
              id: user.id,
              full_name: data.name,
              email: data.email,
              company: data.company,
              phone: data.phone ?? null,
              tier: data.tier,
              onboarding_complete: true,
            },
            { onConflict: "id" }
          )

        localStorage.setItem(COMPLETE_KEY, "true")
        setIsOpen(false)
      }}
    />
  )
}
