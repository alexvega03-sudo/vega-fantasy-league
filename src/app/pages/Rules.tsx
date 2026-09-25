import { BookOpen, Users, Target, Calendar, Award, Trophy, Star, Zap, Skull, ExternalLink } from 'lucide-react';
import { useGame } from '../context/GameContext';

const TRIBE_STYLES: Record<
  string,
  { header: string; name: string; remaining: string; border: string; badge: string; dot: string; nameBg: string }
> = {
  Toka: {
    header: 'bg-yellow-400',
    name: 'text-gray-900',
    remaining: 'text-gray-700',
    border: 'border-yellow-300',
    badge: 'bg-yellow-100 text-yellow-800',
    dot: 'bg-yellow-500',
    nameBg: 'bg-yellow-50',
  },
  Savu: {
    header: 'bg-purple-600',
    name: 'text-white',
    remaining: 'text-white/70',
    border: 'border-purple-300',
    badge: 'bg-purple-100 text-purple-800',
    dot: 'bg-purple-500',
    nameBg: 'bg-purple-50',
  },
  Vatu: {
    header: 'bg-purple-600',
    name: 'text-white',
    remaining: 'text-white/70',
    border: 'border-purple-300',
    badge: 'bg-purple-100 text-purple-800',
    dot: 'bg-purple-500',
    nameBg: 'bg-purple-50',
  },
  Cila: {
    header: 'bg-orange-500',
    name: 'text-white',
    remaining: 'text-white/70',
    border: 'border-orange-300',
    badge: 'bg-orange-100 text-orange-800',
    dot: 'bg-orange-400',
    nameBg: 'bg-orange-50',
  },
  Kalo: {
    header: 'bg-teal-600',
    name: 'text-white',
    remaining: 'text-white/70',
    border: 'border-teal-300',
    badge: 'bg-teal-100 text-teal-800',
    dot: 'bg-teal-500',
    nameBg: 'bg-teal-50',
  },
};

const FALLBACK_TRIBE_STYLES = {
  header: 'bg-blue-600',
  name: 'text-white',
  remaining: 'text-white/70',
  border: 'border-blue-300',
  badge: 'bg-blue-100 text-blue-800',
  dot: 'bg-blue-500',
  nameBg: 'bg-blue-50',
};

const TRIBE_ORDER = ['Toka', 'Savu', 'Cila', 'Kalo', 'Vatu'];

const SCORE_FIVE_S50 = [
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
];

const SCORE_FIVE_S51 = [
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
  'Buys something with fire tokens',
];

const SCORE_TEN_S50 = [
  'Wins an individual Reward Challenge',
  'Finds a hidden immunity idol',
  'Voted out while in possession of a hidden immunity idol or game advantage',
  "Plays their 'Shot in the Dark'",
  'Torch gets snuffed as a result of a blindside',
  'Gets treated for a medical emergency',
  'Chooses to forfeit the game',
  'Catches seafood or wildlife',
  "Tampers with or steals the tribe's food",
  'Plays a fake immunity idol at Tribal Council',
  "Searches through someone else's bag",
  'Voted out unanimously',
  'A hidden immunity idol is played on them by another player',
];

const SCORE_TEN_S51 = [
  'Wins an individual Reward Challenge',
  'Finds a hidden immunity idol',
  'Voted out while in possession of a hidden immunity idol or game advantage',
  "Plays their 'Shot in the Dark'",
  'Torch gets snuffed as a result of a blindside',
  'Gets treated for a medical emergency',
  'Chooses to forfeit the game',
  'Catches seafood or wildlife',
  "Tampers with or steals the tribe's food",
  'Plays a fake immunity idol at Tribal Council',
  "Searches through someone else's bag",
  'Voted out unanimously',
  'A hidden immunity idol is played on them by another player',
  'Is chosen to flip the "million-dollar coin"',
  'Is chosen to go on a journey or sent to Exile Island',
];

const SCORE_FIFTEEN_S50 = [
  'Wins an individual Immunity Challenge',
  "Draws a SAFE scroll as a result of playing their 'Shot in the Dark'",
  'Wins a fire-making challenge',
  'Gives an immunity idol/necklace away or plays it for another player',
  'Creates a fake immunity idol',
  'Successfully gets another player to play their fake idol at Tribal Council',
  'Is forced to leave the game by no choice of their own (aside from being voted off)',
];

const SCORE_FIFTEEN_S51 = [
  'Wins an individual Immunity Challenge',
  "Draws a SAFE scroll as a result of playing their 'Shot in the Dark'",
  'Wins a fire-making challenge',
  'Gives an immunity idol/necklace away or plays it for another player',
  'Creates a fake immunity idol',
  'Successfully gets another player to play their fake idol at Tribal Council',
  'Is forced to leave the game by no choice of their own (aside from being voted off)',
  'Returns to the game after being voted off/eliminated',
  'Successfully flips the "million-dollar" coin and isn\'t eliminated',
];

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
    green:  { header: 'bg-green-600',  badge: 'bg-green-100 text-green-800',   border: 'border-green-200'  },
    blue:   { header: 'bg-blue-600',   badge: 'bg-blue-100 text-blue-800',     border: 'border-blue-200'   },
    purple: { header: 'bg-purple-600', badge: 'bg-purple-100 text-purple-800', border: 'border-purple-200' },
  }[color];

  return (
    <div className={`score-category rounded-xl border ${styles.border} overflow-hidden`}>
      <div className={`score-category-header ${styles.header} px-5 py-3 flex items-center gap-3`}>
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
  const { contestants, season } = useGame();
  const isSeason51 = season.id === '51';

  const tribes = Array.from(
    contestants.reduce((map, contestant) => {
      const members = map.get(contestant.tribe) ?? [];
      members.push(contestant);
      map.set(contestant.tribe, members);
      return map;
    }, new Map<string, typeof contestants>())
  )
    .map(([name, members]) => ({
      name,
      members: [...members].sort((a, b) => a.name.localeCompare(b.name)),
      styles: TRIBE_STYLES[name] ?? FALLBACK_TRIBE_STYLES,
    }))
    .sort((a, b) => {
      const orderA = TRIBE_ORDER.indexOf(a.name);
      const orderB = TRIBE_ORDER.indexOf(b.name);
      return (orderA === -1 ? 99 : orderA) - (orderB === -1 ? 99 : orderB);
    });

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
                {isSeason51 ? (
                  <>
                    After episode 1 airs, each person picks <strong>four (4) castaways from each tribe</strong> that
                    you think will make it to the end of the game to be in your own <em>'Fantasy Tribe'</em>. You
                    should have <strong>eight (8) picks in total</strong> (4 picks/tribe × 2).
                  </>
                ) : (
                  <>
                    After episode 1 airs, each person picks <strong>three (3) castaways from each tribe</strong> that
                    you think will make it to the end of the game to be in your own <em>'Fantasy Tribe'</em>. You
                    should have <strong>nine (9) picks in total</strong> (3 picks/tribe × 3).
                  </>
                )}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 size-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <p className="text-gray-700 leading-relaxed">
                Out of your {isSeason51 ? 'eight' : 'nine'} picks, choose <strong>ONE</strong> of them to be your{' '}
                <strong>MVP</strong> — the castaway you think will be the Sole Survivor and win the game. You'll
                get extra bonus points at the end of the season if you guessed right!
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 size-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <p className="text-gray-700 leading-relaxed">
                {isSeason51 ? (
                  <>
                    Bookmark this site and check back <strong>every Friday evening after 6pm</strong> throughout
                    the season to see how many points your picks racked up for the week. Points begin to
                    accumulate starting with <strong>episode 2</strong> (Wednesday, September 30).
                  </>
                ) : (
                  <>
                    Bookmark this site and check back <strong>every Friday</strong> throughout the season to see how
                    many points your picks racked up for the week. Points begin to accumulate starting
                    with <strong>episode 2</strong>.
                  </>
                )}
              </p>
            </div>

            {!season.archived && (
              <div className="pt-1">
                <a
                  href="https://www.globaltv.com/survivor-51-fantasy-tribe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center"
                >
                  Check out the Season 51 cast bios to help with your decision
                  <ExternalLink className="size-4 shrink-0" />
                </a>
              </div>
            )}

            {/* ── Tribe cards ── */}
            <div className="pt-2">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Season Castaways by Tribe
              </p>
              {tribes.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
                  Castaways will be listed here after the season begins.
                </div>
              ) : (
                <>
              <div className={`grid grid-cols-1 ${tribes.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
                {tribes.map((tribe) => (
                  <div
                    key={tribe.name}
                    className={`rounded-xl border-2 ${tribe.styles.border} overflow-hidden`}
                  >
                    <div className={`${tribe.styles.header} px-4 py-3 flex items-center gap-2`}>
                      <div className={`size-3 rounded-full ${tribe.styles.name === 'text-gray-900' ? 'bg-gray-900/30' : 'bg-white/40'}`} />
                      <span className={`${tribe.styles.name} font-bold text-base`}>{tribe.name}</span>
                      <span className={`ml-auto ${tribe.styles.remaining} text-xs font-medium`}>
                        {tribe.members.filter((member) => !member.isEliminated).length} remaining
                      </span>
                    </div>

                    <div className={`${tribe.styles.nameBg} divide-y divide-white/60`}>
                      {tribe.members.map((member) => {
                        const eliminated = member.isEliminated;
                        return (
                          <div
                            key={member.id}
                            className={`px-4 py-2.5 flex items-center justify-between gap-2 ${
                              eliminated ? 'opacity-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {eliminated ? (
                                <Skull className="size-3.5 text-gray-400 shrink-0" />
                              ) : (
                                <div className={`size-2 rounded-full ${tribe.styles.dot} shrink-0`} />
                              )}
                              <span
                                className={`text-sm font-medium ${
                                  eliminated
                                    ? 'line-through text-gray-400'
                                    : 'text-gray-800'
                                }`}
                              >
                                {member.name}
                              </span>
                            </div>
                            {eliminated && (
                              <span className="text-xs text-gray-400 font-medium shrink-0">
                                Out
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                Strikethrough indicates the castaway has been eliminated. Updates automatically.
              </p>
                </>
              )}
            </div>

            {/* Merge bonus callout */}
            <div className="mt-2 bg-amber-50 border border-amber-300 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="size-5 text-amber-500" />
                <span className="font-bold text-amber-900 text-base">MERGE BONUS!</span>
              </div>
              <p className="text-amber-800 text-sm leading-relaxed">
                {isSeason51 ? (
                  <>
                    After the tribes merge, you can pick <strong>ONE extra castaway</strong> if you lost players
                    before the merge. You cannot have more than <strong>eight castaways</strong> in your Fantasy
                    Tribe at any time. If you still have all eight, you may <strong>swap</strong> one weaker pick
                    for a stronger player. Extra picks and swaps are <strong>not retroactive</strong> — they take
                    effect on the episode following the merge, and you keep points already earned from a
                    swapped-out player.
                  </>
                ) : (
                  <>
                    After the tribes merge, you can pick <strong>ONE extra castaway</strong> to add to your
                    'Fantasy Tribe'. If you lost some players before the merge, this is your chance to
                    bolster your team. Points for this extra pick are <strong>not retroactive</strong> and will
                    begin to accumulate on the episode following the merge.
                  </>
                )}
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
                <ScoreRow points={1} label="Per castaway for each week they survive prior to the merge" />
                <ScoreRow points={3} label="Per castaway for each week they survive post-merge" />
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
                  items={isSeason51 ? SCORE_FIVE_S51 : SCORE_FIVE_S50}
                />
                <ScoreCategory
                  pts={10}
                  color="blue"
                  items={isSeason51 ? SCORE_TEN_S51 : SCORE_TEN_S50}
                />
                <ScoreCategory
                  pts={15}
                  color="purple"
                  items={isSeason51 ? SCORE_FIFTEEN_S51 : SCORE_FIFTEEN_S50}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Weekly Updates ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Calendar className="size-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Weekly Updates</h3>
          </div>
          <div className="p-6 space-y-2">
            {[
              'Points are tallied after each episode airs',
              isSeason51
                ? 'The leaderboard updates every Friday evening after 6pm with new weekly scores'
                : 'The leaderboard updates every Friday with new weekly scores',
              'Check the Weekly Breakdown page to see detailed scoring per episode',
              ...(isSeason51 ? ['Points begin to accumulate starting with episode 2'] : []),
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-500 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Winning ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <Award className="size-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Winning the League</h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The person with the highest total points at the end of the Survivor season is
              crowned the Fantasy League Champion!
            </p>
            {isSeason51 && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 space-y-2">
                <p className="text-gray-700 leading-relaxed">
                  Nine people are playing Season 51. Buy-in is <strong>$25</strong> — the winner takes{' '}
                  <strong>$225</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Venmo{' '}
                  <a
                    href="https://venmo.com/u/alexxxvegaaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600"
                  >
                    @alexxxvegaaa
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
