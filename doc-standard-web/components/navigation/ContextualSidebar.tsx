import Link from "next/link"
import { cities } from "@/lib/pseo/city-data"

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

const ALL_SOLUTIONS = [
  { name: "Finance Solutions", slug: "finance" },
  { name: "Customs Declarations", slug: "customs" },
  { name: "Logistics Management", slug: "logistics" },
  { name: "Shipping Operations", slug: "shipping" },
  { name: "Invoice Automation", slug: "invoice" },
  { name: "Trade Compliance", slug: "compliance" },
]

interface ContextualSidebarProps {
  currentCity: string
  currentSlug: string
}

const CITY_ALIASES: Record<string, string> = {
  sf: "san-francisco",
  la: "los-angeles",
  nyc: "new-york",
}

function resolveCitySlug(currentCity: string): string | null {
  const normalized = toSlug(currentCity)
  const aliasMatch = CITY_ALIASES[normalized]
  if (aliasMatch) return aliasMatch

  const slugMatch = cities.find((city) => city.slug === normalized)
  if (slugMatch) return slugMatch.slug

  const nameMatch = cities.find((city) => toSlug(city.name) === normalized)
  if (nameMatch) return nameMatch.slug

  return null
}

export default function ContextualSidebar({ currentCity, currentSlug }: ContextualSidebarProps) {
  const citySlug = resolveCitySlug(currentCity)

  const relatedSolutions = ALL_SOLUTIONS.map((solution) => ({
    name: solution.name,
    href: citySlug ? `/${solution.slug}/${citySlug}` : `/${solution.slug}`,
  }))
    .filter((solution) => solution.href !== currentSlug)
    .slice(0, 5)

  if (!relatedSolutions.length) {
    return null
  }

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        {citySlug ? `Related Solutions in ${currentCity}` : "Related Solutions"}
      </h3>
      <ul className="space-y-2 text-sm">
        {relatedSolutions.map((solution) => (
          <li key={solution.href}>
            <Link href={solution.href} className="text-slate-600 hover:text-slate-900 hover:underline">
              {solution.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
