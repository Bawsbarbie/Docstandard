import type { Metadata } from "next"

// Order confirmation — not indexable
export const metadata: Metadata = {
  title: "Order Confirmed | DocStandard",
  robots: { index: false, follow: false },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
