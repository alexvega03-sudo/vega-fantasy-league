import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { getSeasonData, getSeasonMeta, type SeasonId, type SeasonMeta } from '../data/seasons';

export interface Contestant {
  id: string;
  name: string;
  tribe: string;
  isEliminated: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  color: string;
  mvpContestantId: string | null;
}

export interface WeeklyScore {
  weekNumber: number;
  contestantId: string;
  points: number;
}

export interface DraftPick {
  contestantId: string;
  pickWeek: number;
}

export interface LeaderboardEntry {
  familyMember: FamilyMember;
  totalPoints: number;
}

export interface WeeklyBreakdownEntry {
  familyMember: FamilyMember;
  weekTotal: number;
  contestantScores: {
    contestant: Contestant | undefined;
    points: number;
    pickWeek: number;
    counted: boolean;
  }[];
}

interface GameContextType {
  season: SeasonMeta;
  contestants: Contestant[];
  familyMembers: FamilyMember[];
  weeklyScores: WeeklyScore[];
  draftPicks: Record<string, DraftPick[]>;
  currentWeek: number;
  hasStarted: boolean;
  getLeaderboard: () => LeaderboardEntry[];
  getWeeklyBreakdown: (weekNumber: number) => WeeklyBreakdownEntry[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

function loadSeason(seasonId: SeasonId) {
  const data = getSeasonData(seasonId);
  const draftPicks: Record<string, DraftPick[]> = {};
  for (const [playerId, picks] of Object.entries(data.draftPicks)) {
    draftPicks[playerId] = picks.map((pick) => ({
      contestantId: pick.contestantId,
      pickWeek: pick.pickWeek,
    }));
  }

  return {
    familyMembers: data.familyMembers.map((member) => ({
      id: member.id,
      name: member.name,
      color: member.color,
      mvpContestantId: member.mvpContestantId ?? null,
    })),
    contestants: data.contestants.map((contestant) => ({
      id: contestant.id,
      name: contestant.name,
      tribe: contestant.tribe,
      isEliminated: contestant.isEliminated,
    })),
    weeklyScores: data.weeklyScores.map((score) => ({ ...score })),
    draftPicks,
    currentWeek: data.currentWeek,
  };
}

export function GameProvider({
  seasonId,
  children,
}: {
  seasonId: SeasonId;
  children: ReactNode;
}) {
  const season = getSeasonMeta(seasonId);
  const league = useMemo(() => loadSeason(seasonId), [seasonId]);

  const getLeaderboard = () => {
    const entries = league.familyMembers.map((member) => {
      const memberPicks = league.draftPicks[member.id] || [];
      const totalPoints = league.weeklyScores
        .filter((score) => {
          const pick = memberPicks.find((p) => p.contestantId === score.contestantId);
          return pick !== undefined && score.weekNumber >= pick.pickWeek;
        })
        .reduce((sum, score) => sum + score.points, 0);
      return { familyMember: member, totalPoints };
    });
    return entries.sort((a, b) => b.totalPoints - a.totalPoints);
  };

  const getWeeklyBreakdown = (weekNumber: number): WeeklyBreakdownEntry[] => {
    const weekScores = league.weeklyScores.filter((score) => score.weekNumber === weekNumber);
    return league.familyMembers.map((member) => {
      const memberPicks = league.draftPicks[member.id] || [];
      const contestantScores = memberPicks.map((pick) => {
        const counted = weekNumber >= pick.pickWeek;
        const rawPoints =
          weekScores.find((score) => score.contestantId === pick.contestantId)?.points ?? 0;
        return {
          contestant: league.contestants.find((contestant) => contestant.id === pick.contestantId),
          points: counted ? rawPoints : 0,
          pickWeek: pick.pickWeek,
          counted,
        };
      });
      const weekTotal = contestantScores.reduce((sum, entry) => sum + entry.points, 0);
      return { familyMember: member, weekTotal, contestantScores };
    });
  };

  return (
    <GameContext.Provider
      value={{
        season,
        contestants: league.contestants,
        familyMembers: league.familyMembers,
        weeklyScores: league.weeklyScores,
        draftPicks: league.draftPicks,
        currentWeek: league.currentWeek,
        hasStarted: league.weeklyScores.length > 0,
        getLeaderboard,
        getWeeklyBreakdown,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
}
