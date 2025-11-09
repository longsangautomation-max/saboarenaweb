/**
 * Bracket Advancement Logic
 * Calculate match source information using database advancement fields
 * SABO DE64 uses display_order codes (11201, 12101, etc.)
 */

import type { BracketMatch } from "@/types/bracket";

export interface AdvancementInfo {
  text: string; // e.g., "W-M5", "L-WB-M3"
  matchNumber?: number;
  type: 'winner' | 'loser' | 'tbd';
}

/**
 * Get advancement text for a player slot in a match
 * Uses database winner_advances_to and loser_advances_to fields
 */
export function getAdvancementInfo(
  match: BracketMatch,
  playerSlot: 1 | 2,
  allMatches: BracketMatch[]
): AdvancementInfo {
  // Round 1 has no source matches (initial seeding)
  if (match.round_number === 1) {
    return { text: 'TBD', type: 'tbd' };
  }

  // Find source matches by looking for matches that advance to current match
  const currentMatchCode = encodeDisplayOrder(match, allMatches);
  if (!currentMatchCode) {
    return { text: 'TBD', type: 'tbd' };
  }
  
  // Find matches where winner_advances_to or loser_advances_to equals current match code
  const sourceMatches = allMatches.filter(m => 
    m.winner_advances_to === currentMatchCode || m.loser_advances_to === currentMatchCode
  );
  
  if (sourceMatches.length === 0) {
    return { text: 'TBD', type: 'tbd' };
  }
  
  // Player 1 comes from first source, Player 2 from second source
  const sourceMatch = playerSlot === 1 ? sourceMatches[0] : sourceMatches[1];
  if (!sourceMatch) {
    return { text: 'TBD', type: 'tbd' };
  }
  
  // Determine if winner or loser advances
  const isWinner = sourceMatch.winner_advances_to === currentMatchCode;
  const prefix = isWinner ? 'W' : 'L';
  
  // Format bracket type label
  let bracketLabel = 'WB';
  if (sourceMatch.bracket_type === 'LB-A') {
    bracketLabel = 'LB-A';
  } else if (sourceMatch.bracket_type === 'LB-B') {
    bracketLabel = 'LB-B';
  }
  
  return {
    text: `${prefix}-${bracketLabel}-M${sourceMatch.match_number}`,
    matchNumber: sourceMatch.match_number,
    type: isWinner ? 'winner' : 'loser'
  };
}

/**
 * Encode a match to its display_order code
 * Format: GGBRRMMM (Group, Bracket, Round, Match)
 * Example: Match in Group A, WB, Round 2, Position 1 → 11201
 */
function encodeDisplayOrder(match: BracketMatch, allMatches: BracketMatch[]): number | null {
  // Map group to code
  const groupCodeMap: { [key: string]: number } = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'CROSS': 5
  };
  const groupCode = groupCodeMap[match.bracket_group];
  if (!groupCode) return null;
  
  // Map bracket type to code
  const bracketCodeMap: { [key: string]: number } = {
    'WB': 1, 'LB-A': 2, 'LB-B': 3
  };
  const bracketCode = bracketCodeMap[match.bracket_type];
  if (!bracketCode) return null;
  
  // Calculate round code
  let roundCode = match.round_number;
  if (match.bracket_type === 'LB-A' && match.round_number >= 100) {
    roundCode = match.round_number - 100;
  } else if (match.bracket_type === 'LB-B' && match.round_number >= 200) {
    roundCode = match.round_number - 200;
  }
  
  // Find match position in round (1-based index)
  const roundMatches = allMatches.filter(m =>
    m.bracket_type === match.bracket_type &&
    m.bracket_group === match.bracket_group &&
    m.round_number === match.round_number
  ).sort((a, b) => a.match_number - b.match_number);
  
  const matchIndex = roundMatches.findIndex(m => m.match_number === match.match_number);
  const matchPos = matchIndex + 1; // 1-based
  
  // Format: GGBRRMMM
  const code = Number.parseInt(
    `${groupCode}${bracketCode}${roundCode.toString().padStart(2, '0')}${matchPos.toString().padStart(2, '0')}`
  );
  return code;
}
