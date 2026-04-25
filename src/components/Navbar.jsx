'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Timeline',
    href: '/about',
  },
  {
    label: 'Stats',
    href: '/stats',
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="px-4 pt-2">
      <nav className="navbar border border-base-300 bg-base-200 px-6">
        <div className="flex-1">
          <Link href="/" className="text-3xl font-semibold underline decoration-2 underline-offset-2">
            KeenKeeper
          </Link>
        </div>

        <div className="flex-none border border-dashed border-base-300 p-1">
          <ul className="menu menu-horizontal gap-1 p-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}