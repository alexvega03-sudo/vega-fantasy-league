import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Type definitions matching the DB schema ────────────────────────────────

export interface DbPlayer {
  id: string;
  name: string;
  color: string;
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
  created_at: string;
}
