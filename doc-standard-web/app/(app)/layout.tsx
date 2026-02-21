import type { Metadata } from "next"
import Link from "next/link"
import { signOut } from "@/lib/actions/auth"
import { OnboardingGate } from "@/components/OnboardingGate"

// Authenticated app pages must not be indexed
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Main content */}
      <main>
        <OnboardingGate />
        {children}
      </main>
    </div>
  )
}
