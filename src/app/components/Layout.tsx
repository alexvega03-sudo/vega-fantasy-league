import { Outlet, Link, useLocation } from 'react-router';
import { Trophy, BarChart3, Settings, BookOpen, Users } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/',        label: 'Leaderboard', icon: Trophy },
    { path: '/weekly',  label: 'Weekly',      icon: BarChart3 },
    { path: '/tribes',  label: 'Tribes',      icon: Users },
    { path: '/admin',   label: 'Admin',       icon: Settings },
    { path: '/rules',   label: 'Rules',       icon: BookOpen },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="size-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Vega Family</h1>
                <p className="text-sm text-gray-500">Survivor League</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-500">
            © 2026 Vega Family Survivor Fantasy League. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
