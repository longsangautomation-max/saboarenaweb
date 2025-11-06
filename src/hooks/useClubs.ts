import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Club {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  rating: number | null;
  total_tables: number | null;
  tournaments_hosted: number | null;
  description: string | null;
  website: string | null;
  opening_hours: string | null;
  amenities: string[] | null;
  created_at: string;
}

export const useClubs = () => {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clubs")
        .select(`
          id,
          name,
          address,
          phone,
          logo_url,
          cover_image_url,
          rating,
          total_tables,
          description,
          opening_hours,
          amenities,
          created_at
        `)
        .order("rating", { ascending: false, nullsFirst: false })
        .order("name", { ascending: true });

      if (error) {
        throw error;
      }

      // Add tournaments_hosted count by counting tournaments for each club
      const clubsWithTournaments = data.map(async (club: Record<string, any>) => {
        const { count } = await supabase
          .from("tournaments")
          .select("*", { count: "exact", head: true })
          .eq("club_id", club.id);

        return {
          ...club,
          tournaments_hosted: count || 0
        };
      });

      const results = await Promise.all(clubsWithTournaments);
      return results as Club[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - clubs don't change often
  });
};