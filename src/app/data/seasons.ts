import * as season50 from './season50';
import * as season51 from './season51';

export type SeasonId = '50' | '51';

export interface SeasonMeta {
  id: SeasonId;
  label: string;
  archived: boolean;
  picksPerPlayer: number;
  postMergePickWeek: number | null;
}

export const CURRENT_SEASON_ID: SeasonId = '51';

export const seasons: SeasonMeta[] = [
  {
    id: '51',
    label: 'Season 51',
    archived: false,
    picksPerPlayer: 9,
    postMergePickWeek: season51.POST_MERGE_PICK_WEEK,
  },
  { id: '50', label: 'Season 50', archived: true, picksPerPlayer: 10, postMergePickWeek: null },
];

const seasonData = {
  '50': season50,
  '51': season51,
} as const;

export function isSeasonId(value: string | undefined): value is SeasonId {
  return value === '50' || value === '51';
}

export function getSeasonMeta(id: SeasonId): SeasonMeta {
  const season = seasons.find((item) => item.id === id);
  if (!season) {
    throw new Error(`Unknown season: ${id}`);
  }
  return season;
}

export function getSeasonData(id: SeasonId) {
  return seasonData[id];
}

export function getPostMergeSetup(id: SeasonId) {
  if (id !== '51') return null;
  return {
    week: season51.POST_MERGE_PICK_WEEK,
    picks: season51.postMergePicks,
  };
}
