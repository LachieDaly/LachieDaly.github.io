'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/games', label: 'Games' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-0.5 sm:gap-1 text-sm -mx-2.5 sm:mx-0">
      {links.map(({ href, label }) => {
        const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`px-2.5 py-1.5 rounded-md transition-colors ${
              active
                ? 'text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 font-medium'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
