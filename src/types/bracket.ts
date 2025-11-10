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
  rank?: string | null; // Player rank code (G, S, D, P, etc.)
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
  // SABO Enhanced DE64: Group-based tournament with cross finals
  // Each group: 26 matches (21 standard + 2 LB-B rounds + 3 enhanced LB-B)
  // Cross Finals: 15 matches (8 R16 + 4 QF + 2 SF + 1 GF)
  group_matches: number; // 26 matches per group (enhanced from 21)
  cross_finals_matches: number; // 15 matches
  groups: number; // 4 groups (A, B, C, D)
  total_matches: number; // 119 matches (4×26 + 15)
}

export const DE64_CONFIG: DE64Config = {
  group_matches: 26, // Enhanced from 21: +2 LB-B rounds
  cross_finals_matches: 15,
  groups: 4,
  total_matches: 119 // Enhanced from 111: 4×26 + 15 = 119
};

// SABO DE64 Round Names
export const SABO_WINNER_ROUND_NAMES: Record<number, string> = {
  1: 'WB Round 1 (16 → 8)',
  2: 'WB Round 2 (8 → 4)', 
  3: 'WB Round 3 (4 → 2)',
  4: 'WB Finals (2 → 1)'
};

export const SABO_LOSER_ROUND_NAMES: Record<number, string> = {
  101: 'LB-A Round 1 (8 → 4)',
  102: 'LB-A Round 2 (4 → 2)',
  103: 'LB-A Round 3 (2 → 1)'
};

export const SABO_LB_B_ROUND_NAMES: Record<number, string> = {
  201: 'LB-B Round 1 (4 → 2)',
  202: 'LB-B Round 2 & 3 (Concurrent)', 
  203: 'LB-B Round 4 (Final)'
};

export const SABO_CROSS_ROUND_NAMES: Record<number, string> = {
  1: 'Cross Round of 16 (16 → 8)',
  2: 'Cross Quarter Finals (8 → 4)',
  3: 'Cross Semi Finals (4 → 2)',
  4: 'Cross Grand Final (2 → 1)'
};

// Enhanced SABO DE64 Display Order Patterns
// Includes new LB-B R3 & R4 display orders for enhanced tournament structure
export const ENHANCED_SABO_DE64_DISPLAY_ORDERS = new Set([
  // Group A - Winner Bracket (WB)
  11101, 11102, 11103, 11104, 11105, 11106, 11107, 11108, // WB R1
  11201, 11202, 11203, 11204, // WB R2
  11301, 11302, // WB R3
  11401, // WB Finals
  
  // Group A - Loser Bracket A (LB-A) 
  12101, 12102, 12103, 12104, // LB-A R1
  12201, 12202, // LB-A R2
  12301, // LB-A R3
  
  // Group A - Loser Bracket B (LB-B) - ENHANCED!
  13101, 13102, // LB-B R1
  13201, 13202, 13203, // LB-B R2 & 3
  13301, 13302, 13401, // NEW! LB-B R3 & R4 (Enhanced)
  
  // Group B - Winner Bracket (WB)
  21101, 21102, 21103, 21104, 21105, 21106, 21107, 21108, // WB R1
  21201, 21202, 21203, 21204, // WB R2
  21301, 21302, // WB R3
  21401, // WB Finals
  
  // Group B - Loser Bracket A (LB-A)
  22101, 22102, 22103, 22104, // LB-A R1
  22201, 22202, // LB-A R2
  22301, // LB-A R3
  
  // Group B - Loser Bracket B (LB-B) - ENHANCED!
  23101, 23102, // LB-B R1
  23201, 23202, 23203, // LB-B R2 & 3
  23301, 23302, 23401, // NEW! LB-B R3 & R4 (Enhanced)
  
  // Group C - Winner Bracket (WB)
  31101, 31102, 31103, 31104, 31105, 31106, 31107, 31108, // WB R1
  31201, 31202, 31203, 31204, // WB R2
  31301, 31302, // WB R3
  31401, // WB Finals
  
  // Group C - Loser Bracket A (LB-A)
  32101, 32102, 32103, 32104, // LB-A R1
  32201, 32202, // LB-A R2
  32301, // LB-A R3
  
  // Group C - Loser Bracket B (LB-B) - ENHANCED!
  33101, 33102, // LB-B R1
  33201, 33202, 33203, // LB-B R2 & 3
  33301, 33302, 33401, // NEW! LB-B R3 & R4 (Enhanced)
  
  // Group D - Winner Bracket (WB)
  41101, 41102, 41103, 41104, 41105, 41106, 41107, 41108, // WB R1
  41201, 41202, 41203, 41204, // WB R2
  41301, 41302, // WB R3
  41401, // WB Finals
  
  // Group D - Loser Bracket A (LB-A)
  42101, 42102, 42103, 42104, // LB-A R1
  42201, 42202, // LB-A R2
  42301, // LB-A R3
  
  // Group D - Loser Bracket B (LB-B) - ENHANCED!
  43101, 43102, // LB-B R1
  43201, 43202, 43203, // LB-B R2 & 3
  43301, 43302, 43401, // NEW! LB-B R3 & R4 (Enhanced)
  
  // Cross Finals
  51101, 51102, 51103, 51104, 51105, 51106, 51107, 51108, // Cross R16
  51201, 51202, 51203, 51204, // Cross QF
  51301, 51302, // Cross SF
  51401 // Cross GF
]);
