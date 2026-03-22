import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Tell Next.js which slugs to pre-render at build time.
 * Required for dynamic routes when using `output: "export"`.
 */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/**
 * Generate per-page metadata (title + description) from the post frontmatter.
 */
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Lachlan Daly`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Return a 404 if no post matches the slug
  if (!post) notFound();

  // Convert the raw markdown content to HTML using remark
  const processedContent = await remark().use(remarkHtml).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="space-y-8">
      {/* Post header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <time
          dateTime={post.date}
          className="text-sm text-slate-400 dark:text-slate-500 block"
        >
          {new Date(post.date).toLocaleDateString("en-AU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      {/* Rendered markdown content */}
      <div
        className="prose prose-slate dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Back to blog link */}
      <footer className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/blog"
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          ← Back to blog
        </Link>
      </footer>
    </article>
  );
}
