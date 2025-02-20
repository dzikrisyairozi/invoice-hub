import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { ClientProviders } from '@/providers/provider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InvoiceHub - Invoice Management System',
  description: 'Modern invoice management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientProviders>
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
