import { ExternalLink, Github } from 'lucide-react';

import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { TerminalWindow } from '@/components/TerminalWindow';
import { projects, sectionCommands } from '@/data/content';

function slug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function Projects() {
  return (
    <section id="projects" className="border-t border-border py-20 sm:py-28">
      <div className="container">
        <SectionHeading command={sectionCommands.projects} title="My Projects" subtitle="Here are some of my recent works" />

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} index={i}>
              <TerminalWindow title={`${slug(project.title)}/README.md`} className="h-full" bodyClassName="flex h-full flex-col p-5">
                <h3 className="mb-2 font-display text-lg font-bold text-primary">{project.title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

                <div className="mb-4 font-mono text-xs text-muted-foreground">
                  tags:{' '}
                  <span className="text-foreground">
                    [{project.tech.map((t) => `"${t}"`).join(', ')}]
                  </span>
                </div>

                <div className="flex gap-4 border-t border-border pt-4 font-mono text-xs">
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Github className="h-3.5 w-3.5" />
                    source
                  </a>
                  <a
                    href={project.demoUrl}
                    className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    demo
                  </a>
                </div>
              </TerminalWindow>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
