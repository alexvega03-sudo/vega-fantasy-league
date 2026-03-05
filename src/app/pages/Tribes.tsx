import { useGame } from '../context/GameContext';
import { Users, Flame, Loader2, AlertCircle, RefreshCw, Skull, Star } from 'lucide-react';

export function Tribes() {
  const { familyMembers, contestants, draftPicks, weeklyScores, loading, error, refetch } = useGame();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        <Loader2 className="size-10 text-blue-500 animate-spin" />
        <p className="text-gray-500 text-sm">Loading tribes from Supabase…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-6 flex flex-col items-center gap-4 text-center">
        <AlertCircle className="size-10 text-red-500" />
        <div>
          <h3 className="font-semibold text-red-900 text-lg">Failed to load tribes</h3>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          <RefreshCw className="size-4" />
          Retry
        </button>
      </div>
    );
  }

  // Calculate total points for a castaway across all weeks
  const getCastawayTotalPoints = (contestantId: string) => {
    return weeklyScores
      .filter((s) => s.contestantId === contestantId)
      .reduce((sum, s) => sum + s.points, 0);
  };

  // Calculate total points for a player's full tribe
  const getPlayerTotalPoints = (playerId: string) => {
    const picks = draftPicks[playerId] || [];
    return picks.reduce((sum, cId) => sum + getCastawayTotalPoints(cId), 0);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Fantasy Tribes</h2>
          <p className="text-gray-500 mt-1">Each player's drafted castaways</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refetch}
            title="Refresh data"
            className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
          >
            <RefreshCw className="size-5" />
          </button>
          <Users className="size-8 text-blue-500" />
        </div>
      </div>

      {/* Draft summary bar */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 flex flex-wrap gap-6">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Players</div>
          <div className="text-2xl font-bold text-gray-900">{familyMembers.length}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Castaways</div>
          <div className="text-2xl font-bold text-gray-900">{contestants.length}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Picks per player</div>
          <div className="text-2xl font-bold text-gray-900">9</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Still active</div>
          <div className="text-2xl font-bold text-green-600">
            {contestants.filter((c) => !c.isEliminated).length}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Eliminated</div>
          <div className="text-2xl font-bold text-red-500">
            {contestants.filter((c) => c.isEliminated).length}
          </div>
        </div>
      </div>

      {/* Tribe cards — one per family member */}
      {familyMembers.length === 0 ? (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center text-gray-400">
          <Users className="size-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No players found</p>
          <p className="text-sm mt-1">Add players in your Supabase dashboard first.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {familyMembers.map((member) => {
            const picks = draftPicks[member.id] || [];
            const TRIBE_ORDER: Record<string, number> = { Cila: 0, Kalo: 1, Vatu: 2 };
            const memberCastaways = picks
              .map((cId) => contestants.find((c) => c.id === cId))
              .filter(Boolean) as typeof contestants;
            memberCastaways.sort((a, b) => {
              const tribeA = TRIBE_ORDER[a.tribe] ?? 99;
              const tribeB = TRIBE_ORDER[b.tribe] ?? 99;
              if (tribeA !== tribeB) return tribeA - tribeB;
              return a.name.localeCompare(b.name);
            });
            const totalPoints = getPlayerTotalPoints(member.id);
            const activeCount = memberCastaways.filter((c) => !c.isEliminated).length;
            const eliminatedCount = memberCastaways.filter((c) => c.isEliminated).length;

            return (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Card header */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ backgroundColor: member.color + '18', borderBottom: `3px solid ${member.color}` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                      <p className="text-xs text-gray-500">
                        {activeCount} active · {eliminatedCount} eliminated
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: member.color }}>
                      {totalPoints}
                    </div>
                    <div className="text-xs text-gray-500">total pts</div>
                  </div>
                </div>

                {/* Castaway list */}
                <div className="divide-y divide-gray-100">
                  {memberCastaways.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-400 text-sm">
                      No picks assigned yet
                    </div>
                  ) : (
                    memberCastaways.map((castaway) => {
                      const pts = getCastawayTotalPoints(castaway.id);
                      const isMvp = member.mvpContestantId === castaway.id;

                      return (
                        <div
                          key={castaway.id}
                          className={`px-6 py-3 flex items-center justify-between transition-colors ${
                            castaway.isEliminated ? 'opacity-50 bg-gray-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Status icon */}
                            {castaway.isEliminated ? (
                              <Skull className="size-4 text-gray-400 shrink-0" />
                            ) : (
                              <Flame className="size-4 text-orange-400 shrink-0" />
                            )}

                            <div>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`font-medium text-sm ${
                                    castaway.isEliminated
                                      ? 'line-through text-gray-400'
                                      : 'text-gray-900'
                                  }`}
                                >
                                  {castaway.name}
                                </span>
                                {isMvp && (
                                  <span title="MVP" className="text-base leading-none">👑</span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 mt-0.5">
                                <span
                                  className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                                    castaway.tribe === 'Vatu'
                                      ? 'bg-purple-100 text-purple-700'
                                      : castaway.tribe === 'Cila'
                                      ? 'bg-orange-100 text-orange-700'
                                      : castaway.tribe === 'Kalo'
                                      ? 'bg-teal-100 text-teal-700'
                                      : castaway.tribe === 'Blue'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {castaway.tribe}
                                </span>
                                {castaway.isEliminated && (
                                  <span className="text-xs text-gray-400">Eliminated</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Points */}
                          <div className="text-right">
                            <div className="flex items-center gap-1 justify-end">
                              {pts > 0 && <Star className="size-3 text-yellow-400 fill-yellow-400" />}
                              <span
                                className={`font-semibold text-sm ${
                                  pts > 0 ? 'text-gray-900' : 'text-gray-400'
                                }`}
                              >
                                {pts} pts
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Card footer — picks remaining */}
                {picks.length < 9 && (
                  <div className="px-6 py-3 bg-yellow-50 border-t border-yellow-100">
                    <p className="text-xs text-yellow-700 font-medium">
                      {9 - picks.length} pick{9 - picks.length !== 1 ? 's' : ''} remaining
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
