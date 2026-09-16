import { Reveal } from '@/components/Reveal';

interface Props {
  command: string;
  title: string;
  subtitle: string;
}

export function SectionHeading({ command, title, subtitle }: Props) {
  return (
    <div className="mb-14">
      <Reveal index={0}>
        <div className="mb-2 font-mono text-sm text-muted-foreground">
          <span className="text-primary">$</span> {command}
        </div>
      </Reveal>
      <Reveal index={1}>
        <h2 className="mb-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-primary/70">## </span>
          {title}
        </h2>
      </Reveal>
      <Reveal index={2}>
        <p className="pl-0.5 text-muted-foreground">{subtitle}</p>
      </Reveal>
    </div>
  );
}
