import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TournamentParticipant {
  id: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
  rank: string | null;
  elo_rating: number;
  total_wins: number;
  total_losses: number;
  tournament_wins: number;
}

export const useTournamentParticipants = (tournamentId: string) => {
  return useQuery({
    queryKey: ["tournament-participants", tournamentId],
    queryFn: async () => {
      if (!tournamentId) {
        throw new Error("Tournament ID is required");
      }

      // First, get tournament registrations
      const { data: registrations, error: regError } = await supabase
        .from("tournament_registrations")
        .select("user_id")
        .eq("tournament_id", tournamentId)
        .eq("status", "approved");

      if (regError) {
        throw regError;
      }

      if (!registrations || registrations.length === 0) {
        return [];
      }

      // Get user details for all registered users
      const userIds = registrations.map(reg => reg.user_id);
      
      const { data: participants, error: participantsError } = await supabase
        .from("users")
        .select(`
          id,
          display_name,
          username,
          avatar_url,
          rank,
          elo_rating,
          total_wins,
          total_losses,
          tournament_wins
        `)
        .in("id", userIds)
        .order("elo_rating", { ascending: false });

      if (participantsError) {
        throw participantsError;
      }

      return participants as TournamentParticipant[];
    },
    enabled: !!tournamentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};