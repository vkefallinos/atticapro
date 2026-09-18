'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { useUIStore } from '@/store/useUIStore';
import { Logo } from '@/components/layout/Logo';

export function MobileMenu() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const isOpen = useUIStore((s) => s.isMobileMenuOpen);
  const setOpen = useUIStore((s) => s.setMobileMenuOpen);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services/insulation`, label: t('insulation') },
    { href: `/${locale}/services/painting`, label: t('painting') },
    { href: `/${locale}/portfolio`, label: t('portfolio') },
    { href: `/${locale}/knowledge-hub`, label: t('knowledgeHub') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle asChild>
          <Logo />
        </SheetTitle>
        <nav className="mt-8 flex flex-col gap-1">
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
          <LocaleSwitcher />
          <SheetClose asChild>
            <Button asChild size="sm" variant="accent">
              <Link href={`/${locale}/contact`}>{t('getQuote')}</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
