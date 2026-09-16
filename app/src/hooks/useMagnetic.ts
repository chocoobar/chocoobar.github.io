import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const el = ref.current;
    if (prefersReducedMotion || !supportsHover || !el) return;

    function onMouseMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    }

    function onMouseLeave() {
      if (el) el.style.transform = 'translate(0, 0)';
    }

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [prefersReducedMotion, strength]);

  return ref;
}
