const LEADER_GIFS = [
  'https://media.giphy.com/media/qe7NuLKfN0mU95Fgtk/giphy.gif',
  'https://media.giphy.com/media/hqTfufdLWtsmpG4uEo/giphy.gif',
  'https://media.giphy.com/media/CQmfYzqIn3Il0dznHI/giphy.gif',
  'https://media.giphy.com/media/IhljdgZteaKTYWRNES/giphy.gif',
  'https://media.giphy.com/media/3WnKPQFm56OsLkAMQD/giphy.gif',
  'https://media.giphy.com/media/mQhmGMgbQXxdxX2m0a/giphy.gif',
  'https://media.giphy.com/media/dzCmtIdRrfiwtiTCaf/giphy.gif',
  'https://media.giphy.com/media/3ohs7Ii3AcdgCSuApO/giphy.gif',
  'https://media.giphy.com/media/3gCn7Knv3rvBFyjKi3/giphy.gif',
  'https://media.giphy.com/media/GZgkFb10aiBTZ3TeWI/giphy.gif',
  'https://media.giphy.com/media/dBf8upGy75Fd8TbvF5/giphy.gif',
  'https://media.giphy.com/media/WOx1SMrJoJe7C9jxzL/giphy.gif',
  'https://media.giphy.com/media/5iysFckGXQHJvPhYXV/giphy.gif',
];

export const LEADER_GIF_COUNT = LEADER_GIFS.length;

function hashSeed(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomFrom(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function shuffledDeck(cycle: number) {
  const deck = [...LEADER_GIFS];
  const random = randomFrom(hashSeed(`leader-delight-cycle-${cycle}`));
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function gifSrcForWeek(week: number, skip = 0) {
  const offset = Math.max(week, 2) - 2;
  const cycle = Math.floor(offset / LEADER_GIFS.length);
  const index = (offset + skip) % LEADER_GIFS.length;
  const deck = shuffledDeck(cycle);
  if (cycle > 0) {
    const previousLast = shuffledDeck(cycle - 1)[LEADER_GIFS.length - 1];
    if (deck[0] === previousLast) {
      deck.push(deck.shift() as string);
    }
  }
  return deck[index];
}
