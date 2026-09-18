import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { locales, type Locale } from '@/i18n';
import { ServicePageContent } from '@/components/services/ServicePageContent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'paintingPage' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function PaintingPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return <ServicePageContent locale={locale} namespace="paintingPage" />;
}
