import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  title: string;
  status?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

export function TerminalWindow({ title, status, className, bodyClassName, children }: Props) {
  return (
    <div className={cn('overflow-hidden rounded-md border border-border bg-card shadow-[0_0_0_1px_rgba(0,0,0,0.2)]', className)}>
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-4 py-2.5">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">{title}</span>
        </div>
        {status}
      </div>
      <div className={cn('p-5 sm:p-7', bodyClassName)}>{children}</div>
    </div>
  );
}
