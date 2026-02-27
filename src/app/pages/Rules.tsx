import { BookOpen, Trophy, Users, Target, Calendar, Award } from 'lucide-react';

export function Rules() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">League Rules</h2>
          <p className="text-gray-500 mt-1">How the Vega Family Survivor Fantasy League works</p>
        </div>
        <BookOpen className="size-8 text-blue-500" />
      </div>

      {/* Overview Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-3">Welcome to the Fantasy League!</h3>
        <p className="text-lg opacity-90">
          Each family member drafts Survivor contestants and earns points based on their 
          performance throughout the season. The player with the most points at the end wins!
        </p>
      </div>

      {/* Rules Sections */}
      <div className="space-y-4">
        {/* Draft Rules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Users className="size-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">The Draft</h3>
          </div>
          <div className="p-6 space-y-3">
            <p className="text-gray-700 leading-relaxed">
              Before the season starts, each family member drafts their team of Survivor contestants:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Each player selects 2 contestants through a snake draft</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Draft order is determined randomly before the season</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Once drafted, contestants cannot be traded or swapped</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Scoring Rules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Target className="size-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Scoring System</h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Contestants earn points each week based on their actions and outcomes:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="font-semibold text-green-900 mb-1">Survival</div>
                <div className="text-sm text-green-800">+5 points for not being eliminated</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-900 mb-1">Individual Immunity</div>
                <div className="text-sm text-blue-800">+10 points for winning individual immunity</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="font-semibold text-purple-900 mb-1">Reward Challenge</div>
                <div className="text-sm text-purple-800">+5 points for winning a reward</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="font-semibold text-yellow-900 mb-1">Finding an Idol</div>
                <div className="text-sm text-yellow-800">+8 points for finding a hidden immunity idol</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="font-semibold text-orange-900 mb-1">Playing an Idol</div>
                <div className="text-sm text-orange-800">+5 points for successfully playing an idol</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="font-semibold text-red-900 mb-1">Eliminated</div>
                <div className="text-sm text-red-800">0 points once voted out (no future points)</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-4">
              <div className="font-semibold text-gray-900 mb-2">Bonus Points</div>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Making it to the merge: +15 points</li>
                <li>• Making it to the final three: +20 points</li>
                <li>• Winning Sole Survivor: +50 points</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Weekly Updates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Calendar className="size-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Weekly Updates</h3>
          </div>
          <div className="p-6 space-y-3">
            <ul className="space-y-2 ml-2">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>Points are tallied after each episode airs</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>The leaderboard updates automatically with new weekly scores</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>Check the Weekly Breakdown page to see detailed scoring</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Winning */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Award className="size-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Winning the League</h3>
          </div>
          <div className="p-6 space-y-3">
            <p className="text-gray-700 leading-relaxed">
              The family member with the highest total points at the end of the Survivor season 
              is crowned the Fantasy League Champion!
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="font-semibold text-yellow-900 mb-1">🏆 Grand Prize</div>
              <p className="text-sm text-yellow-800">
                Bragging rights for the entire year + winner picks the location for next year's family vacation!
              </p>
            </div>
          </div>
        </div>

        {/* Strategy Tips */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Trophy className="size-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Strategy Tips</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-2 ml-2">
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Balance your picks between strong physical players and strategic masterminds</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Players who make it far earn consistent weekly survival points</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Challenge beasts can rack up big immunity win bonuses</span>
              </li>
              <li className="text-gray-700 flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>The winner bonus is huge—try to draft a potential Sole Survivor!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p className="text-blue-900 font-medium">
          Good luck to all the Vega family players! May the best fantasy manager win! 🎉
        </p>
      </div>
    </div>
  );
}
