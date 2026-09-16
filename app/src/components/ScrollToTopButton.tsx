import { ChevronUp } from 'lucide-react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface Props {
  visible: boolean;
}

export function ScrollToTopButton({ visible }: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        'fixed bottom-6 right-6 z-[1000] flex h-11 w-11 items-center justify-center rounded-sm border border-primary/60 bg-card text-primary shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-primary hover:text-primary-foreground',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2.5 opacity-0',
      )}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
