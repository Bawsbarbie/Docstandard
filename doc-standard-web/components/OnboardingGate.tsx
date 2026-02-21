"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { OnboardingModal } from "@/components/OnboardingModal"

const COMPLETE_KEY = "onboarding_complete"
const getCompleteKey = (userId: string) => `${COMPLETE_KEY}:${userId}`

type InitialProfileState = {
  name: string
  email: string
  company: string
  phone: string
}

export function OnboardingGate() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [storageKeySuffix, setStorageKeySuffix] = useState<string>("")
  const [initialProfile, setInitialProfile] = useState<InitialProfileState>({
    name: "",
    email: "",
    company: "",
    phone: "",
  })

  useEffect(() => {
    let isMounted = true
    const run = async () => {
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

      const completeKey = getCompleteKey(user.id)
      if (isMounted) {
        setStorageKeySuffix(user.id)
      }

      if (localStorage.getItem(completeKey) === "true") {
        if (isMounted) {
          setIsLoading(false)
          setIsOpen(false)
        }
        return
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("onboarding_complete, full_name, email, company, phone")
        .eq("id", user.id)
        .maybeSingle()

      if (error) {
        console.error("Failed to load onboarding profile", error)
      }

      if (isMounted) {
        setInitialProfile({
          name: profile?.full_name ?? "",
          email: profile?.email ?? user.email ?? "",
          company: profile?.company ?? "",
          phone: profile?.phone ?? "",
        })
      }

      if (profile?.onboarding_complete) {
        localStorage.setItem(completeKey, "true")
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

        localStorage.setItem(getCompleteKey(user.id), "true")
        setIsOpen(false)
      }}
      initialProfile={initialProfile}
      storageKeySuffix={storageKeySuffix}
    />
  )
}
