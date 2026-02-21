import type { Metadata } from "next"

// Login/signup is not indexable — it's a transactional page.
// The openGraph title is set so share previews still look clean.
export const metadata: Metadata = {
  title: "Sign In | DocStandard",
  description: "Sign in to your DocStandard account to access the document processing dashboard.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Sign In | DocStandard",
    type: "website",
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
