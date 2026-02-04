import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DocStandard.co - Document Processing for Logistics",
  description: "High-scale document processing and logistics solutions",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
