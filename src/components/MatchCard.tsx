import { Card } from "@/components/ui/card";
import type { BracketMatch } from "@/types/bracket";
import { getPlayerDisplayName } from "@/hooks/useTournamentBracket";
import { CheckCircle2 } from "lucide-react";
import { getAdvancementInfo } from "@/lib/bracket-advancement";

// Helper function to shorten long names
const shortenName = (name: string, maxLength: number = 18): string => {
  if (name.length <= maxLength || name === 'TBD') return name;
  
  const words = name.trim().split(' ');
  if (words.length <= 1) {
    // Single word, truncate with ellipsis
    return name.slice(0, maxLength - 1) + '…';
  }
  
  // Multiple words, abbreviate first words and keep last word
  const lastWord = words.at(-1) || '';
  const firstWords = words.slice(0, -1);
  
  // Abbreviate first words to first letter + dot
  const abbreviated = firstWords.map(word => word.charAt(0).toUpperCase() + '.').join(' ');
  const result = `${abbreviated} ${lastWord}`;
  
  // If still too long, truncate last word
  if (result.length > maxLength) {
    const availableForLastWord = maxLength - abbreviated.length - 1;
    return `${abbreviated} ${lastWord.slice(0, availableForLastWord - 1)}…`;
  }
  
  return result;
};

interface MatchCardProps {
  match: BracketMatch;
  allMatches?: BracketMatch[]; // Needed to calculate advancement
  // Optional highlight color to use for winner border/background (hex string)
  highlightColor?: string;
  // Flag if this is the FINAL match (for special styling)
  isFinalMatch?: boolean;
}

/**
 * Get distinct rank color based on rank code (override database for better visibility)
 */
const getDistinctRankColor = (rank: string): string => {
  const distinctColors: Record<string, string> = {
    'C': '#FF0080',    // Hot Pink - Vô địch
    'D': '#FF4500',    // Orange Red - Huyền Thoại  
    'E': '#FFD700',    // Gold - Cao thủ
    'F': '#32CD32',    // Lime Green - Chuyên gia
    'G+': '#00BFFF',   // Deep Sky Blue - Thợ cả
    'G': '#8A2BE2',    // Blue Violet - Thợ giỏi
    'H+': '#FF6347',   // Tomato - Thợ chính
    'H': '#20B2AA',    // Light Sea Green - Thợ 1
    'I+': '#DA70D6',   // Orchid - Thợ 2  
    'I': '#FFA500',    // Orange - Thợ 3
    'K+': '#87CEEB',   // Sky Blue - Học việc
    'K': '#C0C0C0',    // Silver - Người mới
  };
  
  return distinctColors[rank] || '#888888'; // Gray fallback
};

// Helper: convert hex color to rgba string for translucent backgrounds
const hexToRgba = (hex: string, alpha = 1) => {
  if (!hex) return undefined;
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
/**
 * Display a single tournament match in the bracket
 * Compact design similar to mobile app
 * Shows match source info (e.g., "Winner Match 5") when player is TBD
 */
export const MatchCard = ({ match, allMatches = [], highlightColor = '#22c55e', isFinalMatch = false }: MatchCardProps) => {
  const player1Name = getPlayerDisplayName(match, 1);
  const player2Name = getPlayerDisplayName(match, 2);
  
  // Apply name shortening for display
  const player1DisplayName = shortenName(player1Name);
  const player2DisplayName = shortenName(player2Name);
  
  // Debug: Log name shortening
  if (player1Name !== 'TBD' && player1Name !== player1DisplayName) {
    console.log(`P1 Name: "${player1Name}" → "${player1DisplayName}"`);
  }
  if (player2Name !== 'TBD' && player2Name !== player2DisplayName) {
    console.log(`P2 Name: "${player2Name}" → "${player2DisplayName}"`);
  }
  
  // Get advancement info when player is TBD
  const player1Advancement = player1Name === 'TBD' && allMatches.length > 0
    ? getAdvancementInfo(match, 1, allMatches)
    : null;
  
  const player2Advancement = player2Name === 'TBD' && allMatches.length > 0
    ? getAdvancementInfo(match, 2, allMatches)
    : null;
  
  const isPlayer1Winner = match.winner_id === match.player1_id;
  const isPlayer2Winner = match.winner_id === match.player2_id;
  const isCompleted = match.status === 'completed';
  
  // Check if match is ready to play (has both players but no result)
  const isLive = (match.status === 'in_progress' || match.status === 'scheduled') && 
                 match.player1_id && match.player2_id && 
                 player1Name !== 'TBD' && player2Name !== 'TBD' && 
                 !isCompleted;

  // Check if this match should NOT have outer border
  // 4 trận chọn user vào Cross Final:
  // - 2 trận WB Round 3 (của 1 bảng) 
  // - 1 trận LB-A Final
  // - 1 trận LB-B Final
  const shouldHideOuterBorder = (
    // WB Round 3 matches - winners qualify for Cross Finals
    (match.bracket_type === 'WB' && match.round_number === 3) ||
    // LB-A Final - winner qualifies for Cross Finals  
    (match.bracket_type === 'LB-A' && match.round_number === 103) ||
    // LB-B Final - winner qualifies for Cross Finals
    (match.bracket_type === 'LB-B' && match.round_number === 203)
  );

  // Debug: Log match info to check
  console.log(`Match ${match.match_number}: type=${match.bracket_type}, round=${match.round_number}, hideBorder=${shouldHideOuterBorder}`);

  // Prepare inline styles for winner highlighting (uses passed highlightColor)
  const player1WinnerStyles: React.CSSProperties | undefined = isPlayer1Winner
    ? { borderColor: highlightColor, backgroundColor: hexToRgba(highlightColor, 0.12) }
    : undefined;

  const player2WinnerStyles: React.CSSProperties | undefined = isPlayer2Winner
    ? { borderColor: highlightColor, backgroundColor: hexToRgba(highlightColor, 0.12) }
    : undefined;

  const player1ScoreStyle: React.CSSProperties | undefined = isPlayer1Winner
    ? { backgroundColor: highlightColor, color: '#ffffff' }
    : undefined;

  const player2ScoreStyle: React.CSSProperties | undefined = isPlayer2Winner
    ? { backgroundColor: highlightColor, color: '#ffffff' }
    : undefined;

  // PREMIUM FINAL CARD STYLES
  const finalCardBg = isFinalMatch 
    ? 'bg-gradient-to-br from-amber-950/95 via-yellow-950/98 to-amber-950/95'
    : 'bg-slate-800/80';
  
  const finalTextSize = isFinalMatch ? 'text-[14px]' : 'text-[11px]';
  const finalPadding = isFinalMatch ? 'py-2' : 'py-1';
  const finalMinHeight = isFinalMatch ? 'min-h-[42px]' : 'min-h-[32px]';
  const finalRankSize = isFinalMatch ? 'text-[12px]' : 'text-[10px]';
  const finalAvatarSize = isFinalMatch ? 'w-6 h-6' : 'w-4 h-4';
  const finalAvatarText = isFinalMatch ? 'text-[11px]' : 'text-[8px]';

  return (
    <Card className={`
      w-full h-full ${finalCardBg} border-transparent
      hover:border-slate-600 transition-all
      shadow-md
    `}>
      {/* Match Label - PREMIUM for Final */}
      <div className={`px-2 ${isFinalMatch ? 'py-1' : 'py-0.5'} border-b border-slate-700/50 flex items-center justify-between ${isFinalMatch ? 'bg-gradient-to-r from-yellow-900/60 via-amber-900/70 to-yellow-900/60' : 'bg-slate-900/50'}`}>
        <span className={`${isFinalMatch ? 'text-[13px]' : 'text-[11px]'} font-bold ${isFinalMatch ? 'text-yellow-400' : 'text-slate-400'} leading-none ${isFinalMatch ? 'tracking-widest' : ''}`}>
          {isFinalMatch ? '🏆 CHUNG KẾT' : `M${match.match_number}`}
        </span>
        <div className="flex items-center gap-1">
          {isLive && (
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
          )}
          {isCompleted && (
            <CheckCircle2 className="w-3 h-3 text-green-500" />
          )}
        </div>
      </div>

      {/* Player 1 - Enhanced with Rank, Avatar, Name, Score */}
      <div
        className={`px-2 ${finalPadding} flex items-center justify-between ${finalMinHeight} rounded ${shouldHideOuterBorder ? 'border-transparent' : 'border'}`}
        style={player1WinnerStyles}
      >
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {/* Player 1 Rank */}
          {match.player1?.rank && player1Name !== 'TBD' && (
            <span 
              className={`${finalRankSize} font-bold leading-none flex-shrink-0`}
              style={{ color: getDistinctRankColor(match.player1.rank) }}
            >
              {match.player1.rank}
            </span>
          )}
          
          {/* Player 1 Avatar */}
          {match.player1?.avatar_url && player1Name !== 'TBD' ? (
            <img 
              src={match.player1.avatar_url} 
              alt={player1DisplayName}
              className={`${finalAvatarSize} rounded-full flex-shrink-0 object-cover`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : player1Name !== 'TBD' && (
            <div className={`${finalAvatarSize} rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0`}>
              <span className={`${finalAvatarText} font-bold text-white`}>
                {player1Name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Player 1 Name */}
          <span className={`
            ${finalTextSize} truncate leading-tight flex-1
            ${isPlayer1Winner ? 'font-bold text-white' : isFinalMatch ? 'text-amber-200' : 'text-slate-300'}
            ${player1Name === 'TBD' ? 'text-slate-500 italic' : ''}
          `}>
            {player1Advancement?.text || player1DisplayName}
          </span>
        </div>
        
        {/* Player 1 Score */}
        {match.player1_score !== null && match.player1_score > 0 && (
          <span
            className={`${finalTextSize} font-bold ml-1.5 px-1.5 py-0.5 rounded leading-none flex-shrink-0`}
            style={player1ScoreStyle}
          >
            {match.player1_score}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className={`h-px ${isFinalMatch ? 'bg-yellow-900/40' : 'bg-slate-700/50'}`}></div>

      {/* Player 2 - Enhanced with Rank, Avatar, Name, Score */}
      <div
        className={`px-2 ${finalPadding} flex items-center justify-between ${finalMinHeight} rounded ${shouldHideOuterBorder ? 'border-transparent' : 'border'}`}
        style={player2WinnerStyles}
      >
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {/* Player 2 Rank */}
          {match.player2?.rank && player2Name !== 'TBD' && (
            <span 
              className={`${finalRankSize} font-bold leading-none flex-shrink-0`}
              style={{ color: getDistinctRankColor(match.player2.rank) }}
            >
              {match.player2.rank}
            </span>
          )}
          
          {/* Player 2 Avatar */}
          {match.player2?.avatar_url && player2Name !== 'TBD' ? (
            <img 
              src={match.player2.avatar_url} 
              alt={player2DisplayName}
              className={`${finalAvatarSize} rounded-full flex-shrink-0 object-cover`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : player2Name !== 'TBD' && (
            <div className={`${finalAvatarSize} rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0`}>
              <span className={`${finalAvatarText} font-bold text-white`}>
                {player2Name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Player 2 Name */}
          <span className={`
            ${finalTextSize} truncate leading-tight flex-1
            ${isPlayer2Winner ? 'font-bold text-white' : isFinalMatch ? 'text-amber-200' : 'text-slate-300'}
            ${player2Name === 'TBD' ? 'text-slate-500 italic' : ''}
          `}>
            {player2Advancement?.text || player2DisplayName}
          </span>
        </div>
        
        {/* Player 2 Score */}
        {match.player2_score !== null && match.player2_score > 0 && (
          <span
            className={`${finalTextSize} font-bold ml-1.5 px-1.5 py-0.5 rounded leading-none flex-shrink-0`}
            style={player2ScoreStyle}
          >
            {match.player2_score}
          </span>
        )}
      </div>
    </Card>
  );
};

export default MatchCard;
