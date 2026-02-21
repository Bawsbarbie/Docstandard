"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { BarChart3, BadgeCheck, Clock3, ShieldCheck, Upload, UserCheck } from "lucide-react"

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
  initialProfile?: {
    name?: string
    email?: string
    company?: string
    phone?: string
  }
  storageKeySuffix?: string
}

type TierOption = "standard" | "expedited" | "compliance"

const PROGRESS_KEY = "onboarding_progress"
const COMPLETE_KEY = "onboarding_complete"

const DOC_TYPES = ["Invoices", "Contracts", "Receipts", "Forms", "Mixed / Multiple", "Other"] as const

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BATCH_PAGE_LIMIT = 2000
const BATCH_FILE_LIMIT = 1000

export function OnboardingModal({
  onComplete,
  isOpen,
  onClose,
  initialProfile,
  storageKeySuffix,
}: OnboardingModalProps) {
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

  const [documentType, setDocumentType] = useState("")
  const [purposeUseCase, setPurposeUseCase] = useState("")
  const [tier, setTier] = useState<TierOption>("standard")

  const [fileSummary, setFileSummary] = useState({
    count: 0,
    totalPages: 0,
    names: [] as string[],
  })

  const hasHydrated = useRef(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const selectedFilesRef = useRef<File[]>([])
  const pageEstimateRunRef = useRef(0)
  const progressKey = storageKeySuffix ? `${PROGRESS_KEY}:${storageKeySuffix}` : PROGRESS_KEY
  const completeKey = storageKeySuffix ? `${COMPLETE_KEY}:${storageKeySuffix}` : COMPLETE_KEY
  const [isEstimatingPages, setIsEstimatingPages] = useState(false)
  const baseProfile = useMemo(
    () => ({
      name: initialProfile?.name ?? "",
      email: initialProfile?.email ?? "",
      company: initialProfile?.company ?? "",
      phone: initialProfile?.phone ?? "",
    }),
    [initialProfile?.name, initialProfile?.email, initialProfile?.company, initialProfile?.phone]
  )

  useEffect(() => {
    if (!isOpen) return
    selectedFilesRef.current = []
    const completed = localStorage.getItem(completeKey) === "true"
    setHasCompleted(completed)
    if (completed) return

    const raw = localStorage.getItem(progressKey)
    if (!raw) {
      setProfile((prev) => ({
        name: prev.name || baseProfile.name,
        email: prev.email || baseProfile.email,
        company: prev.company || baseProfile.company,
        phone: prev.phone || baseProfile.phone,
      }))
      hasHydrated.current = true
      return
    }

    try {
      const parsed = JSON.parse(raw)
      if (parsed?.step) setStep(parsed.step)
      if (parsed?.profile) {
        setProfile({
          name: parsed.profile.name || baseProfile.name,
          email: parsed.profile.email || baseProfile.email,
          company: parsed.profile.company || baseProfile.company,
          phone: parsed.profile.phone || baseProfile.phone,
        })
      } else {
        setProfile(baseProfile)
      }
      if (parsed?.documentType) setDocumentType(parsed.documentType)
      if (parsed?.purposeUseCase) setPurposeUseCase(parsed.purposeUseCase)
      if (parsed?.tier) setTier(parsed.tier)
      if (parsed?.fileSummary) setFileSummary(parsed.fileSummary)
    } catch {
      localStorage.removeItem(progressKey)
      setProfile(baseProfile)
    } finally {
      hasHydrated.current = true
    }
  }, [isOpen, progressKey, completeKey, baseProfile])

  useEffect(() => {
    if (!isOpen || hasCompleted || !hasHydrated.current) return
    const payload = JSON.stringify({
      step,
      profile,
      documentType,
      purposeUseCase,
      tier,
      fileSummary,
    })
    localStorage.setItem(progressKey, payload)
  }, [step, profile, documentType, purposeUseCase, tier, fileSummary, isOpen, hasCompleted, progressKey])

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
    localStorage.setItem(completeKey, "true")
    localStorage.removeItem(progressKey)
    onComplete({
      name: profile.name.trim(),
      email: profile.email.trim(),
      company: profile.company.trim(),
      phone: profile.phone.trim() || undefined,
      tier,
    })
  }

  const estimatePagesForFile = async (file: File): Promise<number> => {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    if (!isPdf) return 1

    try {
      const fileBuffer = await file.arrayBuffer()
      const { PDFDocument } = await import("pdf-lib")
      const pdf = await PDFDocument.load(fileBuffer, { ignoreEncryption: true })
      return Math.max(pdf.getPageCount(), 1)
    } catch {
      return 1
    }
  }

  const getFileKey = (file: File) => `${file.name}:${file.size}:${file.lastModified}`
  const mergeFilesByIdentity = (current: File[], incoming: File[]) => {
    const seen = new Set(current.map((file) => getFileKey(file)))
    const merged = [...current]
    for (const file of incoming) {
      const key = getFileKey(file)
      if (seen.has(key)) continue
      merged.push(file)
      seen.add(key)
    }
    return merged
  }

  const applySelectedFiles = async (incomingFiles: File[]) => {
    const nextFiles = mergeFilesByIdentity(selectedFilesRef.current, incomingFiles)
    const currentRunId = ++pageEstimateRunRef.current
    selectedFilesRef.current = nextFiles
    setIsEstimatingPages(true)

    const pageCounts = await Promise.all(nextFiles.map((file) => estimatePagesForFile(file)))
    if (currentRunId !== pageEstimateRunRef.current) return

    setFileSummary({
      count: nextFiles.length,
      totalPages: pageCounts.reduce((sum, pages) => sum + pages, 0),
      names: nextFiles.map((file) => file.name),
    })
    setIsEstimatingPages(false)
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files ?? [])
    event.target.value = ""
    void applySelectedFiles(nextFiles)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const nextFiles = Array.from(event.dataTransfer.files ?? [])
    void applySelectedFiles(nextFiles)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const remainingPages = Math.max(BATCH_PAGE_LIMIT - fileSummary.totalPages, 0)
  const remainingFiles = Math.max(BATCH_FILE_LIMIT - fileSummary.count, 0)
  const overPageLimit = fileSummary.totalPages > BATCH_PAGE_LIMIT
  const overFileLimit = fileSummary.count > BATCH_FILE_LIMIT
  const isOverLimit = overPageLimit || overFileLimit

  if (!isOpen || hasCompleted) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm px-4 py-6">
      <div className="mx-auto flex min-h-full w-full max-w-3xl items-center">
        <div className="relative flex h-[92vh] w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-slate-300 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500 transition hover:border-blue-500 hover:text-slate-900"
          aria-label="Close modal"
        >
          Close
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-10">
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
                      title: "Upload",
                      body: "Send us your messy files (PDFs, scans, photos)",
                      Icon: Upload,
                    },
                    {
                      title: "Expert Processing",
                      body: "Our team extracts, cleans, and structures every field by hand",
                      Icon: UserCheck,
                    },
                    {
                      title: "Receive Clean Data",
                      body: "Get perfectly formatted files ready for your systems",
                      Icon: BarChart3,
                    },
                  ].map(({ title, body, Icon }) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                          <Icon className="h-4 w-4 text-blue-600" aria-hidden="true" />
                        </span>
                        <h3 className="text-base font-semibold">{title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 mt-3">{body}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 text-sm text-slate-700">
                  {[
                    { label: "24-72 hour turnaround (Standard tier)", Icon: Clock3 },
                    { label: "Human-verified accuracy", Icon: BadgeCheck },
                    { label: "Bank-level security", Icon: ShieldCheck },
                  ].map(({ label, Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <span>{label}</span>
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
              <div className="max-h-[calc(92vh-12rem)] overflow-y-auto pr-1 space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold">Upload and select a tier</h2>
                  <p className="text-sm text-slate-500 mt-2">
                    We will confirm scope and move your batch into processing.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold">Upload Files</h3>
                    <p className="text-xs text-slate-500">
                      Limit: 2,000 pages OR 1,000 files per batch. Need more? Enterprise options.
                    </p>
                  </div>

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

                  <div
                    className={`rounded-xl border px-4 py-3 text-sm ${
                      isOverLimit
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {fileSummary.count > 0 ? (
                      <>
                        <p>{fileSummary.count} files selected</p>
                        <p className={`text-xs ${isOverLimit ? "text-red-600" : "text-slate-500"}`}>
                          Total pages: {fileSummary.totalPages}
                        </p>
                      </>
                    ) : (
                      <p>No files selected yet.</p>
                    )}
                    {isEstimatingPages && (
                      <p className="text-xs mt-1 text-slate-500">Estimating PDF page counts...</p>
                    )}
                    <p className={`text-xs mt-1 ${isOverLimit ? "text-red-600" : "text-slate-500"}`}>
                      Remaining this batch: {remainingPages.toLocaleString()} pages and{" "}
                      {remainingFiles.toLocaleString()} files
                    </p>
                    {isOverLimit && (
                      <p className="text-xs text-red-600 mt-1">
                        Current selection exceeds the per-batch limit. Remove some files or request
                        enterprise options.
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Document Type</h3>
                  <select
                    value={documentType}
                    onChange={(event) => setDocumentType(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select a document type...</option>
                    {DOC_TYPES.map((label) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Purpose / Use Case</h3>
                  <p className="text-xs text-slate-500">
                    Tell us what you need this for and which output format you prefer.
                  </p>
                  <textarea
                    value={purposeUseCase}
                    onChange={(event) => setPurposeUseCase(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                    rows={4}
                    placeholder="Example: Need customs invoices normalized for SAP upload. Preferred output: CSV + JSON."
                  />
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

                <div className="sticky bottom-0 z-10 -mx-1 flex flex-col gap-4 border-t border-slate-200 bg-white/95 px-1 pt-4 pb-1 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => transitionTo(2)}
                    className="text-xs uppercase tracking-[0.35em] text-slate-500 transition hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleComplete}
                    disabled={isOverLimit || isEstimatingPages || !documentType}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
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
    </div>
  )
}
