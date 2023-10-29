import './globals.css';
import './normalize.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--inter-font',
});

export const metadata: Metadata = {
  title: 'Kaban',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <div className="modals" />
      </body>
    </html>
  );
}
