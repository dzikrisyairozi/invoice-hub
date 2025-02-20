/* eslint-disable prettier/prettier */
'use client';

import {
  AddCircle as AddCircleIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  {
    name: 'Add Invoice',
    href: '/invoices/add',
    icon: AddCircleIcon,
  },
  {
    name: 'My Invoices',
    href: '/invoices/list',
    icon: DescriptionIcon,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DRAWER_WIDTH = 256;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex-shrink-0 bg-[#1C2434] text-white">
      <div className="flex items-center gap-2 p-4">
        <DescriptionIcon />
        <h1 className="text-xl font-semibold">InvoiceHub</h1>
      </div>

      <div className="px-4 py-2">
        <div className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </div>

        <nav className="mt-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`mb-1 flex items-center rounded-md px-2 py-2 text-sm transition-colors ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
