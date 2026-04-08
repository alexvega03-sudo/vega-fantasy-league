import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { supabase, DbPlayer, DbContestant, DbWeeklyScore, DbPlayerPick } from '../../lib/supabase';

// ─── Shape types used throughout the app ────────────────────────────────────

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
  pickWeek: number; // week from which this pick's points start counting
}

export interface LeaderboardEntry {
  familyMember: FamilyMember;
  totalPoints: number;
}

export interface WeeklyBreakdownEntry {
  familyMember: FamilyMember;
  weekTotal: number;
  contestantScores: { contestant: Contestant | undefined; points: number; pickWeek: number; counted: boolean }[];
}

interface GameContextType {
  contestants: Contestant[];
  familyMembers: FamilyMember[];
  weeklyScores: WeeklyScore[];
  draftPicks: Record<string, DraftPick[]>;
  currentWeek: number;
  loading: boolean;
  error: string | null;
  updateWeeklyScores: (
    weekNumber: number,
    scores: { contestantId: string; points: number }[]
  ) => Promise<void>;
  getLeaderboard: () => LeaderboardEntry[];
  getWeeklyBreakdown: (weekNumber: number) => WeeklyBreakdownEntry[];
  refetch: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [weeklyScores, setWeeklyScores] = useState<WeeklyScore[]>([]);
  const [draftPicks, setDraftPicks] = useState<Record<string, DraftPick[]>>({});
  const [currentWeek, setCurrentWeek] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        { data: playersData, error: playersError },
        { data: contestantsData, error: contestantsError },
        { data: scoresData, error: scoresError },
        { data: picksData, error: picksError },
      ] = await Promise.all([
        supabase.from('players').select('*').order('name'),
        supabase.from('contestants').select('*').order('name'),
        supabase.from('weekly_scores').select('*').order('week_number'),
        supabase.from('player_picks').select('*'),
      ]);

      if (playersError) throw new Error(`Players fetch failed: ${playersError.message}`);
      if (contestantsError) throw new Error(`Castaways fetch failed: ${contestantsError.message}`);
      if (scoresError) throw new Error(`Scores fetch failed: ${scoresError.message}`);
      if (picksError) throw new Error(`Picks fetch failed: ${picksError.message}`);

      const mappedPlayers: FamilyMember[] = (playersData as DbPlayer[]).map((p) => ({
        id: p.id,
        name: p.name,
        color: p.color,
        mvpContestantId: p.mvp_contestant_id ?? null,
      }));

      const mappedContestants: Contestant[] = (contestantsData as DbContestant[]).map((c) => ({
        id: c.id,
        name: c.name,
        tribe: c.tribe,
        isEliminated: c.is_eliminated,
      }));

      const mappedScores: WeeklyScore[] = (scoresData as DbWeeklyScore[]).map((s) => ({
        weekNumber: s.week_number,
        contestantId: s.contestant_id,
        points: s.points,
      }));

      const picksMap: Record<string, DraftPick[]> = {};
      (picksData as DbPlayerPick[]).forEach((pick) => {
        if (!picksMap[pick.player_id]) picksMap[pick.player_id] = [];
        picksMap[pick.player_id].push({
          contestantId: pick.contestant_id,
          pickWeek: pick.pick_week ?? 1,
        });
      });

      const maxWeek = mappedScores.reduce((max, s) => Math.max(max, s.weekNumber), 1);

      setFamilyMembers(mappedPlayers);
      setContestants(mappedContestants);
      setWeeklyScores(mappedScores);
      setDraftPicks(picksMap);
      setCurrentWeek(maxWeek);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const updateWeeklyScores = async (
    weekNumber: number,
    scores: { contestantId: string; points: number }[]
  ) => {
    const rows = scores.map((s) => ({
      week_number: weekNumber,
      contestant_id: s.contestantId,
      points: s.points,
    }));

    const { error: upsertError } = await supabase
      .from('weekly_scores')
      .upsert(rows, { onConflict: 'week_number,contestant_id' });

    if (upsertError) throw new Error(`Failed to save scores: ${upsertError.message}`);

    setWeeklyScores((prev) => {
      const updated = [...prev];
      scores.forEach(({ contestantId, points }) => {
        const idx = updated.findIndex(
          (s) => s.weekNumber === weekNumber && s.contestantId === contestantId
        );
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], points };
        } else {
          updated.push({ weekNumber, contestantId, points });
        }
      });
      return updated;
    });

    setCurrentWeek((prev) => Math.max(prev, weekNumber));
  };

  const getLeaderboard = useCallback((): LeaderboardEntry[] => {
    const entries = familyMembers.map((member) => {
      const memberPicks = draftPicks[member.id] || [];
      const totalPoints = weeklyScores
        .filter((s) => {
          const pick = memberPicks.find((p) => p.contestantId === s.contestantId);
          return pick !== undefined && s.weekNumber >= pick.pickWeek;
        })
        .reduce((sum, s) => sum + s.points, 0);
      return { familyMember: member, totalPoints };
    });
    return entries.sort((a, b) => b.totalPoints - a.totalPoints);
  }, [familyMembers, draftPicks, weeklyScores]);

  const getWeeklyBreakdown = useCallback(
    (weekNumber: number): WeeklyBreakdownEntry[] => {
      const weekScores = weeklyScores.filter((s) => s.weekNumber === weekNumber);
      return familyMembers.map((member) => {
        const memberPicks = draftPicks[member.id] || [];
        const contestantScores = memberPicks.map((pick) => {
          const counted = weekNumber >= pick.pickWeek;
          const rawPoints = weekScores.find((s) => s.contestantId === pick.contestantId)?.points ?? 0;
          return {
            contestant: contestants.find((c) => c.id === pick.contestantId),
            points: counted ? rawPoints : 0,
            pickWeek: pick.pickWeek,
            counted,
          };
        });
        const weekTotal = contestantScores.reduce((sum, cs) => sum + cs.points, 0);
        return { familyMember: member, weekTotal, contestantScores };
      });
    },
    [familyMembers, draftPicks, weeklyScores, contestants]
  );

  return (
    <GameContext.Provider
      value={{
        contestants,
        familyMembers,
        weeklyScores,
        draftPicks,
        currentWeek,
        loading,
        error,
        updateWeeklyScores,
        getLeaderboard,
        getWeeklyBreakdown,
        refetch: fetchAllData,
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
