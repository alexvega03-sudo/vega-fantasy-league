import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigError =
  !supabaseUrl || !supabaseAnonKey
    ? 'Missing Supabase environment variables. Copy .env.example to .env, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your Supabase project settings, then restart the dev server.'
    : null;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ─── Type definitions matching the DB schema ────────────────────────────────

export interface DbPlayer {
  id: string;
  name: string;
  color: string;
  mvp_contestant_id: string | null;
  created_at: string;
}

export interface DbContestant {
  id: string;
  name: string;
  tribe: string;
  is_eliminated: boolean;
  created_at: string;
}

export interface DbWeeklyScore {
  id: string;
  week_number: number;
  contestant_id: string;
  points: number;
  created_at: string;
}

export interface DbPlayerPick {
  id: string;
  player_id: string;
  contestant_id: string;
  pick_week: number;
  created_at: string;
}
