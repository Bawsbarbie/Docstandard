import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Route } from "next"
import ReactMarkdown from "react-markdown"
import { getBlogPost, getBlogSlugs } from "@/lib/blog/fs"
import { HeaderBanner } from "@/components/blog/HeaderBanner"

const inferClusterId = (slug: string) => {
  const normalized = slug.toLowerCase()
  if (/(invoice|ap|ledger|payable|finance)/.test(normalized)) return "Finance"
  if (/(customs|license|permit|export|compliance|hs-code|classification)/.test(normalized)) return "Customs"
  if (/(shipping|freight|bill-of-lading|awb|airway|packing-list)/.test(normalized)) return "Shipping"
  if (/(integration|erp|tms|cargowise|netsuite|sap|quickbooks)/.test(normalized)) return "Integration"
  return "Logistics"
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  if (!post) return { title: "Not Found" }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) {
    notFound()
  }
  const clusterId = post.clusterId || inferClusterId(post.slug)
  const canonicalUrl = `https://docstandard.co/blog/${post.slug}`

  // Sanitize strings to prevent JSON breaking
  const sanitize = (str: string) => str.replace(/[\x00-\x1F\x7F]/g, "")
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: sanitize(post.title),
    description: sanitize(post.description),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: "DocStandard Logistics Architect",
    },
    publisher: {
      "@type": "Organization",
      name: "DocStandard",
      logo: {
        "@type": "ImageObject",
        url: "https://docstandard.co/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
  }

  const jsonLdString = JSON.stringify(schema)

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <section className="px-4 pt-12 pb-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <HeaderBanner title={post.title} clusterId={clusterId} />
          <div className="max-w-3xl">
            <p className="text-lg text-slate-600">{post.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto space-y-10 text-[1.05rem] leading-relaxed text-slate-700">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-2">{children}</h3>
              ),
              ul: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
              li: ({ children }) => <li className="text-slate-700">{children}</li>,
              a: ({ href, children }) => {
                const isInternal = href?.startsWith("/")
                if (isInternal && href) {
                  const internalHref = href as Route
                  return (
                    <Link className="text-brand-700 hover:underline" href={internalHref}>
                      {children}
                    </Link>
                  )
                }
                return (
                  <a className="text-brand-700 hover:underline" href={href} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                )
              },
              img: () => null,
              p: ({ children }) => <p className="mt-4 leading-relaxed">{children}</p>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </section>
    </main>
  )
}
