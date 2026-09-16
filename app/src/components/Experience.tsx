import { ArrowRight } from 'lucide-react';

import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { experience } from '@/data/content';
import { cn } from '@/lib/utils';

export function Experience() {
  return (
    <section id="experience" className="bg-secondary/30 py-24 md:py-36">
      <div className="container">
        <SectionHeading index="02" title="Work Experience" subtitle="My Professional Journey" />

        <div className="mx-auto max-w-3xl border-l border-border">
          {experience.map((item, i) => (
            <Reveal key={`${item.company}-${item.duration}`} index={i}>
              <div className={cn('relative pl-8 md:pl-10', i === experience.length - 1 ? '' : 'pb-12')}>
                <span className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold">{item.company}</h3>
                  <p className="text-sm font-semibold tracking-wide text-muted-foreground">{item.duration}</p>
                </div>
                <p className="mb-4 font-medium text-primary">{item.role}</p>
                <ul className="space-y-2.5">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-2 text-muted-foreground">
                      <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{achievement}</span>
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
