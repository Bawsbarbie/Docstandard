"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Menu, X, ChevronDown } from "lucide-react"
import navigation from "@/data/navigation.json"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const topLinks = [
    { name: "Services", href: "/services" },
    { name: "Security", href: "/security" },
    { name: "FAQ", href: "/#faq" },
  ]

  const megaColumns = navigation.megaMenu.columns

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-blue-600 shadow-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">DocStandard</span>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setSolutionsOpen((open) => !open)}
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-brand-600"
                aria-expanded={solutionsOpen}
              >
                Solutions
                <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
              </button>

              {solutionsOpen && (
                <div className="absolute left-1/2 top-full mt-3 w-[920px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
                  <div className="grid grid-cols-4 gap-6">
                    {megaColumns.map((column) => (
                      <div key={column.title}>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {column.title}
                        </h3>
                        <ul className="space-y-2">
                          {column.links.map((link) => (
                            <li key={`${column.title}-${link.href}`}>
                              <Link href={link.href} className="text-sm text-slate-700 hover:text-brand-600">
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {topLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-brand-600"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/login"
              className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-800"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-gray-100 bg-white shadow-xl md:hidden">
          <div className="space-y-2 px-4 pb-6 pt-2">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Solutions
            </p>
            {megaColumns.flatMap((column) =>
              column.links.map((link) => (
                <Link
                  key={`${column.title}-${link.href}`}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {link.name}
                </Link>
              )),
            )}

            {topLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full rounded-lg bg-brand-600 px-5 py-3 text-center text-base font-medium text-white hover:bg-brand-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
