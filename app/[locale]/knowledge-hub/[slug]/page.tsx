import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft } from 'lucide-react';

import { locales, type Locale } from '@/i18n';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import { Badge } from '@/components/ui/badge';

export function generateStaticParams() {
  const articles = getAllArticles();
  return locales.flatMap((locale) => articles.map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  setRequestLocale(locale);
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title[locale as Locale],
    description: article.excerpt[locale as Locale],
  };
}

export default async function ArticlePage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  setRequestLocale(locale);
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: 'knowledgeHubPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const readingMinutes = Math.max(1, Math.round(article.content.split(/\s+/).length / 200));

  return (
    <article className="container max-w-3xl py-16 md:py-24">
      <Link
        href={`/${locale}/knowledge-hub`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> {t('backToHub')}
      </Link>

      <div className="mt-6">
        <Badge variant={article.category === 'insulation' ? 'secondary' : 'accent'}>
          {article.category === 'insulation' ? tCommon('categoryInsulation') : tCommon('categoryPainting')}
        </Badge>
        <h1 className="mt-4 font-display text-3xl font-semibold text-primary md:text-4xl">{article.title[locale]}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {new Date(article.date).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          {' · '}
          {readingMinutes} {t('minRead')}
        </p>
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl">
        <Image src={article.coverImage} alt={article.title[locale]} fill className="object-cover" priority />
      </div>

      <div className="prose prose-slate mt-10 max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-primary prose-a:text-accent">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
