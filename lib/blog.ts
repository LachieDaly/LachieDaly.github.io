import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
 * Read all markdown files from the blog directory, parse their frontmatter,
 * and return metadata sorted newest-first by date.
 */
export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts: PostMeta[] = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    return data as PostMeta;
  });

  // Sort posts by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Return the full post (frontmatter + raw markdown content) for a given slug.
 * Returns null if no matching post is found.
 */
export function getPostBySlug(slug: string): Post | null {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  for (const filename of files) {
    const filePath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if ((data as PostFrontmatter).slug === slug) {
      return { ...(data as PostFrontmatter), content };
    }
  }

  return null;
}

/**
 * Return all slugs — used by generateStaticParams to pre-render every post
 * page at build time.
 */
export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
