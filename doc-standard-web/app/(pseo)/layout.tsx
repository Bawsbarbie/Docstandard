import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"

/**
 * pSEO Layout
 * Wraps all programmatic SEO pages
 */
export default function PseoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
