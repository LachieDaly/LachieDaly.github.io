import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-4xl mx-auto p-6">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold">Lachlan Daly</h1>
          <nav className="space-x-4 mt-2">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-12 pt-4 border-t text-sm text-gray-500">
          © {new Date().getFullYear()} Lachlan Daly
        </footer>
      </body>
    </html>
  );
}