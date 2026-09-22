import { CURRENT_SEASON_ID, type SeasonId } from '../data/seasons';

export function seasonHomePath(seasonId: SeasonId) {
  return seasonId === CURRENT_SEASON_ID ? '/' : `/season/${seasonId}`;
}

export function seasonPagePath(seasonId: SeasonId, pagePath: string) {
  const home = seasonHomePath(seasonId);
  if (pagePath === '/') return home;
  return home === '/' ? pagePath : `${home}${pagePath}`;
}

export function pagePathFromLocation(pathname: string) {
  const archived = pathname.match(/^\/season\/\d+(.*)$/);
  if (!archived) return pathname || '/';
  return archived[1] || '/';
}
