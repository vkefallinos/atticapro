import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BookOpen } from 'lucide-react';

import { locales, type Locale } from '@/i18n';
import { getAllGuides } from '@/lib/guides';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'knowledgeHubPage' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function KnowledgeHubPage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'knowledgeHubPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const guides = getAllGuides();

  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/${locale}/knowledge-hub/${guide.slug}`}>
            <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={guide.coverImage}
                  alt={guide.title[locale]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
                  <BookOpen className="h-3 w-3" />
                  {t('chapterCount', { count: guide.chapters.length })}
                </span>
              </div>
              <CardContent className="pt-5">
                <Badge variant={guide.category === 'insulation' ? 'secondary' : 'accent'}>
                  {guide.category === 'insulation' ? tCommon('categoryInsulation') : tCommon('categoryPainting')}
                </Badge>
                <h2 className="mt-3 font-display text-lg font-semibold text-primary">{guide.title[locale]}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{guide.excerpt[locale]}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-accent">{tCommon('readGuide')}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
