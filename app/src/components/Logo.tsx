import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <a
      ref={ref}
      href="#home"
      aria-label="Naren Viswanath - home"
      className={cn('group flex items-center gap-2.5 font-mono text-sm font-semibold text-foreground', className)}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-primary/50 text-primary transition-colors duration-200 group-hover:bg-primary/10">
        <span aria-hidden="true">&gt;_</span>
      </span>
      <span className="hidden whitespace-nowrap sm:inline">
        naren<span className="text-primary">@</span>viswanath
      </span>
    </a>
  );
}
