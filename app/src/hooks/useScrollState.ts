import { useEffect, useState } from 'react';

interface ScrollState {
  scrolled: boolean;
  progress: number;
  activeId: string;
  showBackToTop: boolean;
}

export function useScrollState(sectionIds: readonly string[]): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrolled: false,
    progress: 0,
    activeId: sectionIds[0] ?? '',
    showBackToTop: false,
  });

  useEffect(() => {
    let ticking = false;

    function computeActiveId(fallback: string): string {
      const scrollPos = window.scrollY + 100;
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos <= bottom) {
          return id;
        }
      }
      return fallback;
    }

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

      setState((prev) => ({
        scrolled: scrollTop > 50,
        progress,
        activeId: computeActiveId(prev.activeId),
        showBackToTop: scrollTop > 300,
      }));
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds]);

  return state;
}
