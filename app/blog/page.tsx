import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Lachlan Daly",
  description: "Thoughts on software engineering, tooling, and things I'm building.",
};

export default function BlogPage() {
  // getAllPosts reads markdown files at build time and returns them sorted newest-first
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Blog</h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Thoughts on software engineering, tooling, and things I&apos;m building.
        </p>
      </section>

      <section>
        {posts.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No posts yet. Check back soon.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article>
                    {/* Post title */}
                    <h2 className="font-semibold text-lg group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors mb-1">
                      {post.title}
                    </h2>

                    {/* Formatted date — append T00:00:00 so YYYY-MM-DD is treated as local time */}
                    <time
                      dateTime={post.date}
                      className="text-xs text-slate-400 dark:text-slate-500 mb-2 block"
                    >
                      {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>

                    {/* Short description / excerpt */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {post.description}
                    </p>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
