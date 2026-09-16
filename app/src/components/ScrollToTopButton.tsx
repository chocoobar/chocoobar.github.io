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
        'fixed bottom-6 right-6 z-[1000] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_25px_hsl(var(--primary)/0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_hsl(var(--primary)/0.4)]',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2.5 opacity-0',
      )}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
