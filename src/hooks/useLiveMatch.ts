import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export interface LiveMatch {
  id: string;
  tournament_id: string;
  player1_id: string;
  player2_id: string;
  status: 'scheduled' | 'live' | 'completed' | 'paused';
  current_frame: number;
  total_frames: number;
  player1_score: number;
  player2_score: number;
  player1_breaks: number[];
  player2_breaks: number[];
  player1_highest_break: number;
  player2_highest_break: number;
  current_player: string | null;
  current_break: number;
  start_time: string | null;
  end_time: string | null;
  frame_start_time: string | null;
  commentary: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface MatchEvent {
  id: string;
  match_id: string;
  event_type: 'pot' | 'miss' | 'foul' | 'safety' | 'break_start' | 'break_end' | 'frame_start' | 'frame_end' | 'match_start' | 'match_end' | 'pause' | 'resume';
  player_id: string | null;
  points: number;
  ball_potted: number | null;
  break_score: number;
  frame_number: number | null;
  timestamp: string;
  details: Record<string, unknown>;
  created_by: string | null;
}

export interface MatchStatistics {
  match_id: string;
  tournament_id: string;
  player1_id: string;
  player2_id: string;
  status: string;
  player1_score: number;
  player2_score: number;
  current_frame: number;
  total_frames: number;
  player1_highest_break: number;
  player2_highest_break: number;
  progress_percentage: number;
  player1_name: string;
  player1_avatar: string | null;
  player2_name: string;
  player2_avatar: string | null;
  tournament_name: string;
  active_spectators: number;
  total_spectators: number;
  total_events: number;
  pots_player1: number;
  pots_player2: number;
  start_time: string | null;
  end_time: string | null;
  match_duration: string | null;
}

export const useLiveMatch = (matchId: string | null) => {
  const { user } = useAuth();
  const [match, setMatch] = useState<LiveMatch | null>(null);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [statistics, setStatistics] = useState<MatchStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSpectating, setIsSpectating] = useState(false);

  // Fetch match data
  const fetchMatch = useCallback(async () => {
    if (!matchId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Fetch match details
      const { data: matchData, error: matchError } = await supabase
        .from('live_matches')
        .select('*')
        .eq('id', matchId)
        .single();

      if (matchError) throw matchError;

      // Fetch match statistics
      const { data: statsData, error: statsError } = await supabase
        .from('match_statistics')
        .select('*')
        .eq('match_id', matchId)
        .single();

      if (statsError) throw statsError;

      // Fetch recent events
      const { data: eventsData, error: eventsError } = await supabase
        .from('match_events')
        .select('*')
        .eq('match_id', matchId)
        .order('timestamp', { ascending: false })
        .limit(50);

      if (eventsError) throw eventsError;

      setMatch(matchData);
      setStatistics(statsData);
      setEvents(eventsData || []);

      // Check if user is already spectating
      if (user) {
        const { data: spectatorData } = await supabase
          .from('match_spectators')
          .select('id')
          .eq('match_id', matchId)
          .eq('user_id', user.id)
          .is('left_at', null)
          .single();

        setIsSpectating(!!spectatorData);
      }
    } catch (err) {
      console.error('Error fetching match data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [matchId, user]);

  // Real-time subscriptions
  useEffect(() => {
    if (!matchId) return;

    // Subscribe to match updates
    const matchChannel = supabase
      .channel(`live_match_${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'live_matches',
          filter: `id=eq.${matchId}`,
        },
        (payload) => {
          setMatch(payload.new as LiveMatch);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'match_events',
          filter: `match_id=eq.${matchId}`,
        },
        (payload) => {
          setEvents(prev => [payload.new as MatchEvent, ...prev.slice(0, 49)]);
        }
      )
      .subscribe();

    // Subscribe to statistics updates
    const statsChannel = supabase
      .channel(`match_stats_${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'match_statistics',
          filter: `match_id=eq.${matchId}`,
        },
        (payload) => {
          setStatistics(payload.new as MatchStatistics);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(matchChannel);
      supabase.removeChannel(statsChannel);
    };
  }, [matchId]);

  // Initial fetch
  useEffect(() => {
    fetchMatch();
  }, [fetchMatch]);

  // Join as spectator
  const joinAsSpectator = useCallback(async () => {
    if (!matchId || !user || isSpectating) return;

    try {
      const { error } = await supabase
        .from('match_spectators')
        .insert({
          match_id: matchId,
          user_id: user.id,
        });

      if (error) throw error;

      setIsSpectating(true);
    } catch (err) {
      console.error('Error joining as spectator:', err);
    }
  }, [matchId, user, isSpectating]);

  // Leave as spectator
  const leaveAsSpectator = useCallback(async () => {
    if (!matchId || !user || !isSpectating) return;

    try {
      const { error } = await supabase
        .from('match_spectators')
        .update({
          left_at: new Date().toISOString(),
          total_watch_time: 'NOW() - joined_at',
        })
        .eq('match_id', matchId)
        .eq('user_id', user.id)
        .is('left_at', null);

      if (error) throw error;

      setIsSpectating(false);
    } catch (err) {
      console.error('Error leaving as spectator:', err);
    }
  }, [matchId, user, isSpectating]);

  // Add match event (for officials)
  const addMatchEvent = useCallback(async (eventData: Omit<MatchEvent, 'id' | 'timestamp' | 'created_by'>) => {
    if (!matchId || !user) return;

    try {
      const { error } = await supabase
        .from('match_events')
        .insert({
          ...eventData,
          match_id: matchId,
          created_by: user.id,
        });

      if (error) throw error;

      // Refresh match data to get updated scores
      await fetchMatch();
    } catch (err) {
      console.error('Error adding match event:', err);
      throw err;
    }
  }, [matchId, user, fetchMatch]);

  // Update match data (for officials)
  const updateMatch = useCallback(async (updates: Partial<LiveMatch>) => {
    if (!matchId || !user) return;

    try {
      const { error } = await supabase
        .from('live_matches')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', matchId);

      if (error) throw error;

      // Refresh match data
      await fetchMatch();
    } catch (err) {
      console.error('Error updating match:', err);
      throw err;
    }
  }, [matchId, user, fetchMatch]);

  // Start match (for officials)
  const startMatch = useCallback(async () => {
    if (!matchId) return;

    try {
      const { error } = await supabase.rpc('start_live_match', {
        match_uuid: matchId,
      });

      if (error) throw error;

      await fetchMatch();
    } catch (err) {
      console.error('Error starting match:', err);
      throw err;
    }
  }, [matchId, fetchMatch]);

  // End match (for officials)
  const endMatch = useCallback(async () => {
    if (!matchId) return;

    try {
      const { error } = await supabase.rpc('end_live_match', {
        match_uuid: matchId,
      });

      if (error) throw error;

      await fetchMatch();
    } catch (err) {
      console.error('Error ending match:', err);
      throw err;
    }
  }, [matchId, fetchMatch]);

  return {
    match,
    events,
    statistics,
    isLoading,
    error,
    isSpectating,
    joinAsSpectator,
    leaveAsSpectator,
    addMatchEvent,
    updateMatch,
    startMatch,
    endMatch,
    refetch: fetchMatch,
  };
};