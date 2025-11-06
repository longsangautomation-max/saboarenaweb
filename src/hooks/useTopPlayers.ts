import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Player } from "@/types/database";

interface LeaderboardEntry {
  rank: number;
  player_id: string;
  username: string;
  display_name: string;
  player_rank: string;
  elo_rating: number;
  total_wins: number;
  total_losses?: number;
  tournaments_played?: number;
  tournament_wins: number;
  spa_points: number;
  win_rate: number;
  recent_activity: string;
  avatar_url?: string;
}

export const useTopPlayers = (limit: number = 10) => {
  return useQuery({
    queryKey: ["top-players", limit],
    queryFn: async () => {
      // Use the new leaderboard function for better performance and data
      const { data, error } = await supabase.rpc('get_leaderboard', {
        board_type: 'elo',
        rank_filter: null,
        limit_count: limit
      });

      if (error) {
        console.error('Leaderboard function error:', error);
        // Fallback to direct query if function fails
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("users")
          .select("id, display_name, username, avatar_url, rank, ranking_points, total_wins, total_losses, total_tournaments, tournament_wins, elo_rating")
          .eq("role", "player")
          .eq("is_active", true)
          .order("elo_rating", { ascending: false })
          .order("total_wins", { ascending: false })
          .limit(limit);
        
        if (fallbackError) throw fallbackError;
        return fallbackData as Player[];
      }

      // Transform leaderboard data to Player format
      return data?.map((item: LeaderboardEntry) => ({
        id: item.player_id,
        display_name: item.display_name,
        username: item.username,
        avatar_url: item.avatar_url,
        rank: item.player_rank,
        ranking_points: item.spa_points || 0,
        total_wins: item.total_wins,
        total_losses: item.total_losses || 0,
        total_tournaments: item.tournaments_played || 0,
        tournament_wins: item.tournament_wins,
        elo_rating: item.elo_rating,
        win_rate: item.win_rate
      })) as Player[];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes - faster updates for competitive rankings
    refetchInterval: 2 * 60 * 1000, // Auto-refresh every 2 minutes
    refetchOnWindowFocus: true, // Refresh when user comes back
  });
};
