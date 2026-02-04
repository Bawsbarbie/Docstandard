import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Route } from "next"
import ReactMarkdown from "react-markdown"
import { getBlogPost, getBlogSlugs } from "@/lib/blog/fs"

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: "DocStandard Logistics Architect",
    },
    publisher: {
      "@type": "Organization",
      name: "DocStandard",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${post.slug}`,
    },
  }

  return (
    <main className="bg-white">
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schema)}
      </script>

      <section className="px-4 pt-16 pb-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400 font-semibold">
            Expert Perspective
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-slate-600 mt-6">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-3xl mx-auto space-y-10 text-[1.05rem] leading-relaxed text-slate-700">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-slate-900 mt-10">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-slate-900 mt-8">{children}</h3>
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
              p: ({ children }) => <p className="mt-4">{children}</p>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </section>
    </main>
  )
}
