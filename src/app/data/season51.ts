// Active Season 51 league data.
// Each week, add contestant weekly points here and mark who was eliminated.
// Eliminated contestants keep points for their elimination week, then score 0 after that.

export const familyMembers = [
  {
    id: '19cce77b-8f0d-461b-b4dc-e30bb2f8bbc1',
    name: 'Alex',
    color: '#FF6B6B',
    mvpContestantId: null,
  },
  {
    id: '11111111-0000-0000-0000-000000000004',
    name: 'Jay',
    color: '#FF8C42',
    mvpContestantId: null,
  },
  {
    id: '11111111-0000-0000-0000-000000000003',
    name: 'Kara',
    color: '#FDCB6E',
    mvpContestantId: null,
  },
  {
    id: '11111111-0000-0000-0000-000000000005',
    name: 'Lisa',
    color: '#00BBF9',
    mvpContestantId: null,
  },
  {
    id: '86e5772c-2a66-4d35-ba7b-bc869559ea5c',
    name: 'Mary',
    color: '#C364C5',
    mvpContestantId: null,
  },
  {
    id: '11111111-0000-0000-0000-000000000002',
    name: 'Ruben',
    color: '#00B894',
    mvpContestantId: null,
  },
  {
    id: '11111111-0000-0000-0000-000000000001',
    name: 'Virginia',
    color: '#6C5CE7',
    mvpContestantId: null,
  },
] as const;

export const contestants: {
  id: string;
  name: string;
  tribe: string;
  isEliminated: boolean;
}[] = [];

export const weeklyScores: {
  weekNumber: number;
  contestantId: string;
  points: number;
}[] = [];

export const draftPicks: Record<string, { contestantId: string; pickWeek: number }[]> = {};

export const currentWeek = 0;
