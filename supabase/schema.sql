-- ═══════════════════════════════════════════════════════════════════════════════
-- Vega Family Fantasy League – Supabase SQL Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── Enable UUID generation ──────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ─── 1. players ──────────────────────────────────────────────────────────────
-- Each Vega family member who participates in the fantasy league.
create table if not exists players (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  color      text not null default '#3b82f6',  -- hex color for UI distinction
  created_at timestamptz not null default now()
);

-- ─── 2. contestants ──────────────────────────────────────────────────────────
-- The Survivor (or other show) contestants being drafted.
create table if not exists contestants (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  tribe          text not null default 'Unknown',
  is_eliminated  boolean not null default false,
  created_at     timestamptz not null default now()
);

-- ─── 3. player_picks ─────────────────────────────────────────────────────────
-- Draft assignments: which contestants each player drafted.
-- A player can draft many contestants; a contestant can only be drafted once.
create table if not exists player_picks (
  id             uuid primary key default gen_random_uuid(),
  player_id      uuid not null references players(id) on delete cascade,
  contestant_id  uuid not null references contestants(id) on delete cascade,
  created_at     timestamptz not null default now(),
  unique (contestant_id)          -- one contestant per player only
);

create index if not exists idx_player_picks_player     on player_picks(player_id);
create index if not exists idx_player_picks_contestant on player_picks(contestant_id);

-- ─── 4. weekly_scores ────────────────────────────────────────────────────────
-- Points awarded to each contestant per episode week.
-- The unique constraint on (week_number, contestant_id) enables upsert.
create table if not exists weekly_scores (
  id             uuid primary key default gen_random_uuid(),
  week_number    int not null check (week_number >= 1),
  contestant_id  uuid not null references contestants(id) on delete cascade,
  points         int not null default 0 check (points >= 0),
  created_at     timestamptz not null default now(),
  unique (week_number, contestant_id)
);

create index if not exists idx_weekly_scores_week        on weekly_scores(week_number);
create index if not exists idx_weekly_scores_contestant  on weekly_scores(contestant_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- Row Level Security (RLS)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
alter table players       enable row level security;
alter table contestants   enable row level security;
alter table player_picks  enable row level security;
alter table weekly_scores enable row level security;

-- Public read access (anyone with the anon key can view data)
create policy "Allow public read on players"
  on players for select using (true);

create policy "Allow public read on contestants"
  on contestants for select using (true);

create policy "Allow public read on player_picks"
  on player_picks for select using (true);

create policy "Allow public read on weekly_scores"
  on weekly_scores for select using (true);

-- Write access: lock down to authenticated users only.
-- In production, add admin-role checks here.

create policy "Allow authenticated insert on players"
  on players for insert to authenticated with check (true);

create policy "Allow authenticated update on players"
  on players for update to authenticated using (true);

create policy "Allow authenticated insert on contestants"
  on contestants for insert to authenticated with check (true);

create policy "Allow authenticated update on contestants"
  on contestants for update to authenticated using (true);

create policy "Allow authenticated insert on player_picks"
  on player_picks for insert to authenticated with check (true);

create policy "Allow authenticated delete on player_picks"
  on player_picks for delete to authenticated using (true);

create policy "Allow authenticated upsert on weekly_scores"
  on weekly_scores for insert to authenticated with check (true);

create policy "Allow authenticated update on weekly_scores"
  on weekly_scores for update to authenticated using (true);

-- ═══════════════════════════════════════════════════════════════════════════════
-- Seed data – mirrors the original mock data
-- (Safe to skip if you want a clean database)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Insert family members (players)
insert into players (id, name, color) values
  ('11111111-0000-0000-0000-000000000001', 'Maria Vega',    '#3b82f6'),
  ('11111111-0000-0000-0000-000000000002', 'Carlos Vega',   '#10b981'),
  ('11111111-0000-0000-0000-000000000003', 'Sofia Vega',    '#f59e0b'),
  ('11111111-0000-0000-0000-000000000004', 'Diego Vega',    '#ef4444'),
  ('11111111-0000-0000-0000-000000000005', 'Isabella Vega', '#8b5cf6')
on conflict (id) do nothing;

-- Insert contestants
insert into contestants (id, name, tribe, is_eliminated) values
  ('22222222-0000-0000-0000-000000000001', 'Sarah Martinez',   'Blue', false),
  ('22222222-0000-0000-0000-000000000002', 'James Cooper',     'Red',  false),
  ('22222222-0000-0000-0000-000000000003', 'Emily Chen',       'Blue', false),
  ('22222222-0000-0000-0000-000000000004', 'Marcus Johnson',   'Red',  false),
  ('22222222-0000-0000-0000-000000000005', 'Rachel Kim',       'Blue', false),
  ('22222222-0000-0000-0000-000000000006', 'David Thompson',   'Red',  true),
  ('22222222-0000-0000-0000-000000000007', 'Jessica Brown',    'Blue', false),
  ('22222222-0000-0000-0000-000000000008', 'Tyler Williams',   'Red',  true),
  ('22222222-0000-0000-0000-000000000009', 'Amanda Rodriguez', 'Blue', false),
  ('22222222-0000-0000-0000-000000000010', 'Chris Anderson',   'Red',  false)
on conflict (id) do nothing;

-- Assign draft picks (mirrors draftPicks in mockData.ts)
insert into player_picks (player_id, contestant_id) values
  ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001'), -- Maria  → Sarah
  ('11111111-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000006'), -- Maria  → David
  ('11111111-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000002'), -- Carlos → James
  ('11111111-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000007'), -- Carlos → Jessica
  ('11111111-0000-0000-0000-000000000003', '22222222-0000-0000-0000-000000000003'), -- Sofia  → Emily
  ('11111111-0000-0000-0000-000000000003', '22222222-0000-0000-0000-000000000008'), -- Sofia  → Tyler
  ('11111111-0000-0000-0000-000000000004', '22222222-0000-0000-0000-000000000004'), -- Diego  → Marcus
  ('11111111-0000-0000-0000-000000000004', '22222222-0000-0000-0000-000000000009'), -- Diego  → Amanda
  ('11111111-0000-0000-0000-000000000005', '22222222-0000-0000-0000-000000000005'), -- Isabella → Rachel
  ('11111111-0000-0000-0000-000000000005', '22222222-0000-0000-0000-000000000010')  -- Isabella → Chris
on conflict (contestant_id) do nothing;

-- Insert week 1 scores
insert into weekly_scores (week_number, contestant_id, points) values
  (1, '22222222-0000-0000-0000-000000000001', 12),
  (1, '22222222-0000-0000-0000-000000000002',  8),
  (1, '22222222-0000-0000-0000-000000000003', 15),
  (1, '22222222-0000-0000-0000-000000000004', 10),
  (1, '22222222-0000-0000-0000-000000000005',  7),
  (1, '22222222-0000-0000-0000-000000000006', 14),
  (1, '22222222-0000-0000-0000-000000000007',  9),
  (1, '22222222-0000-0000-0000-000000000008', 11),
  (1, '22222222-0000-0000-0000-000000000009', 13),
  (1, '22222222-0000-0000-0000-000000000010',  6)
on conflict (week_number, contestant_id) do nothing;

-- Insert week 2 scores
insert into weekly_scores (week_number, contestant_id, points) values
  (2, '22222222-0000-0000-0000-000000000001', 10),
  (2, '22222222-0000-0000-0000-000000000002', 12),
  (2, '22222222-0000-0000-0000-000000000003',  8),
  (2, '22222222-0000-0000-0000-000000000004', 15),
  (2, '22222222-0000-0000-0000-000000000005',  9),
  (2, '22222222-0000-0000-0000-000000000006',  7),
  (2, '22222222-0000-0000-0000-000000000007', 14),
  (2, '22222222-0000-0000-0000-000000000008',  0),
  (2, '22222222-0000-0000-0000-000000000009', 11),
  (2, '22222222-0000-0000-0000-000000000010', 13)
on conflict (week_number, contestant_id) do nothing;

-- Insert week 3 scores
insert into weekly_scores (week_number, contestant_id, points) values
  (3, '22222222-0000-0000-0000-000000000001', 14),
  (3, '22222222-0000-0000-0000-000000000002',  9),
  (3, '22222222-0000-0000-0000-000000000003', 11),
  (3, '22222222-0000-0000-0000-000000000004',  8),
  (3, '22222222-0000-0000-0000-000000000005', 12),
  (3, '22222222-0000-0000-0000-000000000006',  0),
  (3, '22222222-0000-0000-0000-000000000007', 10),
  (3, '22222222-0000-0000-0000-000000000009', 15),
  (3, '22222222-0000-0000-0000-000000000010',  7)
on conflict (week_number, contestant_id) do nothing;
