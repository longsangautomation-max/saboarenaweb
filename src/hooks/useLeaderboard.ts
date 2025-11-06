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

export const useLeaderboard = (
  boardType: 'elo' | 'wins' | 'tournaments' | 'spa_points' = 'elo',
  rankFilter: string | null = null,
  limit: number = 20
) => {
  return useQuery({
    queryKey: ["leaderboard", boardType, rankFilter, limit],
    queryFn: async () => {
      // Use the leaderboard function
      const { data, error } = await supabase.rpc('get_leaderboard', {
        board_type: boardType,
        rank_filter: rankFilter === 'all' ? null : rankFilter,
        limit_count: limit
      });

      if (error) {
        console.error('Leaderboard function error:', error);
        // Fallback to direct query if function fails
        let orderBy = 'elo_rating';
        if (boardType === 'wins') orderBy = 'total_wins';
        else if (boardType === 'tournaments') orderBy = 'tournament_wins';
        else if (boardType === 'spa_points') orderBy = 'spa_points';

        const { data: fallbackData, error: fallbackError } = await supabase
          .from("users")
          .select("id, display_name, username, avatar_url, rank, ranking_points, total_wins, total_losses, total_tournaments, tournament_wins, elo_rating, spa_points")
          .eq("role", "player")
          .eq("is_active", true)
          .order(orderBy, { ascending: false })
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
        win_rate: item.win_rate,
        spa_points: item.spa_points
      })) as Player[];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // Auto-refresh every 2 minutes
    refetchOnWindowFocus: true,
  });
};