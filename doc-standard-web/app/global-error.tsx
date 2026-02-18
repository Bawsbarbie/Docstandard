"use client"

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-6">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight">Application error</h1>
            <p className="mt-3 text-slate-600">
              The app ran into an unexpected error. Please retry.
            </p>
            <button
              className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={reset}
              type="button"
            >
              Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
