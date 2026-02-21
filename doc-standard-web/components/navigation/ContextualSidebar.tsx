import Link from "next/link"

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

export default function ContextualSidebar({ currentCity, currentSlug }: ContextualSidebarProps) {
  const citySlug = toSlug(currentCity)

  const relatedSolutions = ALL_SOLUTIONS.map((solution) => ({
    name: solution.name,
    href: `/${solution.slug}/${citySlug}`,
  }))
    .filter((solution) => solution.href !== currentSlug)
    .slice(0, 5)

  if (!relatedSolutions.length) {
    return null
  }

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Related Solutions in {currentCity}
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
