import {
  Activity,
  BarChart3,
  Boxes,
  Brain,
  Cloud,
  Coffee,
  Container,
  Github,
  GitBranch,
  GitCommitHorizontal,
  Leaf,
  type LucideIcon,
} from 'lucide-react';

import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { skillGroups } from '@/data/content';

const iconMap: Record<string, LucideIcon> = {
  Java: Coffee,
  'Spring Boot': Leaf,
  'Spring Cloud': Cloud,
  'Spring AI': Brain,
  Kubernetes: Boxes,
  ArgoCD: GitBranch,
  'GitHub Actions': Github,
  Git: GitCommitHorizontal,
  Prometheus: Activity,
  Grafana: BarChart3,
  Docker: Container,
};

export function Skills() {
  return (
    <section id="skills" className="bg-secondary/30 py-24 md:py-36">
      <div className="container">
        <SectionHeading index="04" title="Skills & Technologies" subtitle="Technologies I work with" />

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} index={i}>
              <div>
                <h3 className="mb-6 text-center font-display text-xl font-bold">{group.category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {group.items.map((item) => {
                    const Icon = iconMap[item] ?? Coffee;
                    return (
                      <div
                        key={item}
                        className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-4 py-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary"
                      >
                        <Icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-sm font-medium text-muted-foreground">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
