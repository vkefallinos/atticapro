import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { locales, type Locale } from '@/i18n';
import { portfolioItems } from '@/data/portfolio';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'portfolioPage' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function PortfolioPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return (
    <div className="container py-16 md:py-24">
      <PortfolioPageHeader locale={locale} />
      <PortfolioGrid items={portfolioItems} locale={locale} />
    </div>
  );
}

async function PortfolioPageHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'portfolioPage' });
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">{t('title')}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
    </div>
  );
}
