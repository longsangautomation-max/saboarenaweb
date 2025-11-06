import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tournament } from "@/types/database";

export const useTournamentDetails = (tournamentId: string) => {
  return useQuery({
    queryKey: ["tournament-details", tournamentId],
    queryFn: async () => {
      if (!tournamentId) {
        throw new Error("Tournament ID is required");
      }

      const { data, error } = await supabase
        .from("tournaments")
        .select(`
          id,
          title,
          description,
          status,
          start_date,
          end_date,
          max_participants,
          current_participants,
          prize_pool,
          entry_fee,
          game_format,
          venue_address,
          club_id,
          club:clubs(
            id,
            name,
            logo_url,
            address
          )
        `)
        .eq("id", tournamentId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No results found
          return null;
        }
        throw error;
      }

      return data as any; // Will fix with proper typing later
    },
    enabled: !!tournamentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};