import type { ReactNode } from 'react';
import { Inter, Fraunces, Caveat } from 'next/font/google';

import { defaultLocale } from '@/i18n';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'greek'], variable: '--font-inter' });
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', weight: ['600', '700'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale} className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased pb-16 md:pb-0">{children}</body>
    </html>
  );
}
