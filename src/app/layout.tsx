import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Tracker',
  description: 'Manage your task',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang='en'
        className='scroll-smooth antialiased'
        suppressHydrationWarning
      >
        <body className={`${inter.className}`}>
          <main className='hd:w-[2024px] mx-auto'>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
