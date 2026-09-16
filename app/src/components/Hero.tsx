import { ArrowRight, ChevronDown } from 'lucide-react';

import { TerminalWindow } from '@/components/TerminalWindow';
import { Button } from '@/components/ui/button';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useParallax } from '@/hooks/useParallax';
import { useTypewriter } from '@/hooks/useTypewriter';
import { tickerItems } from '@/data/content';
import { cn } from '@/lib/utils';

export function Hero() {
  const { output, done } = useTypewriter('Naren Viswanath', 45, 400);
  const imageRef = useParallax<HTMLImageElement>(0.08);
  const primaryBtnRef = useMagnetic<HTMLAnchorElement>();
  const secondaryBtnRef = useMagnetic<HTMLAnchorElement>();

  const loopedTicker = [...tickerItems, ...tickerItems];

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center pt-16">
      <div className="container">
        <TerminalWindow title="naren@engineering — zsh" className="mx-auto max-w-4xl" status={<StatusPill />}>
          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <Line prompt="whoami" />
              <p className="mb-6 mt-1.5 pl-5 font-display text-3xl font-bold leading-tight text-primary sm:text-4xl">
                {output}
                {!done && <span className="caret" aria-hidden="true" />}
              </p>

              <div className={cn('transition-opacity duration-500', done ? 'opacity-100' : 'opacity-0')}>
                <Line prompt="cat role.txt" />
                <p className="mb-6 mt-1.5 pl-5 text-foreground">Senior Engineering Manager</p>

                <Line prompt="cat about.txt" />
                <p className="mb-8 mt-1.5 max-w-[52ch] pl-5 leading-relaxed text-muted-foreground">
                  I specialize in AI/ML engineering, leading teams in developing cutting-edge solutions with a focus
                  on AI tools and enterprise Java applications.
                </p>

                <div className="flex flex-col gap-3 pl-5 sm:flex-row">
                  <Button asChild className="justify-start rounded-sm">
                    <a ref={primaryBtnRef} href="#projects" className="group">
                      <span className="text-muted-foreground">$</span>
                      <span>open ./projects</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" className="justify-start rounded-sm">
                    <a ref={secondaryBtnRef} href="#contact">
                      <span className="text-muted-foreground">$</span>
                      <span>./contact --send</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div
              className={cn(
                'hidden overflow-hidden rounded border border-border transition-opacity duration-500 sm:block sm:w-40',
                done ? 'opacity-100' : 'opacity-0',
              )}
            >
              <img
                ref={imageRef}
                src="/assets/images/hero-image.jpg"
                alt="Naren Viswanath - Senior Engineering Manager and AI/ML Expert"
                className="block h-full w-full object-cover will-change-transform"
                loading="lazy"
              />
            </div>
          </div>
        </TerminalWindow>
      </div>

      <div className="mt-10 overflow-hidden border-y border-border/70 bg-card/40 py-3" aria-hidden="true">
        <div className="flex w-max animate-ticker motion-reduce:animate-none">
          {loopedTicker.map((item, i) => (
            <span key={`${item}-${i}`} className="whitespace-nowrap px-6 font-mono text-xs text-muted-foreground">
              <span className="text-primary">[OK]</span> {item}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="mx-auto mt-6 hidden items-center gap-1.5 font-mono text-xs text-muted-foreground no-underline transition-colors hover:text-primary sm:flex"
      >
        scroll
        <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
      </a>
    </section>
  );
}

function Line({ prompt }: { prompt: string }) {
  return (
    <div className="font-mono text-sm text-muted-foreground">
      <span className="text-primary">$</span> {prompt}
    </div>
  );
}

function StatusPill() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      available
    </div>
  );
}
