import { Reveal } from '@/components/Reveal';

interface Props {
  index: string;
  title: string;
  subtitle: string;
}

export function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <div className="mb-16 text-center">
      <Reveal index={0}>
        <span className="mb-3 block font-display text-sm font-semibold tracking-[0.18em] text-primary">{index}</span>
      </Reveal>
      <Reveal index={1}>
        <h2 className="mb-3 font-display text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight">{title}</h2>
      </Reveal>
      <Reveal index={2}>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </Reveal>
    </div>
  );
}
