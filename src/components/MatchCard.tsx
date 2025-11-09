import { Card } from "@/components/ui/card";
import type { BracketMatch } from "@/types/bracket";
import { getPlayerDisplayName } from "@/hooks/useTournamentBracket";
import { CheckCircle2, Trophy } from "lucide-react";
import { getAdvancementInfo } from "@/lib/bracket-advancement";

interface MatchCardProps {
  match: BracketMatch;
  allMatches?: BracketMatch[]; // Needed to calculate advancement
}

/**
 * Display a single tournament match in the bracket
 * Compact design similar to mobile app
 * Shows match source info (e.g., "Winner Match 5") when player is TBD
 */
export const MatchCard = ({ match, allMatches = [] }: MatchCardProps) => {
  const player1Name = getPlayerDisplayName(match, 1);
  const player2Name = getPlayerDisplayName(match, 2);
  
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

  return (
    <Card className={`
      w-full h-full bg-slate-800/80 border
      ${isCompleted ? 'border-green-700/50' : 'border-slate-700/50'}
      hover:border-slate-600 transition-all
      shadow-md
      overflow-hidden
    `}>
      {/* Match Label - Compact */}
      <div className="px-2 py-0.5 border-b border-slate-700/50 flex items-center justify-between bg-slate-900/50">
        <span className="text-[11px] font-bold text-slate-400 leading-none">
          M{match.match_number}
        </span>
        {isCompleted && (
          <CheckCircle2 className="w-3 h-3 text-green-500" />
        )}
      </div>

      {/* Player 1 - Compact */}
      <div className={`
        px-2 py-1 flex items-center justify-between min-h-[28px]
        ${isPlayer1Winner ? 'bg-green-900/20' : ''}
      `}>
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {isPlayer1Winner && (
            <Trophy className="w-3 h-3 text-amber-400 flex-shrink-0" />
          )}
          <span className={`
            text-[11px] truncate leading-tight
            ${isPlayer1Winner ? 'font-bold text-white' : 'text-slate-300'}
            ${player1Name === 'TBD' ? 'text-slate-500 italic' : ''}
          `}>
            {player1Advancement?.text || player1Name}
          </span>
        </div>
        {match.player1_score !== null && match.player1_score > 0 && (
          <span className={`
            text-[11px] font-bold ml-1.5 px-1.5 py-0.5 rounded leading-none
            ${isPlayer1Winner ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'}
          `}>
            {match.player1_score}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-700/50"></div>

      {/* Player 2 - Compact */}
      <div className={`
        px-2 py-1 flex items-center justify-between min-h-[28px]
        ${isPlayer2Winner ? 'bg-green-900/20' : ''}
      `}>
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {isPlayer2Winner && (
            <Trophy className="w-3 h-3 text-amber-400 flex-shrink-0" />
          )}
          <span className={`
            text-[11px] truncate leading-tight
            ${isPlayer2Winner ? 'font-bold text-white' : 'text-slate-300'}
            ${player2Name === 'TBD' ? 'text-slate-500 italic' : ''}
          `}>
            {player2Advancement?.text || player2Name}
          </span>
        </div>
        {match.player2_score !== null && match.player2_score > 0 && (
          <span className={`
            text-[11px] font-bold ml-1.5 px-1.5 py-0.5 rounded leading-none
            ${isPlayer2Winner ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'}
          `}>
            {match.player2_score}
          </span>
        )}
      </div>
    </Card>
  );
};

export default MatchCard;
