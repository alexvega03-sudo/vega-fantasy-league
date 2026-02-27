import { BookOpen, Users, Target, Calendar, Award, Trophy, Star, Zap } from 'lucide-react';

// ─── Reusable score row ───────────────────────────────────────────────────────
function ScoreRow({ points, label }: { points: number; label: string }) {
  const color =
    points >= 15
      ? 'bg-purple-100 text-purple-800'
      : points >= 10
      ? 'bg-blue-100 text-blue-800'
      : 'bg-green-100 text-green-800';

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-700 text-sm">{label}</span>
      <span className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ml-4 ${color}`}>
        +{points} pts
      </span>
    </div>
  );
}

// ─── Scoring category block ───────────────────────────────────────────────────
function ScoreCategory({
  pts,
  color,
  items,
}: {
  pts: number;
  color: 'green' | 'blue' | 'purple';
  items: string[];
}) {
  const styles = {
    green:  { header: 'bg-green-600',  badge: 'bg-green-100 text-green-800',  border: 'border-green-200' },
    blue:   { header: 'bg-blue-600',   badge: 'bg-blue-100 text-blue-800',    border: 'border-blue-200'  },
    purple: { header: 'bg-purple-600', badge: 'bg-purple-100 text-purple-800', border: 'border-purple-200' },
  }[color];

  return (
    <div className={`rounded-xl border ${styles.border} overflow-hidden`}>
      <div className={`${styles.header} px-5 py-3 flex items-center gap-3`}>
        <span className="text-white font-bold text-lg">+{pts}</span>
        <span className="text-white font-semibold text-sm">Point Categories</span>
      </div>
      <div className="bg-white divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item} className="px-5 py-2.5 flex items-start gap-2">
            <span className={`mt-0.5 text-xs font-bold px-1.5 py-0.5 rounded ${styles.badge} shrink-0`}>
              +{pts}
            </span>
            <span className="text-gray-700 text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
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

      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-3">Welcome to the Fantasy League!</h3>
        <p className="text-lg opacity-90">
          Each family member drafts Survivor contestants and earns points based on their
          performance throughout the season. The player with the most points at the end wins!
        </p>
      </div>

      <div className="space-y-4">

        {/* ── The Draft ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Users className="size-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">The Draft</h3>
          </div>
          <div className="p-6 space-y-4">

            <div className="flex items-start gap-3">
              <span className="mt-1 size-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <p className="text-gray-700 leading-relaxed">
                After episode 1 airs, each person picks <strong>three (3) castaways from each tribe</strong> that
                you think will make it to the end of the game to be in your own <em>'Fantasy Tribe'</em>. You
                should have <strong>nine (9) picks in total</strong> (3 picks/tribe × 3).
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 size-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <p className="text-gray-700 leading-relaxed">
                Out of your nine picks, choose <strong>ONE</strong> of them to be your <strong>MVP</strong> — the
                castaway you think will be the Sole Survivor and win the game. You'll get extra bonus
                points at the end of the season if you guessed right!
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 size-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <p className="text-gray-700 leading-relaxed">
                Bookmark this site and check back <strong>every Friday</strong> throughout the season to see how
                many points your picks racked up for the week. Points begin to accumulate starting
                with <strong>episode 2</strong>.
              </p>
            </div>

            {/* Merge bonus callout */}
            <div className="mt-2 bg-amber-50 border border-amber-300 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="size-5 text-amber-500" />
                <span className="font-bold text-amber-900 text-base">MERGE BONUS!</span>
              </div>
              <p className="text-amber-800 text-sm leading-relaxed">
                After the tribes merge, you can pick <strong>ONE extra castaway</strong> to add to your
                'Fantasy Tribe'. If you lost some players before the merge, this is your chance to
                bolster your team. Points for this extra pick are <strong>not retroactive</strong> and will
                begin to accumulate on the episode following the merge.
              </p>
            </div>

          </div>
        </div>

        {/* ── Scoring System ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Target className="size-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Scoring System</h3>
          </div>
          <div className="p-6 space-y-6">

            {/* Survival points */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="size-4 text-yellow-500 fill-yellow-400" />
                Survival Points
              </h4>
              <div className="bg-gray-50 rounded-lg border border-gray-200 px-4 py-1">
                <ScoreRow points={1}  label="Per castaway for each week they survive prior to the merge" />
                <ScoreRow points={3}  label="Per castaway for each week they survive post-merge" />
              </div>
            </div>

            {/* End-game bonus points */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Trophy className="size-4 text-yellow-500" />
                End-Game Bonus Points
              </h4>
              <div className="bg-gray-50 rounded-lg border border-gray-200 px-4 py-1">
                <ScoreRow points={10} label="Any of your picks comes in 3rd place" />
                <ScoreRow points={20} label="Any of your picks comes in 2nd place" />
                <ScoreRow points={30} label="Any of your picks wins the game" />
                <ScoreRow points={30} label="Your MVP wins the game" />
              </div>
            </div>

            {/* Weekly bonus categories */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Zap className="size-4 text-blue-500" />
                Additional Weekly Bonus Points
              </h4>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Earn additional weekly bonus points if any of your 'Fantasy Tribe' castaways do any
                of the following <strong>visibly on screen</strong>. Limited to one instance per castaway per
                week (e.g. if your castaway cries multiple times, that's still 5 pts — but if{' '}
                <em>two</em> of your castaways cry, that's 10 pts!). Excludes recaps and "next time on"
                previews.
              </p>

              <div className="space-y-4">

                <ScoreCategory
                  pts={5}
                  color="green"
                  items={[
                    'Wins a group Immunity Challenge',
                    'Wins a group Reward Challenge',
                    'Gets chosen to go on reward',
                    'Finds or gets a game advantage',
                    'Plays a hidden immunity idol on themselves at Tribal Council',
                    'Uses a game advantage at Tribal Council',
                    'Visually cries with tears on camera',
                    'Says a curse word that is bleeped/censored',
                    'Says, "I miss…"',
                    'Kisses another player still in the game',
                    'Gets into a heated argument and shouts at another player',
                    'Has a wardrobe malfunction / shows nudity that is blurred on screen',
                    'Chooses to risk their vote',
                    'Finds a fake immunity idol',
                    'Hugs Jeff',
                    'Is chosen to go on a journey',
                  ]}
                />

                <ScoreCategory
                  pts={10}
                  color="blue"
                  items={[
                    'Wins an individual Reward Challenge',
                    'Finds a hidden immunity idol',
                    'Voted out while in possession of a hidden immunity idol or game advantage',
                    'Plays their \'Shot in the Dark\'',
                    'Torch gets snuffed as a result of a blindside',
                    'Gets treated for a medical emergency',
                    'Chooses to forfeit the game',
                    'Catches seafood or wildlife',
                    'Tampers with or steals the tribe\'s food',
                    'Plays a fake immunity idol at Tribal Council',
                    'Searches through someone else\'s bag',
                    'Voted out unanimously',
                    'A hidden immunity idol is played on them by another player',
                  ]}
                />

                <ScoreCategory
                  pts={15}
                  color="purple"
                  items={[
                    'Wins an individual Immunity Challenge',
                    'Draws a SAFE scroll as a result of playing their \'Shot in the Dark\'',
                    'Wins a fire-making challenge',
                    'Gives an immunity idol/necklace away or plays it for another player',
                    'Creates a fake immunity idol',
                    'Successfully gets another player to play their fake idol at Tribal Council',
                    'Is forced to leave the game by no choice of their own (aside from being voted off)',
                  ]}
                />

              </div>
            </div>
          </div>
        </div>

        {/* ── Weekly Updates (kept) ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Calendar className="size-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Weekly Updates</h3>
          </div>
          <div className="p-6 space-y-2">
            {[
              'Points are tallied after each episode airs',
              'The leaderboard updates every Friday with new weekly scores',
              'Check the Weekly Breakdown page to see detailed scoring per episode',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-500 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Winning (kept) ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Award className="size-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Winning the League</h3>
          </div>
          <div className="p-6 space-y-3">
            <p className="text-gray-700 leading-relaxed">
              The family member with the highest total points at the end of the Survivor season is
              crowned the Fantasy League Champion!
            </p>

          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p className="text-blue-900 font-medium">
          Good luck to all the Vega family players! May the best fantasy manager win! 🎉
        </p>
      </div>
    </div>
  );
}
