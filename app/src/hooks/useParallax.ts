import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useParallax<T extends HTMLElement>(factor = 0.12) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const section = el.closest('section');
    let ticking = false;

    function update() {
      const sectionHeight = section instanceof HTMLElement ? section.offsetHeight : window.innerHeight;
      const scrollTop = window.scrollY;
      if (el && scrollTop < sectionHeight) {
        el.style.transform = `translateY(${scrollTop * factor}px)`;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [factor, prefersReducedMotion]);

  return ref;
}
