import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import {
  Save,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Loader2,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';

const ADMIN_PASSWORD = 'red-panda';

// ─── Password gate ────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-64 py-16">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="size-14 bg-yellow-50 border border-yellow-200 rounded-full flex items-center justify-center">
            <Lock className="size-7 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Admin Access</h3>
            <p className="text-sm text-gray-500 mt-1">Enter the password to continue</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Password"
              autoFocus
              className={`w-full px-4 py-3 pr-11 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
                error
                  ? 'border-red-400 focus:ring-red-300 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-300'
              }`}
            />
            <button
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="size-4 shrink-0" />
              Incorrect password. Please try again.
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin panel ──────────────────────────────────────────────────────────────
function AdminPanel() {
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

  useEffect(() => {
    setSelectedWeek(currentWeek);
  }, [currentWeek]);

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
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          contestant.tribe === 'Vatu'
                            ? 'bg-purple-100 text-purple-700'
                            : contestant.tribe === 'Cila'
                            ? 'bg-orange-100 text-orange-700'
                            : contestant.tribe === 'Kalo'
                            ? 'bg-teal-100 text-teal-700'
                            : contestant.tribe === 'Blue'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-red-100 text-red-700'
                        }`}
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
                      max="999"
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
            <span>Enter point values for each contestant</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-medium">3.</span>
            <span>
              Click <strong>Load Existing Scores</strong> to populate inputs with previously saved values
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
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function Admin() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('admin_unlocked') === 'true'
  );

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return <AdminPanel />;
}
