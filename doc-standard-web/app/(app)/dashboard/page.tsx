"use client"

import { useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  processing: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
}

const TIERS = [
  { value: "standard", label: "Standard", price: "$799", eta: "72h", description: "Single review" },
  { value: "expedited", label: "Expedited", price: "$1,099", eta: "24h", description: "Priority queue" },
  { value: "compliance", label: "Compliance", price: "$1,299", eta: "48-72h", description: "Verified" },
] as const

type Profile = {
  full_name: string | null
  company: string | null
  tier: "standard" | "expedited" | "compliance" | null
}

type Upload = {
  id: string
  role: "input" | "output"
  created_at: string
  page_count?: number | null
}

type Batch = {
  id: string
  status:
    | "created"
    | "uploaded"
    | "queued"
    | "processing"
    | "needs_review"
    | "delivered"
    | "failed"
  created_at: string
  delivered_at?: string | null
  uploads?: Upload[]
}

export default function DashboardPage() {
  const [selectedTier, setSelectedTier] = useState<"standard" | "expedited" | "compliance">(
    "standard"
  )
  const [files, setFiles] = useState<File[]>([])
  const [showOverQuota, setShowOverQuota] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [batches, setBatches] = useState<Batch[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const detected = useMemo(() => {
    const fileCount = files.length
    const pages = fileCount
    return { fileCount, pages }
  }, [files])

  useEffect(() => {
    const run = async () => {
      const supabase = createClient()
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user
      if (!user) {
        setIsLoading(false)
        return
      }

      const [{ data: profileData }, { data: batchesData }] = await Promise.all([
        supabase.from("profiles").select("full_name, company, tier").eq("id", user.id).maybeSingle(),
        supabase
          .from("batches")
          .select("id, status, created_at, delivered_at, uploads(id, role, created_at, page_count)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ])

      if (profileData) {
        setProfile(profileData as Profile)
        if (profileData.tier) {
          setSelectedTier(profileData.tier)
        }
      }
      setBatches((batchesData as Batch[]) || [])
      setIsLoading(false)
    }

    run()
  }, [])

  const totalDocuments = useMemo(() => {
    return batches.reduce((acc, batch) => {
      const inputs = batch.uploads?.filter((file) => file.role === "input") || []
      return acc + inputs.length
    }, 0)
  }, [batches])

  const averageTurnaroundHours = useMemo(() => {
    const delivered = batches.filter((batch) => batch.delivered_at)
    if (delivered.length === 0) return null
    const totalMs = delivered.reduce((acc, batch) => {
      const start = new Date(batch.created_at).getTime()
      const end = new Date(batch.delivered_at as string).getTime()
      return acc + Math.max(end - start, 0)
    }, 0)
    const avgHours = totalMs / delivered.length / (1000 * 60 * 60)
    return Math.round(avgHours)
  }, [batches])

  const pagesThisMonth = useMemo(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    return batches.reduce((acc, batch) => {
      const inputs = batch.uploads?.filter((file) => file.role === "input") || []
      const monthInputs = inputs.filter((file) => new Date(file.created_at) >= start)
      return (
        acc +
        monthInputs.reduce(
          (sum, file) => sum + (typeof file.page_count === "number" ? file.page_count : 0),
          0
        )
      )
    }, 0)
  }, [batches])

  const statusToBucket = (status: Batch["status"]) => {
    if (status === "delivered") return "completed"
    if (status === "processing" || status === "needs_review") return "processing"
    return "pending"
  }

  const recentBatches = batches.slice(0, 2)

  const activeBatch = batches.find(
    (batch) => batch.status !== "delivered" && batch.status !== "failed"
  )

  const activeOrderPagesUsed =
    activeBatch?.uploads?.reduce(
      (sum, file) => sum + (typeof file.page_count === "number" ? file.page_count : 0),
      0
    ) ?? 0
  const remainingPages = Math.max(2000 - activeOrderPagesUsed, 0)
  const remainingFiles = Math.max(1000 - (activeBatch?.uploads?.length ?? 0), 0)

  const overage = Math.max(detected.pages - remainingPages, 0)

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files ?? [])
    setFiles(nextFiles)
    if (nextFiles.length > remainingPages) {
      setShowOverQuota(true)
    } else {
      setShowOverQuota(false)
    }
  }

  const firstName = profile?.full_name?.split(" ")[0] || "there"
  const tierForBatches = profile?.tier || selectedTier

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-sm text-white/60">Loading dashboard…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">Dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-semibold">Welcome, {firstName}</h1>
            <p className="text-sm text-white/50 mt-1">
              Company: {profile?.company || "Not set"}
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400">
            Purchase New Batch
          </button>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Documents Processed", value: totalDocuments.toLocaleString(), icon: "📄" },
            {
              title: "Pages This Month",
              value: `${pagesThisMonth.toLocaleString()} / 2,000`,
              icon: "📊",
            },
            {
              title: "Average Turnaround",
              value: averageTurnaroundHours ? `${averageTurnaroundHours} hours` : "—",
              icon: "⏱️",
            },
          ].map((metric) => (
            <div
              key={metric.title}
              className="rounded-2xl border border-[#333333] bg-[#1a1a1a] p-5 space-y-3"
            >
              <div className="flex items-center justify-between text-sm text-white/60">
                <span>{metric.title}</span>
                <span>{metric.icon}</span>
              </div>
              <p className="text-2xl font-semibold">{metric.value}</p>
              {metric.title === "Pages This Month" && (
                <div className="h-2 w-full rounded-full bg-black/50">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{
                      width: `${Math.min((pagesThisMonth / 2000) * 100, 100)}%`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#333333] bg-[#1a1a1a] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">📤 Upload New Documents</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">Batch</span>
              </div>

              <label className="block rounded-2xl border border-dashed border-white/20 bg-black/50 px-6 py-10 text-center text-sm cursor-pointer">
                <input type="file" multiple className="hidden" onChange={handleFiles} />
                <p className="font-semibold">DROP FILES HERE</p>
                <p className="text-xs text-white/50 mt-2">or click to browse</p>
              </label>

              <div className="rounded-xl border border-[#333333] bg-black/40 px-4 py-3 text-sm text-white/70">
                Detected: {detected.pages} pages, {detected.fileCount} files
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold">Choose Service Level:</p>
                <div className="grid gap-3">
                  {TIERS.map((tier) => (
                    <label
                      key={tier.value}
                      className="flex items-center justify-between rounded-xl border border-[#333333] bg-black/40 px-4 py-3 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="tier"
                          value={tier.value}
                          checked={selectedTier === tier.value}
                          onChange={() => setSelectedTier(tier.value)}
                          className="h-4 w-4 accent-blue-500"
                        />
                        <div>
                          <p className="font-medium">
                            {tier.label} <span className="text-white/60">{tier.price}</span>
                          </p>
                          <p className="text-xs text-white/50">
                            {tier.eta} • {tier.description}
                          </p>
                        </div>
                      </div>
                      {tier.value === "standard" && (
                        <button className="rounded-full border border-blue-500/40 px-3 py-1 text-xs text-blue-300">
                          Rush this batch +$300
                        </button>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400">
                Purchase & Upload
              </button>
            </div>

            {showOverQuota && (
                <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-yellow-200">⚠️ Upload exceeds your credits</p>
                  <button
                    className="text-xs uppercase tracking-[0.3em] text-yellow-200/70"
                    onClick={() => setShowOverQuota(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="grid gap-2 text-sm text-yellow-100/80">
                  <p>This upload: {detected.pages} pages</p>
                  <p>Your remaining: {remainingPages} pages</p>
                  <p>Shortfall: {overage} pages</p>
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  <button className="rounded-xl bg-yellow-400 px-4 py-2 text-xs font-semibold text-black">
                    Buy Additional Batch - $799
                  </button>
                  <button className="rounded-xl border border-yellow-400/60 px-4 py-2 text-xs text-yellow-100">
                    Request Custom Quote
                  </button>
                  <button className="rounded-xl border border-yellow-400/60 px-4 py-2 text-xs text-yellow-100">
                    Select Smaller File Set
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#333333] bg-[#1a1a1a] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Batches</h2>
                <span className="text-xs text-white/50">Active Batches</span>
              </div>
              {recentBatches.length === 0 && (
                <div className="rounded-xl border border-[#333333] bg-black/40 px-4 py-4 text-sm text-white/60">
                  No batches yet. Upload your first documents to get started.
                </div>
              )}
              {recentBatches.map((batch, index) => {
                const bucket = statusToBucket(batch.status)
                const inputs = batch.uploads?.filter((file) => file.role === "input") || []
                const etaHours =
                  tierForBatches === "expedited" ? 24 : tierForBatches === "compliance" ? 48 : 72
                const eta =
                  batch.status === "delivered"
                    ? "Ready now"
                    : new Date(
                        new Date(batch.created_at).getTime() + etaHours * 60 * 60 * 1000
                      ).toLocaleString()
                const label = batch.status === "delivered" ? "Completed" : "In Progress"
                return (
                <div
                  key={batch.id}
                  className="rounded-xl border border-[#333333] bg-black/40 px-4 py-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Batch #{String(index + 1).padStart(3, "0")}</p>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs ${STATUS_STYLES[bucket]}`}
                    >
                      {label}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">
                    {inputs.length} pages • {tierForBatches[0].toUpperCase()}
                    {tierForBatches.slice(1)}
                  </p>
                  <p className="text-xs text-white/50">
                    ETA: {eta}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <button className="text-blue-300 hover:text-blue-200">View Details</button>
                    {batch.status === "delivered" && (
                      <button className="text-emerald-300 hover:text-emerald-200">Download</button>
                    )}
                  </div>
                </div>
                )
              })}
            </div>

            <aside className="rounded-2xl border border-[#333333] bg-[#1a1a1a] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Credits</h3>
                <span className="text-xs text-white/50">Quota</span>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p>Active Batch: {selectedTier[0].toUpperCase() + selectedTier.slice(1)}</p>
                <p>Pages: {remainingPages.toLocaleString()} / 2,000 remaining</p>
                <p>Files: {remainingFiles.toLocaleString()} / 1,000 remaining</p>
              </div>
              <p className="text-xs text-white/50">[?] Credits never expire</p>
              <button className="w-full rounded-xl border border-blue-500/60 px-4 py-2 text-xs text-blue-200">
                Buy More Credits
              </button>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}
