import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <a
      ref={ref}
      href="#home"
      aria-label="Naren Viswanath - home"
      className={cn('group flex items-center gap-2.5 font-display text-base font-bold text-foreground', className)}
    >
      <svg className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 44 44" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(206 94% 72%)" />
            <stop offset="1" stopColor="hsl(199 92% 62%)" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="41" height="41" rx="11" fill="none" stroke="url(#logoGradient)" strokeWidth="2" />
        <text x="22" y="29" fontFamily="Space Grotesk, Inter, sans-serif" fontWeight={700} fontSize="16" fill="url(#logoGradient)" textAnchor="middle">
          NV
        </text>
      </svg>
      <span className="hidden whitespace-nowrap sm:inline">Naren Viswanath</span>
    </a>
  );
}
