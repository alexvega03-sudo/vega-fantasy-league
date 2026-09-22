import { Outlet, Link, useLocation, useParams, Navigate, useNavigate } from 'react-router';
import { Trophy, BarChart3, BookOpen, Users, ChevronDown } from 'lucide-react';
import { GameProvider, useGame } from '../context/GameContext';
import { CURRENT_SEASON_ID, isSeasonId, seasons } from '../data/seasons';
import { pagePathFromLocation, seasonPagePath } from '../lib/seasonPath';
import { NotFound } from '../pages/NotFound';

const navItems = [
  { path: '/', label: 'Leaderboard', icon: Trophy },
  { path: '/weekly', label: 'Weekly', icon: BarChart3 },
  { path: '/tribes', label: 'Tribes', icon: Users },
  { path: '/rules', label: 'Rules', icon: BookOpen },
];

function SeasonSwitcher() {
  const { season } = useGame();
  const location = useLocation();
  const navigate = useNavigate();
  const pagePath = pagePathFromLocation(location.pathname);

  return (
    <div className="relative">
      <label htmlFor="season-switcher" className="sr-only">
        Season
      </label>
      <select
        id="season-switcher"
        value={season.id}
        onChange={(event) => {
          if (!isSeasonId(event.target.value)) return;
          navigate(seasonPagePath(event.target.value, pagePath));
        }}
        className="appearance-none pl-3 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {seasons.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
            {item.archived ? ' (archive)' : ''}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                <Trophy className="size-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="font-bold text-gray-900 leading-tight truncate">
                  Vega Family Survivor
                </h1>
                <p className="text-sm font-medium text-gray-900">
                  {season.label}
                  {season.archived ? (
                    <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Archived
                    </span>
                  ) : null}
                </p>
              </div>
            </div>

            <SeasonSwitcher />
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={seasonPagePath(season.id, item.path)}
                  className={`
                    flex items-center gap-2 px-3 py-4 border-b-2 transition-colors whitespace-nowrap
                    ${
                      active
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="size-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {season.archived && (
        <div className="bg-amber-50 border-b border-amber-200">
          <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-sm text-amber-900">
            This is a read-only archive of {season.label}. Switch to Season 51 for the current league.
          </p>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
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
