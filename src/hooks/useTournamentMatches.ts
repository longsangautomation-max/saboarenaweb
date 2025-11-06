import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TournamentMatch {
  id: string;
  tournament_id: string;
  player1_id: string | null;
  player2_id: string | null;
  winner_id: string | null;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  match_date: string | null;
  round: number;
  player1?: {
    id: string;
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
  } | null;
  player2?: {
    id: string;
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
  } | null;
  winner?: {
    id: string;
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
  } | null;
}

export const useTournamentMatches = (tournamentId: string) => {
  return useQuery({
    queryKey: ["tournament-matches", tournamentId],
    queryFn: async () => {
      if (!tournamentId) {
        throw new Error("Tournament ID is required");
      }

      const { data, error } = await supabase
        .from("matches")
        .select(`
          id,
          tournament_id,
          player1_id,
          player2_id,
          winner_id,
          status,
          match_date,
          round,
          player1:users!player1_id(
            id,
            display_name,
            username,
            avatar_url
          ),
          player2:users!player2_id(
            id,
            display_name,
            username,
            avatar_url
          ),
          winner:users!winner_id(
            id,
            display_name,
            username,
            avatar_url
          )
        `)
        .eq("tournament_id", tournamentId)
        .order("round", { ascending: true })
        .order("match_date", { ascending: true });

      if (error) {
        throw error;
      }

      return data as any[]; // Will fix with proper typing later
    },
    enabled: !!tournamentId,
    staleTime: 2 * 60 * 1000, // 2 minutes - matches change more frequently
  });
};