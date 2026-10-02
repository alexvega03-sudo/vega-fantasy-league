import { useEffect, useState } from 'react';
import { gifSrcForWeek } from '../data/leaderDelight';
import { ImmunityIdol } from './ImmunityIdol';

export function LeaderDelight({ week }: { week: number }) {
  const [mode, setMode] = useState<'pending' | 'gif' | 'idol'>('pending');
  const src = gifSrcForWeek(week);

  useEffect(() => {
    setMode('pending');
  }, [src]);

  return (
    <div className="leader-delight relative shrink-0 w-24 h-24 sm:w-36 sm:h-36">
      <div className="leader-delight-frame size-full overflow-hidden">
        <img
          src={src}
          alt=""
          className={`size-full object-cover ${mode === 'gif' ? '' : 'hidden'}`}
          onLoad={() => setMode('gif')}
          onError={() => setMode('idol')}
        />
        {mode !== 'gif' ? (
          <div className="size-full flex items-center justify-center">
            <ImmunityIdol className="size-14 sm:size-24 tribal-idol-wiggle" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
