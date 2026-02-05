import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"

/**
 * pSEO Layout
 * Wraps all programmatic SEO pages with the v2.0 design system
 */
export default function PseoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="pt-0">
        {children}
      </main>
      <Footer />
    </div>
  )
}
