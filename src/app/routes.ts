import { createBrowserRouter, redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Leaderboard } from './pages/Leaderboard';
import { WeeklyBreakdown } from './pages/WeeklyBreakdown';
import { Tribes } from './pages/Tribes';
import { Rules } from './pages/Rules';
import { NotFound } from './pages/NotFound';

const seasonPages = [
  { index: true, Component: Leaderboard },
  { path: 'weekly', Component: WeeklyBreakdown },
  { path: 'tribes', Component: Tribes },
  { path: 'rules', Component: Rules },
  { path: '*', Component: NotFound },
];

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: seasonPages,
  },
  {
    path: '/season/:seasonId',
    Component: Layout,
    children: seasonPages,
  },
  {
    path: '/admin',
    loader: () => redirect('/'),
  },
]);
