import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { BarChart3, ChevronDown } from 'lucide-react';

const tribeClass = (tribe: string) => {
  switch (tribe) {
    case 'Vatu': return 'bg-purple-100 text-purple-800';
    case 'Cila': return 'bg-orange-100 text-orange-800';
    case 'Kalo': return 'bg-teal-100 text-teal-800';
    case 'Blue': return 'bg-blue-100 text-blue-800';
    default:     return 'bg-red-100 text-red-800';
  }
};

export function WeeklyBreakdown() {
  const { getWeeklyBreakdown, contestants, currentWeek } = useGame();
  const [selectedWeek, setSelectedWeek] = useState(currentWeek || 1);

  const weeklyData = getWeeklyBreakdown(selectedWeek);
  const weekScores = weeklyData.map((d) => d.weekTotal);
  const maxScore = Math.max(...weekScores, 0);

  const weekOptions = Array.from({ length: currentWeek || 1 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Weekly Breakdown</h2>
          <p className="text-gray-500 mt-1">View scores by week</p>
        </div>

        {/* Week Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Week</label>
          <div className="relative">
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              className="appearance-none w-full sm:w-48 px-4 py-2.5 pr-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-900"
            >
              {weekOptions.map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Family Member Scores */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Week {selectedWeek} Scores</h3>
        </div>

        <div className="p-6 space-y-6">
          {weeklyData
            .sort((a, b) => b.weekTotal - a.weekTotal)
            .map((data) => {
              const percentage = maxScore > 0 ? (data.weekTotal / maxScore) * 100 : 0;

              return (
                <div key={data.familyMember.id} className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-4 rounded-full ring-2 ring-white shadow"
                        style={{ backgroundColor: data.familyMember.color }}
                      />
                      <h4 className="font-semibold text-gray-900">{data.familyMember.name}</h4>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{data.weekTotal} pts</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: data.familyMember.color,
                      }}
                    />
                  </div>

                  {/* Contestant Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-7">
                    {data.contestantScores.map((cs) => (
                      <div
                        key={cs.contestant?.id}
                        className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
                      >
                        <span className="text-gray-600">{cs.contestant?.name}</span>
                        <span className="font-medium text-gray-900">{cs.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Contestants Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">
            All Contestants — Week {selectedWeek}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contestant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tribe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contestants.map((contestant) => {
                const score = weeklyData
                  .flatMap((d) => d.contestantScores)
                  .find((cs) => cs.contestant?.id === contestant.id);

                return (
                  <tr key={contestant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{contestant.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tribeClass(contestant.tribe)}`}
                      >
                        {contestant.tribe}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-semibold text-gray-900">
                        {score?.points || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          contestant.isEliminated
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {contestant.isEliminated ? 'Eliminated' : 'Active'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
