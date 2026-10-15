# lachlandaly.com

Personal portfolio website for Lachlan Daly — a software engineer based in Brisbane, Australia.

The site serves as a professional home: it showcases work experience and education and a few games and side projects.

Live at: **[lachlandaly.com](https://lachlandaly.com)**

## Tech Stack

- **[Next.js](https://nextjs.org)** (App Router, static export)
- **[React](https://react.dev)** 19
- **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind CSS](https://tailwindcss.com)** v4
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
public/            # Static assets
```

## Deployment

The site is automatically built and deployed to GitHub Pages on every push to `main` via the workflow defined in `.github/workflows/nextjs.yml`.
