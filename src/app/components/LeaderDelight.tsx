import { useEffect, useState } from 'react';
import { gifSrcForWeek, LEADER_GIF_COUNT } from '../data/leaderDelight';
import { ImmunityIdol } from './ImmunityIdol';

export function LeaderDelight({ week }: { week: number }) {
  const [skip, setSkip] = useState(0);
  const [mode, setMode] = useState<'pending' | 'gif' | 'idol'>('pending');
  const src = gifSrcForWeek(week, skip);

  useEffect(() => {
    setSkip(0);
  }, [week]);

  useEffect(() => {
    setMode('pending');
  }, [src]);

  return (
    <button
      type="button"
      aria-label="Show a different gif"
      title="Show a different gif"
      onClick={() => setSkip((n) => (n + 1) % LEADER_GIF_COUNT)}
      className="leader-delight relative shrink-0 w-24 h-24 sm:w-36 sm:h-36 bg-transparent border-0 p-0 cursor-pointer"
    >
      <div className="leader-delight-frame size-full overflow-hidden">
        <img
          src={src}
          alt=""
          referrerPolicy="no-referrer"
          className={`size-full object-cover ${mode === 'gif' ? '' : 'hidden'}`}
          onLoad={() => setMode('gif')}
          onError={() => {
            if (skip + 1 >= LEADER_GIF_COUNT) {
              setMode('idol');
              return;
            }
            setSkip((n) => n + 1);
          }}
        />
        {mode !== 'gif' ? (
          <div className="size-full flex items-center justify-center">
            <ImmunityIdol className="size-14 sm:size-24 tribal-idol-wiggle" />
          </div>
        ) : null}
      </div>
    </button>
  );
}
