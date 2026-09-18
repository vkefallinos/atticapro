import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';

import { cn } from '@/lib/utils';

const AVATAR_COLORS = ['bg-terracotta text-white', 'bg-mustard text-white', 'bg-primary text-white'];
const ROTATIONS = ['md:-rotate-1', 'md:rotate-1', 'md:-rotate-1.5'];

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

export function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as { name: string; location: string; text: string; rating: number }[];

  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.name}
              className={cn(
                'relative rounded-lg border border-border bg-background p-6 pt-8 shadow-sm transition-transform hover:-translate-y-1 hover:rotate-0',
                ROTATIONS[i % ROTATIONS.length],
              )}
            >
              <Quote className="absolute right-5 top-5 h-10 w-10 text-muted/50" strokeWidth={1.5} />
              <div className="flex gap-0.5 text-mustard">
                {Array.from({ length: item.rating }).map((_, r) => (
                  <Star key={r} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground">&ldquo;{item.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-dashed border-border pt-4">
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold',
                    AVATAR_COLORS[i % AVATAR_COLORS.length],
                  )}
                >
                  {initials(item.name)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-primary">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
