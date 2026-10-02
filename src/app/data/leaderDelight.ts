const LEADER_GIFS = [
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazE2dWd4YnN0ZXVtMzlobWh4Mmt0YmRuOGNuaGw5YTBlMDhlNjB5NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qe7NuLKfN0mU95Fgtk/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazE2dWd4YnN0ZXVtMzlobWh4Mmt0YmRuOGNuaGw5YTBlMDhlNjB5NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hqTfufdLWtsmpG4uEo/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NG56MjF5YnlvZHQ2aTB1MW5ydmRkanp4MWlzM2V3dGl6enpmN3l0OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CQmfYzqIn3Il0dznHI/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazE2dWd4YnN0ZXVtMzlobWh4Mmt0YmRuOGNuaGw5YTBlMDhlNjB5NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IhljdgZteaKTYWRNES/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NG56MjF5YnlvZHQ2aTB1MW5ydmRkanp4MWlzM2V3dGl6enpmN3l0OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3WnKPQFm56OsLkAMQD/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a3Nzc3MxZG9lajVsNXA1c2pvb2ZoZ2F3d2xja3l1djJ0bWVvdW4xbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mQhmGMgbQXxdxX2m0a/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3a3Nzc3MxZG9lajVsNXA1c2pvb2ZoZ2F3d2xja3l1djJ0bWVvdW4xbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dzCmtIdRrfiwtiTCaf/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2h5M2d1NzJub3NzNWt2cGVwcmQ4d2I0Ymdxa3FqbXYwazJ5N2lxZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ohs7Ii3AcdgCSuApO/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YW5uMGVkdGU2azg4bjRua2V2ZHlzN2ZobWk0d3E3NXMwMzlhNndieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3gCn7Knv3rvBFyjKi3/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cDh6bzJyMWwwbnJ5aXMyOXAzMWcydnoxM2x0dmlhYnkxOWZpdG45NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GZgkFb10aiBTZ3TeWI/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDZkOHY3d2VuYndxdnVxaGoyYmVtYmNtdDhkeGJxZnA4d2dmenJkOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dBf8upGy75Fd8TbvF5/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDZkOHY3d2VuYndxdnVxaGoyYmVtYmNtdDhkeGJxZnA4d2dmenJkOCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WOx1SMrJoJe7C9jxzL/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MHFmdDhvbzBxYjNnZ21xb2R0MHg5ZHMwcHIxZ3Nqamd0Z2xjYXA0eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5iysFckGXQHJvPhYXV/giphy.gif',
];

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

export function gifSrcForWeek(week: number) {
  const offset = Math.max(week, 2) - 2;
  const cycle = Math.floor(offset / LEADER_GIFS.length);
  const index = offset % LEADER_GIFS.length;
  const deck = shuffledDeck(cycle);
  if (cycle > 0) {
    const previousLast = shuffledDeck(cycle - 1)[LEADER_GIFS.length - 1];
    if (deck[0] === previousLast) {
      deck.push(deck.shift() as string);
    }
  }
  return deck[index];
}
