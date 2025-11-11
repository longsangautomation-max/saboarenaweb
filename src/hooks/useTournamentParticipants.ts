import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TournamentParticipant {
  id: string;
  display_name: string | null;
  username: string | null;
  full_name: string | null;
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

      // Get participants from tournament_participants table
      const { data: participants, error: participantsError } = await supabase
        .from("tournament_participants")
        .select(`
          id,
          user_id,
          status,
          registered_at,
          seed_number,
          users (
            id,
            display_name,
            username,
            full_name,
            avatar_url,
            rank,
            elo_rating,
            total_wins,
            total_losses,
            tournament_wins
          )
        `)
        .eq("tournament_id", tournamentId)
        .eq("status", "registered")
        .order("seed_number", { ascending: true, nullsFirst: false })
        .order("registered_at", { ascending: true });

      if (participantsError) {
        throw participantsError;
      }

      // Map to expected format
      return (participants || []).map(p => ({
        id: p.users?.id || p.user_id,
        display_name: p.users?.display_name || null,
        username: p.users?.username || null,
        full_name: p.users?.full_name || null,
        avatar_url: p.users?.avatar_url || null,
        rank: p.users?.rank || null,
        elo_rating: p.users?.elo_rating || 0,
        total_wins: p.users?.total_wins || 0,
        total_losses: p.users?.total_losses || 0,
        tournament_wins: p.users?.tournament_wins || 0,
      })) as TournamentParticipant[];
    },
    enabled: !!tournamentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};