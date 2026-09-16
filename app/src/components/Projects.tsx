import { Bot, BrainCircuit, Github, ServerCog, SquareArrowOutUpRight, type LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { projects } from '@/data/content';

const projectIcons: LucideIcon[] = [Bot, ServerCog, BrainCircuit];

export function Projects() {
  return (
    <section id="projects" className="bg-background py-24 md:py-36">
      <div className="container">
        <SectionHeading index="03" title="My Projects" subtitle="Here are some of my recent works" />

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const Icon = projectIcons[i] ?? Bot;
            return (
              <Reveal key={project.title} index={i}>
                <Card className="group h-full overflow-hidden transition-all duration-300 ease-spring hover:-translate-y-1.5 hover:border-border/80 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">
                  <div className="relative h-48 overflow-hidden">
                    <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-background/60 px-2.5 py-1 font-display text-xs font-bold tracking-wide text-primary backdrop-blur">
                      0{i + 1}
                    </span>
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-sky-400 text-primary-foreground transition-transform duration-500 ease-spring group-hover:scale-105">
                      <Icon className="h-10 w-10" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-background/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <a
                        href={project.githubUrl}
                        aria-label={`View ${project.title} source on GitHub`}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 hover:scale-110 hover:bg-primary"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href={project.demoUrl}
                        aria-label={`View ${project.title} live demo`}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 hover:scale-110 hover:bg-primary"
                      >
                        <SquareArrowOutUpRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2.5 font-display text-xl font-bold">{project.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
