import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import type { Locale } from '@/i18n';
import { getFeaturedPortfolioItems } from '@/data/portfolio';
import { BeforeAfterSlider } from '@/components/portfolio/BeforeAfterSlider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function RecentWork({ locale }: { locale: Locale }) {
  const t = useTranslations('recentWork');
  const tCommon = useTranslations('common');
  const items = getFeaturedPortfolioItems(3);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">{t('title')}</h2>
            <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/${locale}/portfolio`}>
              {t('viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.id} className={i % 2 === 0 ? 'md:-rotate-1' : 'md:rotate-1.5'}>
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                alt={item.title[locale]}
                beforeLabel={tCommon('before')}
                afterLabel={tCommon('after')}
              />
              <div className="mt-4">
                <Badge variant={item.category === 'insulation' ? 'secondary' : 'accent'}>
                  {item.category === 'insulation' ? tCommon('categoryInsulation') : tCommon('categoryPainting')}
                </Badge>
                <h3 className="mt-2 font-semibold text-primary">{item.title[locale]}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description[locale]}</p>
                <Link
                  href={`/${locale}/knowledge-hub/${item.relatedArticle}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  {tCommon('readGuide')} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
