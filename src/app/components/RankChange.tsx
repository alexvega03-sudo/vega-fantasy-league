import { Triangle } from 'lucide-react';

export function RankChange({ change }: { change: number }) {
  if (change === 0) return null;

  const up = change > 0;

  return (
    <Triangle
      aria-label={up ? 'Moved up in ranking' : 'Moved down in ranking'}
      className={`size-3 shrink-0 ${
        up ? 'fill-green-500 text-green-500' : 'fill-red-500 text-red-500 rotate-180'
      }`}
    />
  );
}
