import { Outlet, Link, useLocation, useParams, Navigate, useNavigate } from 'react-router';
import { useEffect, useState, type ChangeEvent } from 'react';
import { Trophy, BarChart3, BookOpen, Users, ChevronDown } from 'lucide-react';
import { GameProvider, useGame } from '../context/GameContext';
import { CURRENT_SEASON_ID, isSeasonId, seasons } from '../data/seasons';
import { pagePathFromLocation, seasonPagePath } from '../lib/seasonPath';
import { NotFound } from '../pages/NotFound';
import { ShieldMark } from './ShieldMark';

const navItems = [
  { path: '/', label: 'Leaderboard', shortLabel: 'Leaders', icon: Trophy },
  { path: '/weekly', label: 'Weekly', icon: BarChart3 },
  { path: '/tribes', label: 'Tribes', icon: Users },
  { path: '/rules', label: 'Rules', icon: BookOpen },
];

function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

function SeasonSwitcher() {
  const { season } = useGame();
  const location = useLocation();
  const navigate = useNavigate();
  const pagePath = pagePathFromLocation(location.pathname);
  const isMobile = useMobileLayout();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!isSeasonId(event.target.value)) return;
    navigate(seasonPagePath(event.target.value, pagePath));
  };

  return (
    <div className="relative shrink-0">
      <label htmlFor="season-switcher" className="sr-only">
        Season
      </label>
      <select
        id="season-switcher"
        value={season.id}
        onChange={onChange}
        className={`appearance-none py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          isMobile ? 'w-[4.75rem] pl-2.5 pr-7' : 'pl-3 pr-9'
        }`}
      >
        {seasons.map((item) => (
          <option key={item.id} value={item.id}>
            {isMobile
              ? `S${item.id}`
              : `${item.label}${item.archived ? ' (archive)' : ''}`}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none sm:right-2.5" />
    </div>
  );
}

function LayoutFrame() {
  const { season } = useGame();
  const location = useLocation();
  const pagePath = pagePathFromLocation(location.pathname);

  const isActive = (path: string) => {
    if (path === '/') return pagePath === '/';
    return pagePath.startsWith(path);
  };

  return (
    <div className="site-shell min-h-screen bg-gray-50">
      <header className="site-header bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="site-header-row grid grid-cols-[minmax(0,1fr)_auto] items-center h-16 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-hidden">
              <div className="site-mark size-10 flex items-center justify-center shrink-0">
                <ShieldMark />
              </div>
              <div className="min-w-0 overflow-hidden">
                <h1 className="site-title font-bold text-gray-900 leading-tight truncate">
                  Vega Family Survivor
                </h1>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {season.label}
                  {season.archived ? (
                    <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Archived
                    </span>
                  ) : null}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <SeasonSwitcher />
            </div>
          </div>
        </div>
      </header>

      <nav className="site-nav bg-white border-b border-gray-200 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="site-nav-row grid grid-cols-4 sm:flex sm:flex-nowrap sm:space-x-8 overflow-x-auto overflow-y-hidden overscroll-x-contain">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={seasonPagePath(season.id, item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`
                    flex min-w-0 items-center justify-center gap-1 sm:gap-2
                    px-0.5 sm:px-3 py-3 sm:py-4 border-b-2 transition-colors sm:whitespace-nowrap
                    ${
                      active
                        ? 'nav-link-active border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="size-4 hidden sm:block shrink-0" />
                  <span className="text-sm font-medium sm:hidden">{item.shortLabel ?? item.label}</span>
                  <span className="text-sm font-medium hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {season.archived && (
        <div className="archive-banner bg-amber-50 border-b border-amber-200">
          <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-sm text-amber-900">
            This is a read-only archive of {season.label}. Switch to Season 51 for the current league.
          </p>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="site-footer bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-500">
            © 2026 Vega Family Survivor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function Layout() {
  const { seasonId } = useParams();
  const location = useLocation();

  if (seasonId === CURRENT_SEASON_ID) {
    const rest = pagePathFromLocation(location.pathname);
    return <Navigate to={seasonPagePath(CURRENT_SEASON_ID, rest)} replace />;
  }

  if (seasonId && !isSeasonId(seasonId)) {
    return <NotFound />;
  }

  const resolvedSeasonId = isSeasonId(seasonId) ? seasonId : CURRENT_SEASON_ID;

  return (
    <GameProvider key={resolvedSeasonId} seasonId={resolvedSeasonId}>
      <LayoutFrame />
    </GameProvider>
  );
}
