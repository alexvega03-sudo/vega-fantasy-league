import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import {
  Save,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Loader2,
  RefreshCw,
} from 'lucide-react';

export function Admin() {
  const {
    contestants,
    currentWeek,
    loading,
    error,
    updateWeeklyScores,
    getWeeklyBreakdown,
    refetch,
  } = useGame();

  const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);
  const [scores, setScores] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = useState<string | null>(null);

  // Keep selectedWeek in sync once data loads
  useEffect(() => {
    setSelectedWeek(currentWeek);
  }, [currentWeek]);

  // Populate score inputs from existing Supabase data for the chosen week
  const loadWeekScores = (weekNumber: number) => {
    const weekData = getWeeklyBreakdown(weekNumber);
    const initial: Record<string, string> = {};
    weekData.forEach((entry) => {
      entry.contestantScores.forEach(({ contestant, points }) => {
        if (contestant) {
          initial[contestant.id] = points > 0 ? points.toString() : '';
        }
      });
    });
    setScores(initial);
    setSaveStatus('idle');
    setSaveError(null);
  };

  const handleWeekChange = (weekNumber: number) => {
    setSelectedWeek(weekNumber);
    loadWeekScores(weekNumber);
  };

  const handleScoreChange = (contestantId: string, value: string) => {
    setScores((prev) => ({ ...prev, [contestantId]: value }));
    setSaveStatus('idle');
    setSaveError(null);
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    setSaveError(null);

    const scoreUpdates = Object.entries(scores).map(([contestantId, pointsStr]) => ({
      contestantId,
      points: parseInt(pointsStr, 10) || 0,
    }));

    try {
      await updateWeeklyScores(selectedWeek, scoreUpdates);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Unknown error');
      setSaveStatus('error');
    }
  };

  // Total weeks is 13 by convention; allow editing up to max(currentWeek+1, 13)
  const totalWeeks = Math.max(currentWeek + 1, 13);
  const weekOptions = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 gap-4">
        <Loader2 className="size-10 text-blue-500 animate-spin" />
        <p className="text-gray-500 text-sm">Loading data from Supabase…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-6 flex flex-col items-center gap-4 text-center">
        <AlertCircle className="size-10 text-red-500" />
        <div>
          <h3 className="font-semibold text-red-900 text-lg">Failed to load data</h3>
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Panel</h2>
          <p className="text-gray-500 mt-1">Enter and manage weekly scores</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="size-4 text-yellow-600" />
          <span className="text-sm text-yellow-800 font-medium">Admin Only</span>
        </div>
      </div>

      {/* Week Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Week to Edit
        </label>
        <div className="flex gap-4 items-end">
          <div className="relative flex-1 max-w-xs">
            <select
              value={selectedWeek}
              onChange={(e) => handleWeekChange(Number(e.target.value))}
              className="appearance-none w-full px-4 py-2.5 pr-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-gray-900"
            >
              {weekOptions.map((week) => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={() => loadWeekScores(selectedWeek)}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Load Existing Scores
          </button>
        </div>
      </div>

      {/* Score Entry Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Week {selectedWeek} Scores</h3>
        </div>

        <div className="p-6">
          {contestants.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">
              No contestants found. Add contestants in your Supabase dashboard first.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contestants.map((contestant) => (
                <div
                  key={contestant.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{contestant.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`
                          inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                          ${
                            contestant.tribe === 'Vatu'
                              ? 'bg-purple-100 text-purple-700'
                              : contestant.tribe === 'Cila'
                              ? 'bg-orange-100 text-orange-700'
                              : contestant.tribe === 'Kalo'
                              ? 'bg-teal-100 text-teal-700'
                              : contestant.tribe === 'Blue'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                          }
                        `}
                      >
                        {contestant.tribe}
                      </span>
                      {contestant.isEliminated && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700">
                          Eliminated
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scores[contestant.id] ?? ''}
                      onChange={(e) => handleScoreChange(contestant.id, e.target.value)}
                      placeholder="0"
                      disabled={contestant.isEliminated}
                      className="w-20 px-3 py-2 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              {saveStatus === 'success' && (
                <>
                  <CheckCircle className="size-5 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">
                    Scores saved to Supabase!
                  </span>
                </>
              )}
              {saveStatus === 'error' && (
                <>
                  <AlertCircle className="size-5 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">
                    {saveError ?? 'Error saving scores. Please try again.'}
                  </span>
                </>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving' || contestants.length === 0}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {saveStatus === 'saving' ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Save className="size-5" />
              )}
              {saveStatus === 'saving' ? 'Saving to Supabase…' : 'Save Weekly Scores'}
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">Instructions</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-medium">1.</span>
            <span>Select the week you want to edit from the dropdown above</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">2.</span>
            <span>Enter point values for each contestant (0–100 points)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">3.</span>
            <span>
              Click <strong>Load Existing Scores</strong> to populate inputs with previously saved
              values
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">4.</span>
            <span>
              Click <strong>Save Weekly Scores</strong> — scores are upserted to Supabase and the
              leaderboard updates immediately
            </span>
          </li>
        </ul>
      </div>

      {/* Production note */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> In production, protect this route with Supabase Auth + Row Level
          Security so only authorized family members can edit scores.
        </p>
      </div>
    </div>
  );
}
