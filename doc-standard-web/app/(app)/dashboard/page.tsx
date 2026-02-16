"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { createCheckoutSession } from "@/lib/actions/stripe"
import { getBatchDownloads } from "@/lib/actions/download"
import { updateProfile } from "@/lib/actions/profile"
import { Manrope, Sora } from "next/font/google"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
})

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
})

const LIMIT_PAGES = 2000
const LIMIT_FILES = 1000

type Profile = {
  full_name: string | null
  email: string | null
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
  paid_at?: string | null
  delivered_at?: string | null
  uploads?: Upload[]
}

const PAGE_TITLES = {
  dashboard: "Dashboard",
  upload: "Upload Batch",
  batches: "My Batches",
  billing: "Billing & Credits",
  profile: "Profile Settings",
  faq: "Help Center",
} as const

type PageId = keyof typeof PAGE_TITLES

type StatusMeta = { label: string; className: string }
type PaymentNotice = { type: "success" | "cancelled"; batchId: string | null }

const statusMeta = (status: Batch["status"]): StatusMeta => {
  if (status === "delivered") {
    return { label: "Ready", className: "bg-emerald-100 text-emerald-800" }
  }
  if (status === "needs_review") {
    return { label: "Quality Check", className: "bg-purple-100 text-purple-800" }
  }
  if (status === "failed") {
    return { label: "Failed", className: "bg-red-100 text-red-800" }
  }
  return { label: "Processing", className: "bg-blue-100 text-blue-800" }
}

const formatDate = (value?: string | null) => {
  if (!value) return "—"
  return new Date(value).toLocaleString()
}

const titleCase = (value?: string | null) => {
  if (!value) return "—"
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export default function DashboardPage() {
  const [activePage, setActivePage] = useState<PageId>("dashboard")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const uploadFormRef = useRef<HTMLDivElement | null>(null)

  const [selectedTier, setSelectedTier] = useState<"standard" | "expedited" | "compliance">(
    "standard"
  )
  const [useExistingCreditsForUpload, setUseExistingCreditsForUpload] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isDraggingFiles, setIsDraggingFiles] = useState(false)
  const [showOverQuota, setShowOverQuota] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileForm, setProfileForm] = useState({ fullName: "", email: "", company: "" })
  const [batches, setBatches] = useState<Batch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [paymentNotice, setPaymentNotice] = useState<PaymentNotice | null>(null)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [retryingBatchId, setRetryingBatchId] = useState<string | null>(null)
  const [downloadError, setDownloadError] = useState<string | null>(null)
  const [downloadingBatchId, setDownloadingBatchId] = useState<string | null>(null)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [profileSaveMessage, setProfileSaveMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  useEffect(() => {
    const run = async () => {
      const supabase = createClient()
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user
      if (!user) {
        setIsLoading(false)
        return
      }

      setProfileForm((prev) => ({
        ...prev,
        email: user.email ?? "",
      }))

      const [{ data: profileData }, { data: batchesData }] = await Promise.all([
        supabase.from("profiles").select("full_name, email, company, tier").eq("id", user.id).maybeSingle(),
        supabase
          .from("batches")
          .select("id, status, created_at, paid_at, delivered_at, uploads(id, role, created_at, page_count)")
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

  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const payment = params.get("payment")
    const batchId = params.get("batch_id")

    if (payment !== "success" && payment !== "cancelled") {
      return
    }

    setPaymentNotice({ type: payment, batchId })
    setActivePage("batches")

    const url = new URL(window.location.href)
    url.searchParams.delete("payment")
    url.searchParams.delete("batch_id")
    window.history.replaceState({}, "", url.toString())
  }, [])

  useEffect(() => {
    setProfileForm((prev) => ({
      fullName: profile?.full_name ?? "",
      email: profile?.email ?? prev.email,
      company: profile?.company ?? "",
    }))
  }, [profile])

  const totalDocuments = useMemo(() => {
    return batches.reduce((acc, batch) => {
      const inputs = batch.uploads?.filter((file) => file.role === "input") || []
      return acc + inputs.length
    }, 0)
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

  const filesThisMonth = useMemo(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    return batches.reduce((acc, batch) => {
      const inputs = batch.uploads?.filter((file) => file.role === "input") || []
      const monthInputs = inputs.filter((file) => new Date(file.created_at) >= start)
      return acc + monthInputs.length
    }, 0)
  }, [batches])

  const activeBatches = useMemo(
    () => batches.filter((batch) => batch.status !== "delivered" && batch.status !== "failed"),
    [batches]
  )

  const readyBatches = useMemo(
    () => batches.filter((batch) => batch.status === "delivered"),
    [batches]
  )

  const recentBatches = batches.slice(0, 3)

  const hasPaidBatch = batches.some(
    (batch) =>
      Boolean(batch.paid_at) ||
      batch.status === "queued" ||
      batch.status === "processing" ||
      batch.status === "needs_review" ||
      batch.status === "delivered"
  )
  const remainingPages = hasPaidBatch ? Math.max(LIMIT_PAGES - pagesThisMonth, 0) : 0
  const remainingFiles = hasPaidBatch ? Math.max(LIMIT_FILES - filesThisMonth, 0) : 0
  const availableCredits = remainingPages
  const usagePercent = hasPaidBatch ? Math.min((pagesThisMonth / LIMIT_PAGES) * 100, 100) : 0
  const hasRemainingCredits = remainingPages > 0 && remainingFiles > 0
  const uploadLimitPages = useExistingCreditsForUpload ? remainingPages : LIMIT_PAGES
  const uploadLimitFiles = useExistingCreditsForUpload ? remainingFiles : LIMIT_FILES

  const applySelectedFiles = (nextFiles: File[]) => {
    setFiles(nextFiles)
    const overFiles = nextFiles.length > uploadLimitFiles
    const overPages = nextFiles.length > uploadLimitPages
    setShowOverQuota(overFiles || overPages)
  }

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files ?? [])
    applySelectedFiles(nextFiles)
  }

  const handleDropFiles = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggingFiles(false)
    const nextFiles = Array.from(event.dataTransfer.files ?? [])
    applySelectedFiles(nextFiles)
  }

  const handleDragOverFiles = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggingFiles(true)
  }

  const handleDragLeaveFiles = (event: React.DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDraggingFiles(false)
    }
  }

  const openUploadForm = (useExistingCredits: boolean) => {
    setUseExistingCreditsForUpload(useExistingCredits)
    setShowUploadForm(true)
    setFiles([])
    setShowOverQuota(false)
    setIsDraggingFiles(false)
    setActivePage("upload")
  }

  const handleSelectPlan = (plan: "economy" | "standard" | "rush") => {
    openUploadForm(false)
    if (plan === "rush") {
      setSelectedTier("expedited")
    } else {
      setSelectedTier("standard")
    }
  }

  useEffect(() => {
    if (activePage !== "upload" || !showUploadForm) return
    uploadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [activePage, showUploadForm])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const handleRetryPayment = async (batchId: string) => {
    setPaymentError(null)
    setRetryingBatchId(batchId)
    const { url, error } = await createCheckoutSession(batchId)

    if (url) {
      window.location.href = url
      return
    }

    setPaymentError(error || "Could not open Stripe Checkout. Please try again.")
    setPaymentNotice({ type: "cancelled", batchId })
    if (error) {
      console.error("Failed to create checkout session:", error)
    }
    setRetryingBatchId(null)
  }

  const handleDownload = async (batchId: string) => {
    setDownloadError(null)
    setDownloadingBatchId(batchId)

    const { files, error } = await getBatchDownloads(batchId)

    if (files.length > 0) {
      for (const file of files) {
        const link = document.createElement("a")
        link.href = file.url
        link.download = file.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      setDownloadingBatchId(null)
      return
    }

    setDownloadError(error || "Download failed")
    setDownloadingBatchId(null)
  }

  const handleSaveProfile = async () => {
    setIsSavingProfile(true)
    setProfileSaveMessage(null)

    const { success, error } = await updateProfile({
      full_name: profileForm.fullName.trim(),
      company: profileForm.company.trim(),
    })

    if (success) {
      setProfileSaveMessage({ type: "success", text: "Profile saved successfully." })
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              full_name: profileForm.fullName.trim(),
              company: profileForm.company.trim(),
            }
          : prev
      )
    } else {
      setProfileSaveMessage({ type: "error", text: error || "Failed to save profile." })
    }

    setIsSavingProfile(false)

    setTimeout(() => {
      setProfileSaveMessage(null)
    }, 3000)
  }

  const profileInitials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0].toUpperCase())
        .slice(0, 2)
        .join("")
    : "—"

  const uploadAreaState = showOverQuota
    ? "border-red-300 bg-red-50"
    : isDraggingFiles
      ? "border-[#3b82f6] bg-[#dbeafe]"
    : files.length > 0
      ? "border-[#3b82f6] bg-[#eff6ff]"
      : "border-slate-300 bg-white/70"

  const uploadPrompt = files.length > 0
    ? showOverQuota
      ? `${files.length} files selected (Limit Exceeded)`
      : `${files.length} files ready to upload`
    : "or drag and drop"

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-sm text-white/60">Loading dashboard…</p>
      </div>
    )
  }

  return (
    <div className={`${manrope.variable} ${sora.variable} dashboard-console`}>
      <style jsx global>{`
        .dashboard-console {
          font-family: var(--font-manrope), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          color: #0f172a;
          background:
            radial-gradient(900px circle at 12% -10%, rgba(20, 184, 166, 0.16), transparent 55%),
            radial-gradient(900px circle at 110% 0%, rgba(245, 158, 11, 0.14), transparent 55%),
            #f6f3ed;
        }

        .dashboard-console h1,
        .dashboard-console h2,
        .dashboard-console h3,
        .dashboard-console h4 {
          font-family: var(--font-sora), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          letter-spacing: -0.02em;
        }

        #main-scroll::-webkit-scrollbar {
          width: 8px;
        }
        #main-scroll::-webkit-scrollbar-track {
          background: #edf1f4;
        }
        #main-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        #main-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .panel {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.7) inset, 0 12px 30px rgba(15, 23, 42, 0.06);
          border-radius: 18px;
        }

        .panel-muted {
          background: rgba(248, 250, 252, 0.9);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 16px;
        }

        .panel-dark {
          background: linear-gradient(180deg, rgba(2, 6, 23, 0.96), rgba(2, 6, 23, 0.88));
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: 18px;
        }

        .glass {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(10px);
        }

        .page-transition {
          animation: fadeScale 0.35s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeScale 0.35s ease-out forwards;
        }

        .nav-active {
          box-shadow: 0 12px 24px rgba(20, 184, 166, 0.25);
        }

        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="flex min-h-screen overflow-hidden">
        <aside className="w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col flex-shrink-0 transition-all duration-300 z-20 border-r border-white/10 shadow-2xl">
          <div className="h-16 flex items-center px-6 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center shadow-lg shadow-[0_12px_24px_rgba(37,99,235,0.25)]">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">DocStandard</span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            <div className="px-3 mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
              Platform
            </div>

            <button
              type="button"
              onClick={() => setActivePage("dashboard")}
              className={`nav-item group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-all ${
                activePage === "dashboard"
                  ? "bg-[#2563eb] text-white nav-active"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 transition-colors ${
                  activePage === "dashboard" ? "text-[#dbeafe]" : "text-slate-500 group-hover:text-white"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              Dashboard
            </button>

            <button
              type="button"
              onClick={() => setActivePage("upload")}
              className={`nav-item group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                activePage === "upload"
                  ? "bg-[#2563eb] text-white nav-active"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 transition-colors ${
                  activePage === "upload" ? "text-[#dbeafe]" : "text-slate-500 group-hover:text-white"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              Upload Batch
            </button>

            <button
              type="button"
              onClick={() => setActivePage("batches")}
              className={`nav-item group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                activePage === "batches"
                  ? "bg-[#2563eb] text-white nav-active"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 transition-colors ${
                  activePage === "batches" ? "text-[#dbeafe]" : "text-slate-500 group-hover:text-white"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                ></path>
              </svg>
              My Batches
            </button>

            <div className="mt-8 px-3 mb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
              Account
            </div>

            <button
              type="button"
              onClick={() => setActivePage("billing")}
              className={`nav-item group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                activePage === "billing"
                  ? "bg-[#2563eb] text-white nav-active"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 transition-colors ${
                  activePage === "billing" ? "text-[#dbeafe]" : "text-slate-500 group-hover:text-white"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
              Billing & Credits
            </button>

            <button
              type="button"
              onClick={() => setActivePage("profile")}
              className={`nav-item group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-colors ${
                activePage === "profile"
                  ? "bg-[#2563eb] text-white nav-active"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg
                className={`mr-3 h-5 w-5 transition-colors ${
                  activePage === "profile" ? "text-[#dbeafe]" : "text-slate-500 group-hover:text-white"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              Profile Settings
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="nav-item group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-xl cursor-pointer text-slate-300 hover:text-white hover:bg-red-900/20 transition-colors"
            >
              <svg
                className="mr-3 h-5 w-5 text-slate-500 group-hover:text-red-300 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Log Out
            </button>
          </nav>

          <div className="p-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setActivePage("faq")}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Help & FAQ
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="h-16 glass border-b border-white/60 flex items-center justify-between px-8 flex-shrink-0 z-10">
            <h1 id="page-title" className="text-xl font-bold text-slate-900">
              {PAGE_TITLES[activePage]}
            </h1>

            <div className="flex items-center gap-6">
              <button className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors">
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500 border-2 border-white"></span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </button>

              <div className="h-6 w-px bg-slate-200"></div>

              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-slate-900">{profile?.full_name ?? "—"}</div>
                  <div className="text-xs text-slate-500">{profile?.company ?? "—"}</div>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#dbeafe] text-[#2563eb] flex items-center justify-center font-semibold text-sm border-2 border-white shadow-sm">
                  {profileInitials}
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto p-8" id="main-scroll">
            {downloadError && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between gap-4 text-red-900">
                <p className="text-sm font-medium">{downloadError}</p>
                <button
                  type="button"
                  onClick={() => setDownloadError(null)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-white/40"
                >
                  Dismiss
                </button>
              </div>
            )}
            {paymentError && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between gap-4 text-red-900">
                <p className="text-sm font-medium">{paymentError}</p>
                <button
                  type="button"
                  onClick={() => setPaymentError(null)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-white/40"
                >
                  Dismiss
                </button>
              </div>
            )}
            {paymentNotice && (
              <div
                className={`mb-6 rounded-2xl border px-4 py-3 flex items-center justify-between gap-4 ${
                  paymentNotice.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}
              >
                <p className="text-sm font-medium">
                  {paymentNotice.type === "success"
                    ? `Payment received${paymentNotice.batchId ? ` for batch ${paymentNotice.batchId.slice(0, 8)}` : ""}. Your batch is now queued for processing.`
                    : `Payment cancelled${paymentNotice.batchId ? ` for batch ${paymentNotice.batchId.slice(0, 8)}` : ""}. You can retry checkout from your batch list.`}
                </p>
                <button
                  type="button"
                  onClick={() => setPaymentNotice(null)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-current/20 hover:bg-white/40"
                >
                  Dismiss
                </button>
              </div>
            )}
            {activePage === "dashboard" && (
              <div id="dashboard-page" className="page-content page-transition max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
                    <p className="text-slate-500 mt-1">Track your document processing pipelines.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePage("upload")}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-[0_12px_24px_rgba(37,99,235,0.25)] transition-all flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    New Batch
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="panel p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-500 text-sm font-semibold">Available Credits</span>
                      <span className="p-2 bg-[#eff6ff] text-[#2563eb] rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-slate-900">
                        {availableCredits.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-500">pages</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Usage</span>
                        <span className="text-slate-700 font-medium">{`${Math.round(usagePercent)}%`}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-[#2563eb] h-2 rounded-full"
                          style={{ width: `${usagePercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="panel p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-500 text-sm font-semibold">Active Batches</span>
                      <span className="p-2 bg-amber-50 text-amber-700 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-slate-900">
                        {activeBatches.length.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-slate-500 font-medium bg-slate-100 inline-block px-2 py-0.5 rounded">
                      {activeBatches.length ? "Processing" : "—"}
                    </div>
                  </div>

                  <div className="panel p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-500 text-sm font-semibold">Ready for Download</span>
                      <span className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-slate-900">
                        {readyBatches.length.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-slate-500 font-medium bg-slate-100 inline-block px-2 py-0.5 rounded">
                      {readyBatches.length ? "Action Required" : "—"}
                    </div>
                  </div>

                  <div className="panel p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-500 text-sm font-semibold">Files Processed</span>
                      <span className="p-2 bg-orange-50 text-orange-700 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-slate-900">
                        {totalDocuments.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-slate-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        ></path>
                      </svg>
                      {filesThisMonth ? `+${filesThisMonth} this month` : "—"}
                    </div>
                  </div>
                </div>

                <div className="panel overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200/60 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
                    <button
                      type="button"
                      onClick={() => setActivePage("batches")}
                      className="text-sm text-[#2563eb] font-semibold hover:text-[#1d4ed8] cursor-pointer"
                    >
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/80 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        <tr>
                          <th className="px-6 py-4">Batch Name</th>
                          <th className="px-6 py-4">Type</th>
                          <th className="px-6 py-4">Volume</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Delivery</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {recentBatches.length === 0 && (
                          <tr>
                            <td className="px-6 py-6 text-sm text-slate-400" colSpan={6}>
                              —
                            </td>
                          </tr>
                        )}
                        {recentBatches.map((batch) => {
                          const inputs = batch.uploads?.filter((file) => file.role === "input") || []
                          const pages = inputs.reduce(
                            (sum, file) => sum + (typeof file.page_count === "number" ? file.page_count : 0),
                            0
                          )
                          const meta = statusMeta(batch.status)
                          const hasOutput = batch.uploads?.some((file) => file.role === "output")
                          return (
                            <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-900">
                                {batch.id.slice(0, 8)}
                              </td>
                              <td className="px-6 py-4 text-slate-500">
                                {titleCase(profile?.tier ?? selectedTier)}
                              </td>
                              <td className="px-6 py-4 text-slate-500">
                                {inputs.length ? `${inputs.length} files (${pages} pgs)` : "—"}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${meta.className}`}
                                >
                                  {meta.label}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-500 text-sm">
                                {formatDate(batch.delivered_at)}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {batch.status === "delivered" && hasOutput ? (
                                  <div className="inline-flex flex-col items-end">
                                    <button
                                      type="button"
                                      onClick={() => handleDownload(batch.id)}
                                      disabled={downloadingBatchId === batch.id}
                                      title="Downloads all output files for this batch"
                                      className="text-[#2563eb] hover:text-[#1d4ed8] text-sm font-semibold disabled:opacity-50"
                                    >
                                      {downloadingBatchId === batch.id ? "Loading..." : "Download"}
                                    </button>
                                    <span className="text-[10px] text-slate-400">All files</span>
                                  </div>
                                ) : batch.status === "uploaded" || batch.status === "created" ? (
                                  <button
                                    type="button"
                                    onClick={() => handleRetryPayment(batch.id)}
                                    disabled={retryingBatchId === batch.id}
                                    className="text-[#2563eb] hover:text-[#1d4ed8] text-sm font-semibold disabled:opacity-50"
                                  >
                                    {retryingBatchId === batch.id ? "Opening..." : "Retry Payment"}
                                  </button>
                                ) : (
                                  <span className="text-slate-300">—</span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activePage === "upload" && (
              <div id="upload-page" className="page-content page-transition max-w-7xl mx-auto">
                <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">Select Processing Tier</h2>
                    <p className="text-slate-500 mt-2">Choose the turnaround time that fits your needs.</p>
                  </div>
                  {hasRemainingCredits && (
                    <button
                      type="button"
                      onClick={() => openUploadForm(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.25)] hover:bg-[#1d4ed8]"
                    >
                      Upload Next Batch
                      <span className="text-[11px] font-medium text-[#dbeafe]">
                        ({remainingPages.toLocaleString()} pages left)
                      </span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="panel p-8 opacity-60 blur-[1px] pointer-events-none select-none">
                    <h3 className="text-xl font-bold text-slate-900">Economy</h3>
                    <p className="text-slate-500 text-sm mb-6">Coming soon</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-extrabold text-slate-900">$—</span>
                      <span className="text-slate-500 ml-2">/batch</span>
                    </div>
                    <ul className="space-y-4 mb-8 text-sm text-slate-600">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        — pages OR — files
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Standard quality check
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        CSV/Excel output
                      </li>
                    </ul>
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 px-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-400 hover:text-slate-900 transition-colors"
                    >
                      Unavailable
                    </button>
                  </div>

                  <div className="panel p-8 border-2 border-[#2563eb] shadow-2xl relative transform scale-105 z-10">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#2563eb] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Most Popular
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Standard</h3>
                    <p className="text-slate-500 text-sm mb-6">72 hours turnaround</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-extrabold text-slate-900">$799</span>
                      <span className="text-slate-500 ml-2">/batch</span>
                    </div>
                    <ul className="space-y-4 mb-8 text-sm text-slate-600">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#2563eb] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        2,000 pages OR 1k files
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#2563eb] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Premium quality check
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#2563eb] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Multiple formats (XML/JSON/CSV/Excel)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-[#2563eb] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        24/7 Support
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => handleSelectPlan("standard")}
                      className="w-full py-3 px-4 bg-[#2563eb] text-white font-semibold rounded-xl hover:bg-[#1d4ed8] shadow-[0_12px_24px_rgba(37,99,235,0.25)] transition-all"
                    >
                      Select Standard
                    </button>
                  </div>

                  <div className="panel p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-slate-900">Rush</h3>
                    <p className="text-slate-500 text-sm mb-6">12-24 hours</p>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-extrabold text-slate-900">$1,099</span>
                      <span className="text-slate-500 ml-2">/batch</span>
                    </div>
                    <ul className="space-y-4 mb-8 text-sm text-slate-600">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        2,000 pages OR 1k files
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Priority Processing
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Premium quality check
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Multiple formats (XML/JSON/CSV/Excel)
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        24/7 Support
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => handleSelectPlan("rush")}
                      className="w-full py-3 px-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-400 hover:text-slate-900 transition-colors"
                    >
                      Select Plan
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-8 text-center text-white shadow-lg mb-12">
                  <h3 className="text-xl font-bold mb-2">Need High Volume Processing?</h3>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    For enterprise clients processing more than — batches monthly, we offer custom SLAs,
                    dedicated account managers, and volume discounts.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsQuotaModalOpen(true)}
                    className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Request Custom Quote
                  </button>
                </div>

                {showUploadForm && (
                  <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div
                      id="upload-form"
                      ref={uploadFormRef}
                      className="panel w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 animate-fade-in"
                    >
                      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">Batch Details</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            Tier selected: {titleCase(selectedTier)}.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowUploadForm(false)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Close
                        </button>
                      </div>
                    <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Batch Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition-all"
                            placeholder="e.g., Q1 2025 Invoices"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Document Type
                          </label>
                          <div className="relative">
                            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none appearance-none bg-white">
                              <option>Select document type...</option>
                              <option>Financial Statements</option>
                              <option>Invoices</option>
                              <option>Legal Contracts</option>
                              <option>Healthcare Records</option>
                              <option>Tax Documents</option>
                              <option>Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Purpose / Use Case
                        </label>
                        <textarea
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none h-24 resize-none"
                          placeholder="Describe the end goal for this data extraction..."
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Upload Files
                        </label>

                        {showOverQuota && (
                          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Volume Limit Exceeded</h3>
                                <p className="text-sm text-red-700 mt-1">
                                  Batch limit is {uploadLimitPages.toLocaleString()} pages OR{" "}
                                  {uploadLimitFiles.toLocaleString()} files.{" "}
                                  <button
                                    type="button"
                                    onClick={() => setIsQuotaModalOpen(true)}
                                    className="font-medium underline hover:text-red-900"
                                  >
                                    Request custom pricing
                                  </button>
                                  .
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mb-4 bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                          <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <div className="text-sm text-blue-800">
                            <strong>Limit:</strong> {uploadLimitPages.toLocaleString()} pages OR{" "}
                            {uploadLimitFiles.toLocaleString()} files per batch. Need more?{" "}
                            <button
                              type="button"
                              onClick={() => setIsQuotaModalOpen(true)}
                              className="underline hover:text-blue-900"
                            >
                              Enterprise options
                            </button>
                            .
                          </div>
                        </div>

                        <div
                          className={`upload-area group mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl hover:border-[#3b82f6] hover:bg-[#eff6ff] transition-all cursor-pointer ${uploadAreaState}`}
                          onClick={() => fileInputRef.current?.click()}
                          onDrop={handleDropFiles}
                          onDragOver={handleDragOverFiles}
                          onDragLeave={handleDragLeaveFiles}
                          role="button"
                          tabIndex={0}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleFiles}
                          />
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-slate-400 group-hover:text-[#3b82f6] transition-colors"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-slate-600 justify-center">
                              <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#2563eb] hover:text-[#1d4ed8] focus-within:outline-none">
                                Upload files
                              </span>
                              <p className="pl-1">{uploadPrompt}</p>
                            </div>
                            <p className="text-xs text-slate-500">PDF, DOC, PNG, JPG up to 2GB</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6] transition-colors"
                        >
                          Submit Processing Batch
                        </button>
                      </div>
                    </form>
                  </div>
                  </div>
                )}
              </div>
            )}

            {activePage === "batches" && (
              <div id="batches-page" className="page-content page-transition max-w-7xl mx-auto">
                <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-900">Batch History</h2>
                  {hasRemainingCredits ? (
                    <button
                      type="button"
                      onClick={() => openUploadForm(true)}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8]"
                    >
                      Upload Next Batch
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActivePage("upload")}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Purchase More Credits
                    </button>
                  )}
                </div>

                <div className="panel overflow-hidden mb-8">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/80 text-[11px] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4">Batch Name</th>
                          <th className="px-6 py-4">Uploaded</th>
                          <th className="px-6 py-4">Credits Used</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Delivery</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {batches.length === 0 && (
                          <tr>
                            <td className="px-6 py-6 text-sm text-slate-400" colSpan={6}>
                              —
                            </td>
                          </tr>
                        )}
                        {batches.map((batch) => {
                          const inputs = batch.uploads?.filter((file) => file.role === "input") || []
                          const pages = inputs.reduce(
                            (sum, file) => sum + (typeof file.page_count === "number" ? file.page_count : 0),
                            0
                          )
                          const meta = statusMeta(batch.status)
                          const hasOutput = batch.uploads?.some((file) => file.role === "output")
                          return (
                            <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-slate-900">{batch.id.slice(0, 8)}</div>
                                <div className="text-xs text-slate-500">
                                  {titleCase(profile?.tier ?? selectedTier)}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500">
                                {formatDate(batch.created_at)}
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500">
                                {pages ? `${pages.toLocaleString()} pgs` : "—"}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${meta.className}`}
                                >
                                  {meta.label}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500">
                                {formatDate(batch.delivered_at)}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {batch.status === "delivered" && hasOutput ? (
                                  <div className="inline-flex flex-col items-end">
                                    <button
                                      type="button"
                                      onClick={() => handleDownload(batch.id)}
                                      disabled={downloadingBatchId === batch.id}
                                      title="Downloads all output files for this batch"
                                      className="text-[#2563eb] hover:text-[#1d4ed8] font-semibold text-sm disabled:opacity-50"
                                    >
                                      {downloadingBatchId === batch.id ? "Loading..." : "Download"}
                                    </button>
                                    <span className="text-[10px] text-slate-400">All files</span>
                                  </div>
                                ) : batch.status === "uploaded" || batch.status === "created" ? (
                                  <button
                                    type="button"
                                    onClick={() => handleRetryPayment(batch.id)}
                                    disabled={retryingBatchId === batch.id}
                                    className="text-[#2563eb] hover:text-[#1d4ed8] font-semibold text-sm disabled:opacity-50"
                                  >
                                    {retryingBatchId === batch.id ? "Opening..." : "Retry Payment"}
                                  </button>
                                ) : (
                                  <span className="text-slate-300">—</span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="panel p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Credit Usage</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700 font-medium">
                      {pagesThisMonth.toLocaleString()} pages used
                    </span>
                    <span className="text-slate-500 text-sm">of {LIMIT_PAGES.toLocaleString()} available</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
                    <div
                      className="bg-[#2563eb] h-3 rounded-full"
                      style={{ width: `${Math.min((pagesThisMonth / LIMIT_PAGES) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                    You have <strong className="text-[#2563eb]">{Math.max(LIMIT_PAGES - pagesThisMonth, 0).toLocaleString()}</strong> pages (or{" "}
                    <strong className="text-[#2563eb]">{Math.max(LIMIT_FILES - filesThisMonth, 0).toLocaleString()}</strong> files) remaining in your current allocation.
                  </div>
                </div>
              </div>
            )}

            {activePage === "billing" && (
              <div id="billing-page" className="page-content page-transition max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Billing & Credits</h2>
                  <button
                    type="button"
                    onClick={() => setActivePage("upload")}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm"
                  >
                    Purchase Credits
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="panel-dark text-white rounded-xl p-6 shadow-md">
                    <div className="text-slate-300 text-sm font-medium mb-1">Current Balance</div>
                    <div className="text-4xl font-bold mb-2">
                      {availableCredits.toLocaleString()}
                    </div>
                    <div className="text-slate-400 text-sm">pages remaining</div>
                  </div>
                  <div className="panel p-6">
                    <div className="text-slate-500 text-sm font-medium mb-1">Total Lifetime Spend</div>
                    <div className="text-4xl font-bold text-slate-900 mb-2">—</div>
                    <div className="text-slate-500 text-sm">since —</div>
                  </div>
                </div>

                <div className="panel overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800">Purchase History</h3>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/80 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Plan</th>
                        <th className="px-6 py-4">Credits</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-6 py-6 text-sm text-slate-400" colSpan={5}>
                          —
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activePage === "profile" && (
              <div id="profile-page" className="page-content page-transition max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Profile Settings</h2>

                <div className="panel p-8 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.fullName}
                        onChange={(event) => setProfileForm((prev) => ({ ...prev, fullName: event.target.value }))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        disabled
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-slate-500 mt-1">Email changes are not enabled yet.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={profileForm.company}
                        onChange={(event) => setProfileForm((prev) => ({ ...prev, company: event.target.value }))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#3b82f6] outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end items-center gap-4">
                    {profileSaveMessage && (
                      <span
                        className={`text-sm ${
                          profileSaveMessage.type === "success" ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {profileSaveMessage.text}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={isSavingProfile}
                      className="bg-[#2563eb] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSavingProfile ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>

                <div className="panel p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Notifications</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-[#2563eb] border-slate-300 rounded" />
                      <span className="text-slate-700 text-sm">Email me when a batch is uploaded</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-[#2563eb] border-slate-300 rounded" />
                      <span className="text-slate-700 text-sm">Email me when processing is complete</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                      <input type="checkbox" className="h-4 w-4 text-[#2563eb] border-slate-300 rounded" />
                      <span className="text-slate-700 text-sm">Email me daily progress updates</span>
                    </label>
                  </div>
                </div>

                <div className="panel p-8 mt-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Session</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 font-medium">Sign Out</p>
                      <p className="text-slate-500 text-sm mt-1">End your current session safely.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="group flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-all"
                    >
                      <svg
                        className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePage === "faq" && (
              <div id="faq-page" className="page-content page-transition max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-slate-900">Help Center</h2>
                  <p className="text-slate-500 mt-2">Common questions about billing, processing, and security.</p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "How does the credit system work?",
                      body: "When you purchase a batch, you receive credits for — pages OR — files. Credits never expire and unused credits roll over.",
                    },
                    {
                      title: "Is my data secure?",
                      body: "Absolutely. We use bank-level 256-bit encryption. We are SOC 2 Type II compliant and data is automatically deleted 30 days after download.",
                    },
                    {
                      title: "Can I get a high-volume custom plan?",
                      body: "Yes. Use the \"Request Custom Quota\" button on the upload page for enterprise volume discounts and API access.",
                    },
                  ].map((item, index) => {
                    const isOpen = openFaqIndex === index
                    return (
                      <div key={item.title} className="panel-muted overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center bg-transparent hover:bg-slate-50"
                        >
                          <span className="font-semibold text-slate-900">{item.title}</span>
                          <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                            {item.body}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {isQuotaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="panel w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-900">Request Custom Quota</h2>
              <button
                type="button"
                onClick={() => setIsQuotaModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-8">
              <p className="text-slate-600 mb-6">
                Tell us about your volume needs. We&apos;ll provide a custom proposal within 24
                hours.
              </p>

              <form
                id="custom-quota-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  alert("Request sent successfully! Our team will contact you shortly.")
                  setIsQuotaModalOpen(false)
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    className="px-4 py-2 border border-slate-300 rounded-lg w-full"
                    placeholder="Company Name"
                    defaultValue={profileForm.company}
                    required
                  />
                  <input
                    type="text"
                    className="px-4 py-2 border border-slate-300 rounded-lg w-full"
                    placeholder="Contact Name"
                    defaultValue={profileForm.fullName}
                    required
                  />
                  <input
                    type="email"
                    className="px-4 py-2 border border-slate-300 rounded-lg w-full"
                    placeholder="Email Address"
                    defaultValue={profileForm.email}
                    required
                  />
                  <input
                    type="tel"
                    className="px-4 py-2 border border-slate-300 rounded-lg w-full"
                    placeholder="Phone"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="number"
                    className="px-4 py-2 border border-slate-300 rounded-lg w-full"
                    placeholder="Est. Pages per Month"
                    required
                  />
                  <input
                    type="number"
                    className="px-4 py-2 border border-slate-300 rounded-lg w-full"
                    placeholder="Est. Files per Month"
                    required
                  />
                </div>

                <select className="px-4 py-2 border border-slate-300 rounded-lg w-full bg-white" required>
                  <option value="">Upload Frequency...</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>

                <textarea
                  className="px-4 py-2 border border-slate-300 rounded-lg w-full h-24 resize-none"
                  placeholder="Special Requirements (API access, dedicated support, etc.)"
                ></textarea>

                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                  <strong>Next Steps:</strong> You will receive a custom pricing proposal via email within 24 hours.
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsQuotaModalOpen(false)}
                    className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#2563eb] text-white font-medium rounded-lg hover:bg-[#1d4ed8]"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
