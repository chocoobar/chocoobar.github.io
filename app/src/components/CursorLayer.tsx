import { useCustomCursor } from '@/hooks/useCustomCursor';

export function CursorLayer() {
  const { dotRef, ringRef } = useCustomCursor();

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
