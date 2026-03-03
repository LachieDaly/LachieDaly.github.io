import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto px-6 py-10">
        <header className="mb-12 border-b pb-6">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
              Lachlan Daly
            </h1>
          </Link>
          <nav className="flex gap-5 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Contact</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-16 pt-6 border-t text-sm text-gray-400">
          © {new Date().getFullYear()} Lachlan Daly
        </footer>
      </body>
    </html>
  );
}