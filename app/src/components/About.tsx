import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { useCountUp } from '@/hooks/useCountUp';
import { sectionCommands, stats } from '@/data/content';

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="flex items-baseline justify-between border-b border-border/70 py-3 font-mono text-sm last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-lg font-bold text-primary">
        <span ref={ref}>{current}</span>
        {suffix}
      </span>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="border-t border-border py-20 sm:py-28">
      <div className="container">
        <SectionHeading command={sectionCommands.about} title="About Me" subtitle="Get to know me better" />

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <Reveal index={0}>
            <div className="max-w-[68ch] space-y-5 leading-relaxed text-muted-foreground">
              <p>
                I'm a Senior Engineering Manager with deep expertise in AI/ML technologies and enterprise Java
                applications. I specialize in leading teams that build innovative AI tools and scalable solutions
                using cutting-edge technologies.
              </p>
              <p>
                My expertise spans across modern AI platforms like{' '}
                <span className="text-foreground">GitHub Copilot</span>,{' '}
                <span className="text-foreground">Claude</span>, and <span className="text-foreground">Cursor</span>,
                as well as traditional enterprise technologies like Java and Spring Boot. I'm passionate about
                leveraging AI to solve complex engineering challenges and improve developer productivity.
              </p>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="rounded-md border border-border bg-card p-5">
              <div className="mb-1 font-mono text-xs text-muted-foreground">stats.log</div>
              {stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
