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
import { TerminalWindow } from '@/components/TerminalWindow';
import { sectionCommands, skillGroups } from '@/data/content';

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

function keyify(label: string) {
  return label.toLowerCase().replace(/\s+/g, '-');
}

export function Skills() {
  return (
    <section id="skills" className="border-t border-border bg-card/20 py-20 sm:py-28">
      <div className="container">
        <SectionHeading command={sectionCommands.skills} title="Skills & Technologies" subtitle="Technologies I work with" />

        <Reveal index={0}>
          <TerminalWindow title="package.json" className="mx-auto max-w-3xl" bodyClassName="p-6 sm:p-8">
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
              {'{\n'}
              {skillGroups.map((group, gi) => (
                <div key={group.category} className="pl-4">
                  <span className="text-amber">&quot;{keyify(group.category)}&quot;</span>
                  <span className="text-muted-foreground">: [</span>
                  <div className="flex flex-wrap gap-2 py-2 pl-4">
                    {group.items.map((item) => {
                      const Icon = iconMap[item] ?? Coffee;
                      return (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 rounded border border-border bg-secondary/40 px-2.5 py-1 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {item}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-muted-foreground">]{gi < skillGroups.length - 1 ? ',' : ''}</span>
                </div>
              ))}
              {'}'}
            </pre>
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}
