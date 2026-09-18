'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import type { Locale } from '@/i18n';
import type { PortfolioCategory, PortfolioItem } from '@/data/portfolio';
import { BeforeAfterSlider } from '@/components/portfolio/BeforeAfterSlider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Filter = 'all' | PortfolioCategory;

export function PortfolioGrid({ items, locale }: { items: PortfolioItem[]; locale: Locale }) {
  const t = useTranslations('portfolioPage');
  const tCommon = useTranslations('common');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = filter === 'all' ? items : items.filter((item) => item.category === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('filterAll') },
    { key: 'insulation', label: t('filterInsulation') },
    { key: 'painting', label: t('filterPainting') },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <Button
            key={f.key}
            size="sm"
            variant={filter === f.key ? 'accent' : 'outline'}
            onClick={() => setFilter(f.key)}
            className={cn('rounded-full')}
          >
            {f.label}
          </Button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div key={item.id}>
            <BeforeAfterSlider
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              alt={item.title[locale]}
              beforeLabel={tCommon('before')}
              afterLabel={tCommon('after')}
            />
            <p className="mt-2 text-center text-xs text-muted-foreground">{t('dragHint')}</p>
            <div className="mt-2">
              <Badge variant={item.category === 'insulation' ? 'secondary' : 'accent'}>
                {item.category === 'insulation' ? tCommon('categoryInsulation') : tCommon('categoryPainting')}
              </Badge>
              <h3 className="mt-2 font-semibold text-primary">{item.title[locale]}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.description[locale]}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
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
  );
}
