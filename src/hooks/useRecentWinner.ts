import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tournament } from "@/types/database";

export interface RecentWinnerData extends Tournament {
  winner?: {
    id: string;
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    rank: string | null;
  } | null;
}

export const useRecentWinner = () => {
  return useQuery({
    queryKey: ["recent-winner"],
    queryFn: async () => {
      // First get the most recent completed tournament
      const { data: recentTournament, error: tournamentError } = await supabase
        .from("tournaments")
        .select(`
          id,
          title,
          end_date,
          prize_pool,
          club:clubs(
            name,
            logo_url
          )
        `)
        .eq("status", "completed")
        .order("end_date", { ascending: false })
        .limit(1)
        .single();

      if (tournamentError) {
        if (tournamentError.code === 'PGRST116') {
          // No results found
          return null;
        }
        throw tournamentError;
      }

      if (!recentTournament) {
        return null;
      }

      // Get the winner from matches table - find the winner of the final match
      const { data: finalMatch, error: matchError } = await supabase
        .from("matches")
        .select(`
          winner_id,
          winner:users!winner_id(
            id,
            display_name,
            username,
            avatar_url,
            rank
          )
        `)
        .eq("tournament_id", recentTournament.id)
        .eq("status", "completed")
        .not("winner_id", "is", null)
        .order("match_date", { ascending: false })
        .limit(1)
        .single();

      if (matchError || !finalMatch?.winner) {
        // Return tournament without winner data
        return {
          ...recentTournament,
          winner: null
        } as RecentWinnerData;
      }

      return {
        ...recentTournament,
        winner: finalMatch.winner
      } as RecentWinnerData;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - completed tournaments don't change often
  });
};