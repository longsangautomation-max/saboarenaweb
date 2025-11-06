import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Player } from "@/types/database";

export const useTopPlayers = (limit: number = 10) => {
  return useQuery({
    queryKey: ["top-players", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, display_name, username, avatar_url, rank, ranking_points, total_wins, total_losses, total_tournaments, tournament_wins, elo_rating")
        .eq("role", "player")
        .eq("is_active", true)
        .gt("total_tournaments", 0)
        .order("ranking_points", { ascending: false })
        .order("total_wins", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Player[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
