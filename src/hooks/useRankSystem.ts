import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { RankSystem } from "@/types/database";

export const useRankSystem = () => {
  return useQuery({
    queryKey: ["rank-system"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rank_system")
        .select("*")
        .order("elo_min", { ascending: true });

      if (error) throw error;
      return data as RankSystem[];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes - rank system doesn't change often
  });
};
