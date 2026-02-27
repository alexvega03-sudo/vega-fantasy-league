// Mock data for the Survivor Fantasy League
// In production, this data would come from Supabase database

export interface Contestant {
  id: string;
  name: string;
  tribe: string;
  isEliminated: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  color: string; // For visual distinction
}

export interface WeeklyScore {
  weekNumber: number;
  contestantId: string;
  points: number;
}

// Mock contestants from Survivor
export const contestants: Contestant[] = [
  { id: 'c1', name: 'Sarah Martinez', tribe: 'Blue', isEliminated: false },
  { id: 'c2', name: 'James Cooper', tribe: 'Red', isEliminated: false },
  { id: 'c3', name: 'Emily Chen', tribe: 'Blue', isEliminated: false },
  { id: 'c4', name: 'Marcus Johnson', tribe: 'Red', isEliminated: false },
  { id: 'c5', name: 'Rachel Kim', tribe: 'Blue', isEliminated: false },
  { id: 'c6', name: 'David Thompson', tribe: 'Red', isEliminated: true },
  { id: 'c7', name: 'Jessica Brown', tribe: 'Blue', isEliminated: false },
  { id: 'c8', name: 'Tyler Williams', tribe: 'Red', isEliminated: true },
  { id: 'c9', name: 'Amanda Rodriguez', tribe: 'Blue', isEliminated: false },
  { id: 'c10', name: 'Chris Anderson', tribe: 'Red', isEliminated: false },
];

// The Vega family members
export const familyMembers: FamilyMember[] = [
  { id: 'f1', name: 'Maria Vega', color: '#3b82f6' },
  { id: 'f2', name: 'Carlos Vega', color: '#10b981' },
  { id: 'f3', name: 'Sofia Vega', color: '#f59e0b' },
  { id: 'f4', name: 'Diego Vega', color: '#ef4444' },
  { id: 'f5', name: 'Isabella Vega', color: '#8b5cf6' },
];

// Mock weekly scores
// In production, this would be stored in Supabase and fetched via API
export const weeklyScores: WeeklyScore[] = [
  // Week 1
  { weekNumber: 1, contestantId: 'c1', points: 12 },
  { weekNumber: 1, contestantId: 'c2', points: 8 },
  { weekNumber: 1, contestantId: 'c3', points: 15 },
  { weekNumber: 1, contestantId: 'c4', points: 10 },
  { weekNumber: 1, contestantId: 'c5', points: 7 },
  { weekNumber: 1, contestantId: 'c6', points: 14 },
  { weekNumber: 1, contestantId: 'c7', points: 9 },
  { weekNumber: 1, contestantId: 'c8', points: 11 },
  { weekNumber: 1, contestantId: 'c9', points: 13 },
  { weekNumber: 1, contestantId: 'c10', points: 6 },
  
  // Week 2
  { weekNumber: 2, contestantId: 'c1', points: 10 },
  { weekNumber: 2, contestantId: 'c2', points: 12 },
  { weekNumber: 2, contestantId: 'c3', points: 8 },
  { weekNumber: 2, contestantId: 'c4', points: 15 },
  { weekNumber: 2, contestantId: 'c5', points: 9 },
  { weekNumber: 2, contestantId: 'c6', points: 7 },
  { weekNumber: 2, contestantId: 'c7', points: 14 },
  { weekNumber: 2, contestantId: 'c8', points: 0 }, // Eliminated
  { weekNumber: 2, contestantId: 'c9', points: 11 },
  { weekNumber: 2, contestantId: 'c10', points: 13 },
  
  // Week 3
  { weekNumber: 3, contestantId: 'c1', points: 14 },
  { weekNumber: 3, contestantId: 'c2', points: 9 },
  { weekNumber: 3, contestantId: 'c3', points: 11 },
  { weekNumber: 3, contestantId: 'c4', points: 8 },
  { weekNumber: 3, contestantId: 'c5', points: 12 },
  { weekNumber: 3, contestantId: 'c6', points: 0 }, // Eliminated
  { weekNumber: 3, contestantId: 'c7', points: 10 },
  { weekNumber: 3, contestantId: 'c9', points: 15 },
  { weekNumber: 3, contestantId: 'c10', points: 7 },
];

// Assignment of contestants to family members (draft picks)
// In production, this would be stored in Supabase
export const draftPicks: Record<string, string[]> = {
  f1: ['c1', 'c6'], // Maria picked Sarah and David
  f2: ['c2', 'c7'], // Carlos picked James and Jessica
  f3: ['c3', 'c8'], // Sofia picked Emily and Tyler
  f4: ['c4', 'c9'], // Diego picked Marcus and Amanda
  f5: ['c5', 'c10'], // Isabella picked Rachel and Chris
};

export const TOTAL_WEEKS = 13; // Total number of weeks in the season
export const CURRENT_WEEK = 3; // Current week number
