// Active Season 51 league data.
// Each week, add contestant weekly points here and mark who was eliminated.
// Eliminated contestants keep points for their elimination week, then score 0 after that.

export const familyMembers = [
  {
    id: '11111111-0000-0000-0000-000000000001',
    name: 'Virginia',
    color: '#6C5CE7',
    mvpContestantId: null,
  },
  {
    id: '11111111-0000-0000-0000-000000000002',
    name: 'Ruben',
    color: '#067056',
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
    id: '19cce77b-8f0d-461b-b4dc-e30bb2f8bbc1',
    name: 'Alex',
    color: '#FF6B6B',
    mvpContestantId: null,
  },
  {
    id: '86e5772c-2a66-4d35-ba7b-bc869559ea5c',
    name: 'Mary',
    color: '#C364C5',
    mvpContestantId: null,
  },
  {
    id: 's51-player-rob',
    name: 'Rob',
    color: '#2ECC71',
    mvpContestantId: null,
  },
  {
    id: 's51-player-marcella',
    name: 'Marcella',
    color: '#1E3A8A',
    mvpContestantId: null,
  },
] as const;

export const contestants: {
  id: string;
  name: string;
  tribe: string;
  isEliminated: boolean;
}[] = [
  { id: 's51-toka-an', name: 'An "Thien An"', tribe: 'Toka', isEliminated: false },
  { id: 's51-toka-brady', name: 'Brady', tribe: 'Toka', isEliminated: false },
  { id: 's51-toka-danny', name: 'Danny', tribe: 'Toka', isEliminated: false },
  { id: 's51-toka-devin', name: 'Devin', tribe: 'Toka', isEliminated: false },
  { id: 's51-toka-jelly', name: 'Jelly', tribe: 'Toka', isEliminated: false },
  { id: 's51-toka-jenna', name: 'Jenna', tribe: 'Toka', isEliminated: false },
  { id: 's51-toka-lewis', name: 'Lewis', tribe: 'Toka', isEliminated: false },
  { id: 's51-toka-maggie', name: 'Maggie', tribe: 'Toka', isEliminated: false },
  { id: 's51-toka-mike', name: 'Mike', tribe: 'Toka', isEliminated: false },
  { id: 's51-toka-patt', name: 'Patt', tribe: 'Toka', isEliminated: false },
  { id: 's51-savu-alexis', name: 'Alexis', tribe: 'Savu', isEliminated: false },
  { id: 's51-savu-ana', name: 'Ana', tribe: 'Savu', isEliminated: false },
  { id: 's51-savu-carter', name: 'Carter', tribe: 'Savu', isEliminated: false },
  { id: 's51-savu-cristian', name: 'Cristian', tribe: 'Savu', isEliminated: false },
  { id: 's51-savu-eric', name: 'Eric', tribe: 'Savu', isEliminated: false },
  { id: 's51-savu-kristin', name: 'Kristin', tribe: 'Savu', isEliminated: false },
  { id: 's51-savu-linnea', name: 'Linnea', tribe: 'Savu', isEliminated: false },
  { id: 's51-savu-ori', name: 'Ori', tribe: 'Savu', isEliminated: false },
  { id: 's51-savu-rob', name: 'Rob', tribe: 'Savu', isEliminated: false },
  { id: 's51-savu-sharonda', name: 'Sharonda', tribe: 'Savu', isEliminated: false },
];

export const weeklyScores: {
  weekNumber: number;
  contestantId: string;
  points: number;
}[] = [];

export const draftPicks: Record<string, { contestantId: string; pickWeek: number }[]> = {};

export const currentWeek = 0;
