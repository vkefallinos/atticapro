import { useTranslations } from 'next-intl';

const NUMBER_STYLES = [
  'bg-terracotta text-white',
  'bg-mustard text-white',
  'bg-primary text-white',
  'bg-terracotta-dark text-white',
];

export function ProcessSteps() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as { title: string; text: string }[];

  return (
    <section className="border-y border-border bg-secondary/60 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-display text-lg italic text-accent">{t('eyebrow')}</span>
          <h2 className="mt-1 font-display text-3xl font-semibold text-primary md:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
        </div>

        <ol className="mx-auto mt-14 grid max-w-5xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative pl-2">
              <span
                className={`font-display flex h-11 w-11 items-center justify-center rounded-full text-lg font-semibold ${NUMBER_STYLES[i % NUMBER_STYLES.length]}`}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
