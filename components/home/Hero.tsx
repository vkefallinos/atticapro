import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { assetPath } from '@/lib/site-config';

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations('hero');

  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="paper-grain pointer-events-none absolute inset-0" />
      <div className="container relative grid gap-16 py-16 md:grid-cols-2 md:py-24 items-center">
        <div>
          <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            {t('eyebrow')}
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-primary md:text-5xl">
            {t.rich('title', {
              mark: (chunks) => <span className="mark-highlight">{chunks}</span>,
            })}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{t('subtitle')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href={`/${locale}/contact`}>
                {t('ctaPrimary')} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${locale}/portfolio`}>{t('ctaSecondary')}</Link>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-dashed border-border pt-8">
            <div>
              <dt className="font-hand text-4xl text-accent">12+</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{t('statYears')}</dd>
            </div>
            <div>
              <dt className="font-hand text-4xl text-accent">300+</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{t('statProjects')}</dd>
            </div>
            <div>
              <dt className="font-hand text-4xl text-accent">10</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{t('statWarranty')}</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[6/5] w-full -rotate-2 rounded-lg border-4 border-white bg-white shadow-2xl">
            <div className="relative h-full w-full overflow-hidden rounded-sm">
              <Image
                src={assetPath('/images/hero/hero-illustration.svg')}
                alt="Επαγγελματίας βάφει τοίχο με ρολό ενώ ετοιμάζεται μόνωση"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <span className="tape -top-3 left-8 -rotate-6" />
            <span className="tape -top-3 right-8 rotate-3" />
          </div>

          <div className="absolute -bottom-6 -right-4 flex h-24 w-24 flex-col rotate-6 items-center justify-center gap-0.5 rounded-full border-2 border-dashed border-accent bg-background text-center shadow-lg sm:h-28 sm:w-28">
            <span className="font-hand text-2xl leading-none text-accent">{t('badgeNumber')}</span>
            <span className="px-3 text-[11px] font-medium leading-tight text-muted-foreground">
              {t('badgeLabel')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
