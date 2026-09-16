interface Props {
  progress: number;
}

export function ScrollProgressBar({ progress }: Props) {
  return (
    <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
  );
}
