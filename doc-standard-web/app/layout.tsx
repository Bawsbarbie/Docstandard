import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  title: "DocStandard - Document Processing & Data Extraction Platform",
  description: "Transform unstructured business documents into clean, structured data. PDF, Excel, CSV extraction and normalization for finance, customs, manufacturing, and logistics.",
  keywords: [
    "document processing",
    "data extraction",
    "PDF processing",
    "invoice processing",
    "document data extraction",
    "automated data entry",
    "OCR data extraction",
    "document normalization",
    "financial document processing",
    "customs document processing",
    "freight bill processing",
    "ERP integration",
    "accounting automation",
    "AP automation",
    "EDI normalization",
    "CargoWise integration",
    "NetSuite integration",
    "SAP integration",
    "QuickBooks integration"
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KJH3L9TG');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJH3L9TG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}
