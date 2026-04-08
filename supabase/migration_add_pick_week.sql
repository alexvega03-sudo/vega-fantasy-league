-- ─── Migration: Add pick_week to player_picks ────────────────────────────────
-- Run this in: Supabase Dashboard → SQL Editor → New Query
--
-- pick_week = the first week whose points count toward a player's score.
-- All existing picks default to 1 (points always counted).
-- Late picks added mid-game should be set to 7.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE player_picks
  ADD COLUMN IF NOT EXISTS pick_week int NOT NULL DEFAULT 1
    CHECK (pick_week >= 1);

-- ─── How to add a late pick (Week 7 start) ───────────────────────────────────
-- Replace the UUIDs below with the real player_id and contestant_id.
--
-- INSERT INTO player_picks (player_id, contestant_id, pick_week)
-- VALUES (
--   '<player-uuid>',
--   '<contestant-uuid>',
--   7
-- );
--
-- Or if the pick row already exists and you just need to update it:
-- UPDATE player_picks
--    SET pick_week = 7
--  WHERE player_id    = '<player-uuid>'
--    AND contestant_id = '<contestant-uuid>';
