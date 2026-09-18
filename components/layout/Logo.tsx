import { PaintRoller } from 'lucide-react';

import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2 font-display text-lg font-semibold text-primary', className)}>
      <span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_2px_0_0_hsl(var(--accent)/0.5)]">
        <PaintRoller className="h-5 w-5" strokeWidth={2.5} />
      </span>
      Attica<span className="text-accent">Pro</span>
    </span>
  );
}
