import { useEffect, useState } from 'react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/** Types out `text` character by character starting after `delay` ms. */
export function useTypewriter(text: string, speed = 35, delay = 0) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [output, setOutput] = useState(prefersReducedMotion ? text : '');
  const [done, setDone] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setOutput(text);
      setDone(true);
      return;
    }

    let index = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setOutput(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, delay, prefersReducedMotion]);

  return { output, done };
}
