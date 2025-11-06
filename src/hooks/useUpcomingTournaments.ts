import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tournament } from "@/types/database";

export const useUpcomingTournaments = (limit: number = 5) => {
  return useQuery({
    queryKey: ["upcoming-tournaments", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select(`
          id,
          title,
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
          club:clubs!inner(
            id,
            name,
            logo_url,
            address
          )
        `)
        .eq("status", "upcoming")
        .order("start_date", { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data as Tournament[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};