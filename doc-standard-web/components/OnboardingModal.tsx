"use client"

import { useEffect, useMemo, useRef, useState } from "react"

interface OnboardingModalProps {
  onComplete: (data: {
    name: string
    email: string
    company: string
    phone?: string
    tier: "standard" | "expedited" | "compliance"
  }) => void
  isOpen: boolean
  onClose: () => void
}

type TierOption = "standard" | "expedited" | "compliance"

const PROGRESS_KEY = "onboarding_progress"
const COMPLETE_KEY = "onboarding_complete"

const DOC_TYPES = ["Invoices", "Contracts", "Receipts", "Forms", "Other"] as const

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function OnboardingModal({ onComplete, isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isFading, setIsFading] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  })
  const [profileErrors, setProfileErrors] = useState<{ [key: string]: string }>({})

  const [docTypes, setDocTypes] = useState<Record<string, boolean>>({})
  const [tier, setTier] = useState<TierOption>("standard")

  const [files, setFiles] = useState<File[]>([])
  const [fileSummary, setFileSummary] = useState({
    count: 0,
    totalPages: 0,
    names: [] as string[],
  })

  const hasHydrated = useRef(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const completed = localStorage.getItem(COMPLETE_KEY) === "true"
    setHasCompleted(completed)
    if (completed) return

    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) {
      hasHydrated.current = true
      return
    }

    try {
      const parsed = JSON.parse(raw)
      if (parsed?.step) setStep(parsed.step)
      if (parsed?.profile) setProfile((prev) => ({ ...prev, ...parsed.profile }))
      if (parsed?.docTypes) setDocTypes(parsed.docTypes)
      if (parsed?.tier) setTier(parsed.tier)
      if (parsed?.fileSummary) setFileSummary(parsed.fileSummary)
    } catch {
      localStorage.removeItem(PROGRESS_KEY)
    } finally {
      hasHydrated.current = true
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || hasCompleted || !hasHydrated.current) return
    const payload = JSON.stringify({
      step,
      profile,
      docTypes,
      tier,
      fileSummary,
    })
    localStorage.setItem(PROGRESS_KEY, payload)
  }, [step, profile, docTypes, tier, fileSummary, isOpen, hasCompleted])

  const deliveryEstimate = useMemo(() => {
    const now = new Date()
    const addHours = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000)
    const formatDate = (date: Date) =>
      date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })

    if (tier === "standard") {
      return formatDate(addHours(72))
    }
    if (tier === "expedited") {
      return formatDate(addHours(24))
    }
    const start = addHours(48)
    const end = addHours(72)
    return `${formatDate(start)} – ${formatDate(end)}`
  }, [tier])

  const updateProfile = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
    setProfileErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validateProfile = () => {
    const errors: { [key: string]: string } = {}
    if (!profile.name.trim()) errors.name = "Full name is required."
    if (!profile.email.trim()) {
      errors.email = "Email is required."
    } else if (!EMAIL_REGEX.test(profile.email)) {
      errors.email = "Enter a valid email address."
    }
    if (!profile.company.trim()) errors.company = "Company name is required."
    setProfileErrors(errors)
    return Object.keys(errors).length === 0
  }

  const transitionTo = (nextStep: 1 | 2 | 3) => {
    if (nextStep === step) return
    setIsFading(true)
    window.setTimeout(() => {
      setStep(nextStep)
      window.setTimeout(() => setIsFading(false), 160)
    }, 160)
  }

  const handleContinue = () => {
    if (!validateProfile()) return
    transitionTo(2)
  }

  const handleComplete = () => {
    localStorage.setItem(COMPLETE_KEY, "true")
    localStorage.removeItem(PROGRESS_KEY)
    onComplete({
      name: profile.name.trim(),
      email: profile.email.trim(),
      company: profile.company.trim(),
      phone: profile.phone.trim() || undefined,
      tier,
    })
  }

  const updateFiles = (nextFiles: File[]) => {
    const totalPages = nextFiles.reduce((acc, file) => {
      const anyFile = file as File & { pageCount?: number }
      return acc + (anyFile.pageCount ?? 1)
    }, 0)
    setFiles(nextFiles)
    setFileSummary({
      count: nextFiles.length,
      totalPages,
      names: nextFiles.map((file) => file.name),
    })
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files ?? [])
    updateFiles(nextFiles)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const nextFiles = Array.from(event.dataTransfer.files ?? [])
    updateFiles(nextFiles)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  if (!isOpen || hasCompleted) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4 py-8">
      <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-slate-300 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500 transition hover:border-blue-500 hover:text-slate-900"
          aria-label="Close modal"
        >
          Close
        </button>

        <div className="p-6 sm:p-10">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400">
            <span>Onboarding</span>
            <span>Step {step} of 3</span>
          </div>

          <div
            className={`mt-6 transition-opacity duration-200 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold">Tell us about you</h2>
                  <p className="text-sm text-slate-500 mt-2">
                    We use this to personalize your workflow and routing.
                  </p>
                </div>

                <div className="grid gap-4">
                  <label className="grid gap-2 text-sm">
                    Full Name*
                    <input
                      value={profile.name}
                      onChange={(event) => updateProfile("name", event.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none"
                      placeholder="Jane Smith"
                    />
                    {profileErrors.name && (
                      <span className="text-xs text-red-600">{profileErrors.name}</span>
                    )}
                  </label>

                  <label className="grid gap-2 text-sm">
                    Email*
                    <input
                      value={profile.email}
                      onChange={(event) => updateProfile("email", event.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none"
                      placeholder="jane@company.com"
                      type="email"
                    />
                    {profileErrors.email && (
                      <span className="text-xs text-red-600">{profileErrors.email}</span>
                    )}
                  </label>

                  <label className="grid gap-2 text-sm">
                    Company Name*
                    <input
                      value={profile.company}
                      onChange={(event) => updateProfile("company", event.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none"
                      placeholder="Company, Inc."
                    />
                    {profileErrors.company && (
                      <span className="text-xs text-red-600">{profileErrors.company}</span>
                    )}
                  </label>

                  <label className="grid gap-2 text-sm">
                    Phone
                    <input
                      value={profile.phone}
                      onChange={(event) => updateProfile("phone", event.target.value)}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none"
                      placeholder="+1 (555) 555-5555"
                    />
                  </label>
                </div>

                <div className="flex">
                  <button
                    onClick={handleContinue}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!profile.name.trim() || !profile.email.trim() || !profile.company.trim()}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold">How it works</h2>
                  <p className="text-sm text-slate-500 mt-2">
                    Every batch is handled by human experts, start to finish.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "📤 Upload",
                      body: "Send us your messy files (PDFs, scans, photos)",
                    },
                    {
                      title: "👤 Expert Processing",
                      body: "Our team extracts, cleans, and structures every field by hand",
                    },
                    {
                      title: "📊 Receive Clean Data",
                      body: "Get perfectly formatted files ready for your systems",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <h3 className="text-base font-semibold">{card.title}</h3>
                      <p className="text-sm text-slate-600 mt-2">{card.body}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 text-sm text-slate-700">
                  {[
                    "⏱️ 24-48 hour turnaround (Standard tier)",
                    "🧑‍💼 Human-verified accuracy",
                    "🔒 Bank-level security",
                  ].map((badge) => (
                    <div
                      key={badge}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      {badge}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => transitionTo(1)}
                    className="text-xs uppercase tracking-[0.35em] text-slate-500 transition hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => transitionTo(3)}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                  >
                    Start My First Batch →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold">Upload and select a tier</h2>
                  <p className="text-sm text-slate-500 mt-2">
                    We will confirm scope and move your batch into processing.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <p className="text-sm font-semibold">Drag & drop files here</p>
                    <p className="text-xs text-slate-500 mt-1">or click to browse</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileInput}
                    />
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {fileSummary.count > 0 ? (
                      <>
                        <p>{fileSummary.count} files selected</p>
                        <p className="text-xs text-slate-500">
                          Total pages: {fileSummary.totalPages}
                        </p>
                      </>
                    ) : (
                      <p>No files selected yet.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Document Type</h3>
                  <p className="text-xs text-slate-500">Select all that apply</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {DOC_TYPES.map((label) => (
                      <label
                        key={label}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(docTypes[label])}
                          onChange={(event) =>
                            setDocTypes((prev) => ({
                              ...prev,
                              [label]: event.target.checked,
                            }))
                          }
                          className="h-4 w-4 accent-blue-500"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Service Level</h3>
                  <div className="grid gap-3">
                    {[
                      {
                        value: "standard",
                        label: "Standard ($799) • 72 hours • Single expert review",
                      },
                      {
                        value: "expedited",
                        label: "Expedited ($1,099) • 24 hours • Priority queue",
                      },
                      {
                        value: "compliance",
                        label: "Compliance ($1,299) • 48-72 hours • Double-verified + audit trail",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                      >
                        <input
                          type="radio"
                          name="tier"
                          value={option.value}
                          checked={tier === option.value}
                          onChange={() => setTier(option.value as TierOption)}
                          className="h-4 w-4 accent-blue-500"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                  <span className="text-slate-500">Your documents will be ready by: </span>
                  <span className="text-slate-900">{deliveryEstimate}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => transitionTo(2)}
                    className="text-xs uppercase tracking-[0.35em] text-slate-500 transition hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleComplete}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
                  >
                    Purchase & Start Processing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
