import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Leaderboard } from './pages/Leaderboard';
import { WeeklyBreakdown } from './pages/WeeklyBreakdown';
import { Tribes } from './pages/Tribes';
import { Admin } from './pages/Admin';
import { Rules } from './pages/Rules';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Leaderboard,
      },
      {
        path: 'weekly',
        Component: WeeklyBreakdown,
      },
      {
        path: 'tribes',
        Component: Tribes,
      },
      {
        path: 'admin',
        Component: Admin,
      },
      {
        path: 'rules',
        Component: Rules,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
