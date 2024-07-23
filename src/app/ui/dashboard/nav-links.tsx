'use client';

import {
  HomeIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Tasks',
    href: '/dashboard/tasks',
    icon: ClipboardDocumentListIcon,
  },
  {
    name: 'Time tracks',
    href: '/dashboard/time-tracks',
    icon: ClockIcon,
  },
  {
    name: 'Account',
    href: '/dashboard/account',
    icon: UserCircleIcon,
  }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          pathname === link.href
          ? <span
            key={link.name}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium focus-visible:outline-violet-500 md:flex-none md:justify-start md:p-2 md:px-3 bgc-violet-100 text-violet-600"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </span>
          : <Link
          key={link.name}
          href={link.href}
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium focus-visible:outline-violet-500 hover:text-violet-600 hover:underline md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <LinkIcon className="w-6" />
          <p className="hidden md:block">{link.name}</p>
        </Link>
        );
      })}
    </>
  );
}