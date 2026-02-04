import Link from "next/link"
import { getAllBlogPosts } from "@/lib/blog/fs"

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts()
  return (
    <main className="bg-white">
      <section className="px-4 pt-16 pb-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400 font-semibold">
            DocStandard Editorial
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">
            Expert Perspective
          </h1>
          <p className="text-lg text-slate-600 mt-4">
            Expert analysis and technical guidance for modern logistics teams.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto grid gap-6">
          {posts.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
              <p className="text-lg font-semibold text-slate-900">No posts published yet</p>
              <p className="text-sm text-slate-500 mt-2">
                New expert perspectives will appear here as they are published.
              </p>
            </div>
          )}
          {posts.map((post, index) => {
            const label = index % 2 === 0 ? "Operational Protocol" : "Authority Guide"
            return (
            <article
              key={post.slug}
              className="rounded-3xl border border-slate-200 bg-white p-6 hover:border-brand-300 transition"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="uppercase tracking-[0.3em] text-slate-400">{label}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
                <span>•</span>
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mt-3">
                <Link className="hover:text-brand-600" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-600 mt-3">{post.description}</p>
              <div className="mt-4">
                <Link className="text-sm font-semibold text-brand-600 hover:underline" href={`/blog/${post.slug}`}>
                  Read the analysis
                </Link>
              </div>
            </article>
          )})}
        </div>
      </section>
    </main>
  )
}
