import { useGame } from '../context/GameContext';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

export function Leaderboard() {
  const { getLeaderboard, hasStarted, season } = useGame();
  const leaderboard = getLeaderboard();
  const leader = leaderboard[0];
  const leaderColor = leader?.familyMember.color ?? '#3b82f6';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Leaderboard</h2>
          <p className="text-gray-500 mt-1">
            {season.archived ? `${season.label} final standings` : 'Current standings in the fantasy league'}
          </p>
        </div>
        <TrendingUp className="size-8 text-blue-500" />
      </div>

      {!hasStarted || leaderboard.length === 0 ? (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-12 text-center text-gray-400">
          <Trophy className="size-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Season {season.id} hasn't started yet</p>
          <p className="text-sm mt-1">
            Scores will appear here after the draft and the first week of points.
          </p>
        </div>
      ) : (
        <>
          <div
            className="rounded-xl p-6 text-white shadow-lg"
            style={{ background: leaderColor }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="size-6" />
                  <span className="text-sm font-medium opacity-90">
                    {season.archived ? 'Season Winner' : 'Current Leader'}
                  </span>
                </div>
                <h3 className="text-4xl font-bold">{leader.familyMember.name}</h3>
                <p className="text-2xl font-semibold mt-2">{leader.totalPoints} points</p>
              </div>
              <div className="size-20 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="size-12" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Rankings</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {leaderboard.map((entry, index) => {
                const isLeader = index === 0;
                const rankIcons = [
                  <Trophy className="size-6 text-yellow-500" key="1st" />,
                  <Medal className="size-6 text-gray-400" key="2nd" />,
                  <Award className="size-6 text-orange-600" key="3rd" />,
                ];

                return (
                  <div
                    key={entry.familyMember.id}
                    className={`px-6 py-5 flex items-center justify-between ${
                      isLeader ? 'bg-gray-50/80' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 flex items-center justify-center">
                        {index < 3 ? (
                          rankIcons[index]
                        ) : (
                          <span className="text-2xl font-bold text-gray-400">{index + 1}</span>
                        )}
                      </div>

                      <div
                        className="size-4 rounded-full ring-2 ring-white shadow"
                        style={{ backgroundColor: entry.familyMember.color }}
                      />

                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {entry.familyMember.name}
                        </h4>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">
                          {entry.totalPoints}
                        </div>
                        <div className="text-sm text-gray-500">points</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500 mb-1">Total Players</div>
              <div className="text-2xl font-bold text-gray-900">{leaderboard.length}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500 mb-1">Highest Score</div>
              <div className="text-2xl font-bold text-gray-900">{leader.totalPoints}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500 mb-1">Average Score</div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(
                  leaderboard.reduce((sum, e) => sum + e.totalPoints, 0) / leaderboard.length
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
