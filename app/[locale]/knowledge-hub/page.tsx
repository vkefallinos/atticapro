import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { locales, type Locale } from '@/i18n';
import { getAllArticles } from '@/lib/articles';
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
  const articles = getAllArticles();

  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={`/${locale}/knowledge-hub/${article.slug}`}>
            <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={article.coverImage}
                  alt={article.title[locale]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardContent className="pt-5">
                <Badge variant={article.category === 'insulation' ? 'secondary' : 'accent'}>
                  {article.category === 'insulation' ? tCommon('categoryInsulation') : tCommon('categoryPainting')}
                </Badge>
                <h2 className="mt-3 font-display text-lg font-semibold text-primary">{article.title[locale]}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{article.excerpt[locale]}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
