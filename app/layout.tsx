import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Nav from './nav';
import ThemeToggle from './theme-toggle';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Lachlan Daly',
    template: '%s | Lachlan Daly',
  },
  description: 'Software Engineer based in Brisbane, Australia.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

// Runs before first paint so there's no flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800/70">
          <div className="max-w-2xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <Link
              href="/"
              className="font-semibold tracking-tight hover:opacity-60 transition-opacity shrink-0"
            >
              Lachlan Daly
            </Link>
            <div className="flex items-center gap-1 sm:gap-2">
              <Nav />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="w-full max-w-2xl mx-auto px-6 pt-12 pb-10 flex-1">{children}</main>

        <footer className="border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-slate-400 dark:text-slate-500">
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
          </div>
        </footer>
      </body>
    </html>
  );
}
