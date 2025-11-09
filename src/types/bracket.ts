/**
 * Types for Tournament Bracket Visualization
 * Supporting Double Elimination (DE64) format
 */

export interface BracketPlayer {
  id: string;
  display_name: string | null;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  seed_number?: number | null;
}

export type MatchStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type BracketType = string; // SABO format: 'WB' (Winner Bracket), 'LB-A', 'LB-B' (Loser Brackets), 'CROSS' (Cross Finals)

export interface BracketMatch {
  id: string;
  tournament_id: string;
  round_number: number;
  match_number: number;
  bracket_type: BracketType;
  bracket_group?: string; // For SABO DE64: A, B, C, D, or CROSS
  
  // Players
  player1_id: string | null;
  player1_name: string | null;
  player1?: BracketPlayer | null;
  
  player2_id: string | null;
  player2_name: string | null;
  player2?: BracketPlayer | null;
  
  // Results
  player1_score: number | null;
  player2_score: number | null;
  winner_id: string | null;
  loser_id: string | null;
  
  // Status
  status: MatchStatus;
  scheduled_time: string | null;
  started_at: string | null;
  completed_at: string | null;
  
  // Position
  bracket_position: number | null;
  next_match_id: string | null;
  
  // Advancement (SABO format codes)
  winner_advances_to: number | null;
  loser_advances_to: number | null;
  
  created_at: string;
  updated_at: string;
}

export interface BracketRound {
  round_number: number;
  round_name: string;
  matches: BracketMatch[];
  bracket_type: BracketType;
}

export interface BracketStructure {
  winner_bracket: BracketRound[];
  loser_bracket: BracketRound[];
  grand_finals: BracketMatch[];
  total_rounds: number;
  total_matches: number;
}

export interface DE64Config {
  // Winner Bracket: 64 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1 (7 rounds)
  winner_rounds: number;
  
  // Loser Bracket: Complex structure with 12 rounds
  loser_rounds: number;
  
  // Grand Finals: Best of 3 or Best of 5
  grand_finals_matches: number;
  
  total_matches: number; // 127 matches for DE64
}

export const DE64_CONFIG: DE64Config = {
  winner_rounds: 7,
  loser_rounds: 12,
  grand_finals_matches: 2, // Grand Finals + Potential Reset
  total_matches: 127
};

export const WINNER_ROUND_NAMES: Record<number, string> = {
  1: 'Round 1 (64)',
  2: 'Round 2 (32)',
  3: 'Round 3 (16)',
  4: 'Quarter Finals',
  5: 'Semi Finals',
  6: 'Winner Finals',
  7: 'Grand Finals'
};

export const LOSER_ROUND_NAMES: Record<number, string> = {
  1: 'LR1 (32)',
  2: 'LR2 (32)',
  3: 'LR3 (16)',
  4: 'LR4 (16)',
  5: 'LR5 (8)',
  6: 'LR6 (8)',
  7: 'LR7 (4)',
  8: 'LR8 (4)',
  9: 'LR9 (2)',
  10: 'LR10 (2)',
  11: 'Loser Finals',
  12: 'Grand Finals'
};
