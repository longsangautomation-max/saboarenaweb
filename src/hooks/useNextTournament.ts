import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tournament } from "@/types/database";

export const useNextTournament = () => {
  return useQuery({
    queryKey: ["next-tournament"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select(`
          id,
          title,
          start_date,
          current_participants,
          max_participants,
          prize_pool,
          entry_fee,
          club:clubs(
            name,
            logo_url
          )
        `)
        .eq("status", "upcoming")
        .order("start_date", { ascending: true })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No results found
          return null;
        }
        throw error;
      }
      
      return data as Tournament | null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};