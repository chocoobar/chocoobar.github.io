import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { experience, sectionCommands } from '@/data/content';

export function Experience() {
  return (
    <section id="experience" className="border-t border-border bg-card/20 py-20 sm:py-28">
      <div className="container">
        <SectionHeading command={sectionCommands.experience} title="Work Experience" subtitle="My Professional Journey" />

        <div className="mx-auto max-w-3xl space-y-8">
          {experience.map((item, i) => (
            <Reveal key={item.commit} index={i}>
              <div className="rounded-md border border-border bg-card p-5 font-mono text-sm sm:p-6">
                <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border/70 pb-3">
                  <span className="text-amber">commit {item.commit}</span>
                  <span className="text-muted-foreground/60">·</span>
                  <span className="text-muted-foreground">{item.duration}</span>
                </div>
                <div className="mb-1 text-muted-foreground">
                  Author: <span className="text-foreground">{item.company}</span>
                </div>
                <div className="mb-4 text-muted-foreground">
                  Role: <span className="text-primary">{item.role}</span>
                </div>
                <ul className="space-y-2 pl-4">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="text-foreground/90 before:mr-2 before:text-primary before:content-['+']">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
