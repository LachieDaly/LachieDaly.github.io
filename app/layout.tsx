import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lachlan Daly',
  description: 'Software Engineer based in Brisbane, Australia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 max-w-2xl mx-auto px-6 py-10"
      >
        <header className="flex items-center justify-between mb-16">
          <Link
            href="/"
            className="font-semibold tracking-tight hover:opacity-60 transition-opacity"
          >
            Lachlan Daly
          </Link>
          <nav className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Home
            </Link>
            <Link href="/projects" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Projects
            </Link>
            <Link href="/games/soundtrack" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Games
            </Link>
            <Link href="/blog" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Contact
            </Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-20 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-400 dark:text-slate-500">
          <span>© {new Date().getFullYear()} Lachlan Daly</span>
          <div className="flex gap-5">
            <a
              href="https://github.com/LachieDaly"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lachlan-daly-a70978217"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
