import { Code2 } from 'lucide-react';

import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { useCountUp } from '@/hooks/useCountUp';
import { stats } from '@/data/content';

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div>
      <h3 className="font-display text-4xl font-bold text-primary">
        <span ref={ref}>{current}</span>
        {suffix}
      </h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="bg-background py-24 md:py-36">
      <div className="container">
        <SectionHeading index="01" title="About Me" subtitle="Get to know me better" />

        <div className="grid items-center gap-16 lg:grid-cols-[2fr_1fr]">
          <Reveal index={0}>
            <div>
              <p className="mb-6 text-lg leading-8 text-muted-foreground">
                I'm a Senior Engineering Manager with deep expertise in AI/ML technologies and enterprise Java
                applications. I specialize in leading teams that build innovative AI tools and scalable solutions
                using cutting-edge technologies.
              </p>
              <p className="mb-10 text-lg leading-8 text-muted-foreground">
                My expertise spans across modern AI platforms like GitHub Copilot, Claude, and Cursor, as well as
                traditional enterprise technologies like Java and Spring Boot. I'm passionate about leveraging AI to
                solve complex engineering challenges and improve developer productivity.
              </p>
              <div className="flex flex-wrap gap-10">
                {stats.map((stat) => (
                  <Stat key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="mx-auto flex h-60 w-60 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sky-400 text-primary-foreground">
              <Code2 className="h-16 w-16" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
