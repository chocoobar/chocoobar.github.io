import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useParallax } from '@/hooks/useParallax';
import { marqueeItems } from '@/data/content';
import { cn } from '@/lib/utils';

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useParallax<HTMLImageElement>(0.12);
  const primaryBtnRef = useMagnetic<HTMLAnchorElement>();
  const secondaryBtnRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setTimeout(() => setLoaded(true), 120);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const loopedMarquee = [...marqueeItems, ...marqueeItems];

  return (
    <section id="home" className={cn('relative flex min-h-screen flex-col justify-center overflow-hidden pt-[70px]', loaded && 'hero-loaded')}>
      <div className="container">
        <p className="mb-7 inline-flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          <span className="h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.15)]" />
          Senior Engineering Manager
        </p>

        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 className="mb-6 font-display text-[clamp(2.75rem,7.5vw,5.75rem)] font-bold leading-[0.98] tracking-tight">
              <span className="reveal-line">
                <span className="reveal-inner">Hi, I&rsquo;m</span>
              </span>
              <span className="reveal-line">
                <span className="reveal-inner bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent">
                  Naren Viswanath
                </span>
              </span>
            </h1>

            <p className="mb-9 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
              I specialize in AI/ML engineering, leading teams in developing cutting-edge solutions with a focus on AI tools and enterprise Java applications.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <a ref={primaryBtnRef} href="#projects" className="group">
                  <span>View My Work</span>
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a ref={secondaryBtnRef} href="#contact">
                  <span>Get In Touch</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-[380px] rounded-[20px] bg-gradient-to-br from-primary/50 to-white/5 p-[3px]">
              <span className="absolute -left-2 -top-2 h-[22px] w-[22px] border-l-2 border-t-2 border-primary/85" aria-hidden="true" />
              <span className="absolute -bottom-2 -right-2 h-[22px] w-[22px] border-b-2 border-r-2 border-primary/85" aria-hidden="true" />
              <img
                ref={imageRef}
                src="/assets/images/hero-image.jpg"
                alt="Naren Viswanath - Senior Engineering Manager and AI/ML Expert"
                className="block w-full rounded-[18px] object-cover will-change-transform"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 overflow-hidden border-y border-border py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {loopedMarquee.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="relative whitespace-nowrap px-7 font-display text-base font-semibold uppercase tracking-[0.08em] text-muted-foreground/70 after:absolute after:-right-0.5 after:text-primary after:content-['•']"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-7 right-5 hidden flex-col items-center gap-2.5 text-muted-foreground no-underline sm:flex"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em]" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <span className="relative h-[46px] w-px overflow-hidden bg-border">
          <span className="absolute inset-x-0 -top-full h-full animate-scroll-cue bg-gradient-to-b from-transparent to-primary motion-reduce:animate-none" />
        </span>
      </a>
    </section>
  );
}
