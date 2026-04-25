'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clockIcon from '../../assets/Clock.png';
import homeIcon from '../../assets/home.png';
import statsIcon from '../../assets/stats.png';

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: homeIcon,
  },
  {
    label: 'Timeline',
    href: '/about',
    icon: clockIcon,
  },
  {
    label: 'Stats',
    href: '/stats',
    icon: statsIcon,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="px-4 pt-2">
      <nav className="navbar border border-base-300 bg-base-200 px-6">
        <div className="flex-1">
          <Link href="/" className="text-3xl font-bold leading-none no-underline">
            <span className="text-slate-800">Keen</span>
            <span className="text-emerald-900">Keeper</span>
          </Link>
        </div>

        <div className="flex-none border border-dashed border-base-300 p-1">
          <ul className="menu menu-horizontal gap-1 p-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    className={`btn btn-sm ${
                      isActive ? 'border-0 bg-[#244D3F] text-white hover:bg-[#1d3e33]' : 'btn-ghost text-[#244D3F] hover:bg-[#244D3F]/10'
                    }`}
                    href={item.href}
                  >
                    <Image src={item.icon} alt="" width={18} height={18} aria-hidden="true" />
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