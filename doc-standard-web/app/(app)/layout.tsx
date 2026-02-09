import Link from "next/link"
import { signOut } from "@/lib/actions/auth"
import { OnboardingGate } from "@/components/OnboardingGate"

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
