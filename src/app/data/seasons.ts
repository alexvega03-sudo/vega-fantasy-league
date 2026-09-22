import * as season50 from './season50';
import * as season51 from './season51';

export type SeasonId = '50' | '51';

export interface SeasonMeta {
  id: SeasonId;
  label: string;
  archived: boolean;
}

export const CURRENT_SEASON_ID: SeasonId = '51';

export const seasons: SeasonMeta[] = [
  { id: '51', label: 'Season 51', archived: false },
  { id: '50', label: 'Season 50', archived: true },
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
