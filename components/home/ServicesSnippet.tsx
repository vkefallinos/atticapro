import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Droplets, PaintRoller, ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function ServicesSnippet({ locale }: { locale: string }) {
  const t = useTranslations('servicesSnippet');

  const services = [
    {
      href: `/${locale}/services/insulation`,
      icon: Droplets,
      title: t('insulationTitle'),
      description: t('insulationDesc'),
      tint: 'bg-terracotta/10 text-terracotta',
    },
    {
      href: `/${locale}/services/painting`,
      icon: PaintRoller,
      title: t('paintingTitle'),
      description: t('paintingDesc'),
      tint: 'bg-mustard/10 text-mustard-dark',
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-primary md:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link key={service.href} href={service.href}>
              <Card className="h-full border-2 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-md">
                <CardHeader>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${service.tint}`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 font-display text-xl font-semibold">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {t('learnMore')} <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
