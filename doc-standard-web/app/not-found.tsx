import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">404</p>
      <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">Page not found</h1>
      <p className="mb-8 max-w-2xl text-base text-slate-600 md:text-lg">
        The URL may be incorrect, removed, or not available in this deployment.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Go to homepage
        </Link>
        <Link
          href="/integration"
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Browse integrations
        </Link>
      </div>
    </main>
  )
}
