"use client"

import React from "react"

interface HeaderBannerProps {
  title: string
  clusterId?: string
}

const clusterImageMap: Record<string, string> = {
  finance: "/images/banners/finance.jpg",
  customs: "/images/banners/customs.jpg",
  logistics: "/images/banners/logistics.jpg",
  integration: "/images/banners/integration.jpg",
}

const clusterLabelMap: Record<string, string> = {
  finance: "Finance",
  customs: "Customs",
  logistics: "Logistics",
  integration: "Integration",
}

const normalizeClusterId = (value?: string) =>
  value ? value.toLowerCase().replace(/\s+/g, "-") : "logistics"

export function HeaderBanner({ title, clusterId }: HeaderBannerProps) {
  const normalized = normalizeClusterId(clusterId)
  const key = normalized in clusterImageMap ? normalized : "logistics"
  const imageUrl = clusterImageMap[key]
  const label = clusterLabelMap[key] || "Logistics"

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900">
      <div
        className="min-h-[260px] md:min-h-[320px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={`${label} banner`}
      />
      <div className="absolute inset-0 bg-slate-950/50" />
      <div className="absolute inset-0 flex items-end">
        <div className="p-6 md:p-10 w-full">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">
            {label} authority brief
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-black text-white leading-tight mix-blend-overlay drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
