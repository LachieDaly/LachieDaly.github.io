# lachlandaly.com

Personal portfolio and blog website for Lachlan Daly — a software engineer based in Brisbane, Australia.

The site serves as a professional home: it showcases work experience and education, and hosts a blog covering software engineering, tooling, and things being built.

Live at: **[lachlandaly.com](https://lachlandaly.com)**

## Tech Stack

- **[Next.js](https://nextjs.org)** (App Router, static export)
- **[React](https://react.dev)** 19
- **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind CSS](https://tailwindcss.com)** v4 with Typography plugin
- **Markdown blog** powered by [remark](https://remark.js.org) and [gray-matter](https://github.com/jonschlinkert/gray-matter)
- Deployed to **[GitHub Pages](https://pages.github.com)** via GitHub Actions

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/               # Next.js App Router pages and layouts
  page.tsx         # Home page (portfolio / resume)
  layout.tsx       # Root layout with navigation and footer
  blog/
    page.tsx       # Blog listing
    [slug]/        # Individual blog post pages
content/
  blog/            # Markdown files for blog posts
lib/
  blog.ts          # Utilities for reading and parsing blog posts
public/            # Static assets
```

## Adding a Blog Post

Create a new `.md` file in `content/blog/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
description: "A short summary of the post."
---

Post content goes here.
```

## Deployment

The site is automatically built and deployed to GitHub Pages on every push to `main` via the workflow defined in `.github/workflows/nextjs.yml`.
