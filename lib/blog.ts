import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

// Directory where blog post markdown files are stored
const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export interface PostMeta extends PostFrontmatter {
  // Extends frontmatter with any derived fields if needed in the future
}

export interface Post extends PostMeta {
  /** Raw markdown content (everything after the frontmatter block) */
  content: string;
}

/**
 * Validate that a parsed frontmatter object contains all required fields.
 * Throws a descriptive error (including the filename) if any field is missing.
 */
function validateFrontmatter(data: Record<string, unknown>, filename: string): PostFrontmatter {
  const required = ["title", "date", "description", "slug"] as const;
  for (const field of required) {
    if (!data[field] || typeof data[field] !== "string") {
      throw new Error(`Blog post "${filename}" is missing required frontmatter field: "${field}"`);
    }
  }
  return data as unknown as PostFrontmatter;
}

/**
 * Read all .md files from the blog directory, parse their frontmatter,
 * and return metadata sorted newest-first by date.
 */
export function getAllPosts(): PostMeta[] {
  // Only .md files — remark-html does not support MDX/JSX syntax
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts: PostMeta[] = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return validateFrontmatter(data, filename);
  });

  // Sort posts by date descending (newest first).
  // Append T00:00:00 so YYYY-MM-DD strings are parsed as local time, not UTC,
  // preventing off-by-one day errors depending on the build machine's timezone.
  return posts.sort(
    (a, b) =>
      new Date(`${b.date}T00:00:00`).getTime() - new Date(`${a.date}T00:00:00`).getTime()
  );
}

/**
 * Return the full post (frontmatter + raw markdown content) for a given slug.
 * Returns null if no matching post is found.
 *
 * Wrapped with React `cache` so that `generateMetadata` and the page component
 * share the same result within a single render pass — avoiding duplicate
 * filesystem reads for the same slug.
 */
export const getPostBySlug = cache(function getPostBySlug(slug: string): Post | null {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = validateFrontmatter(data, filename);

    if (frontmatter.slug === slug) {
      return { ...frontmatter, content };
    }
  }

  return null;
});

/**
 * Return all slugs — used by generateStaticParams to pre-render every post
 * page at build time.
 */
export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
