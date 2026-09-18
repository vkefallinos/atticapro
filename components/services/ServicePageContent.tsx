import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface ServicePageContentProps {
  locale: string;
  namespace: 'insulationPage' | 'paintingPage';
}

export function ServicePageContent({ locale, namespace }: ServicePageContentProps) {
  const t = useTranslations(namespace);
  const sections = t.raw('sections') as { title: string; text: string }[];
  const whyItems = t.raw('whyItems') as string[];

  return (
    <>
      <section className="hero-gradient border-b border-border">
        <div className="container py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-semibold text-primary md:text-5xl">{t('title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
            <Button asChild size="lg" variant="accent" className="mt-8">
              <Link href={`/${locale}/contact`}>{t('heroCta')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section, i) => (
            <Card key={section.title} className="border-2">
              <CardContent className="pt-6">
                <span className="font-hand text-3xl text-accent">{String(i + 1).padStart(2, '0')}</span>
                <CardTitle className="mt-1 font-display text-xl font-semibold">{section.title}</CardTitle>
                <p className="mt-3 text-muted-foreground">{section.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-semibold text-primary">{t('whyTitle')}</h2>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-2">
            {whyItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg bg-background p-4 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="accent">
              <Link href={`/${locale}/contact`}>{t('heroCta')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
