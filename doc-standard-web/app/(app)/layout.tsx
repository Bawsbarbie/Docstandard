import Link from "next/link"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-background">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              DocStandard
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Upload
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-primary transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>{children}</main>
    </div>
  )
}
