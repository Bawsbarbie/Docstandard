"use client"

import Link from "next/link"
import navigation from "@/data/navigation.json"

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

export default function ProgrammaticFooter() {
  const { coreIntegrations, comparisonGuides, globalPortCities, technicalVerticals } =
    navigation.footer

  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-12 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Core Integrations</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {coreIntegrations.map((system) => (
              <li key={system}>
                <Link href={`/integration/${toSlug(system)}`} className="hover:text-white">
                  {system}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Comparison Guides</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {comparisonGuides.map((guide) => (
              <li key={guide.name}>
                <Link href={guide.href} className="hover:text-white">
                  {guide.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Global Port Cities</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {globalPortCities.map((city) => (
              <li key={city}>
                <Link href={`/near-me/${toSlug(city)}`} className="hover:text-white">
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Technical Verticals</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {technicalVerticals.map((vertical) => (
              <li key={vertical.name}>
                <Link href={vertical.href} className="hover:text-white">
                  {vertical.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
