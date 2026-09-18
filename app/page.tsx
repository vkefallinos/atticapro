'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { defaultLocale } from '@/i18n';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <noscript>
      <Link href={`/${defaultLocale}`}>Continue to AtticaPro</Link>
    </noscript>
  );
}
