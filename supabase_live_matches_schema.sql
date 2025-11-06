-- Phase 9: Live Match Scoring System Database Schema

-- Live Matches Table
CREATE TABLE IF NOT EXISTS live_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id),
  player1_id UUID REFERENCES players(id),
  player2_id UUID REFERENCES players(id),
  
  -- Match Status
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'paused')),
  
  -- Score Tracking
  current_frame INTEGER DEFAULT 1,
  total_frames INTEGER DEFAULT 9, -- best of 9, 11, etc.
  player1_score INTEGER DEFAULT 0, -- frames won
  player2_score INTEGER DEFAULT 0, -- frames won
  
  -- Break Tracking
  player1_breaks INTEGER[] DEFAULT '{}',
  player2_breaks INTEGER[] DEFAULT '{}',
  player1_highest_break INTEGER DEFAULT 0,
  player2_highest_break INTEGER DEFAULT 0,
  
  -- Current State
  current_player UUID REFERENCES players(id),
  current_break INTEGER DEFAULT 0,
  
  -- Timing
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  frame_start_time TIMESTAMPTZ,
  
  -- Commentary & Notes
  commentary TEXT[] DEFAULT '{}',
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Match Events Table (for detailed event tracking)
CREATE TABLE IF NOT EXISTS match_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES live_matches(id) ON DELETE CASCADE,
  
  -- Event Information
  event_type TEXT NOT NULL CHECK (event_type IN ('pot', 'miss', 'foul', 'safety', 'break_start', 'break_end', 'frame_start', 'frame_end', 'match_start', 'match_end', 'pause', 'resume')),
  player_id UUID REFERENCES players(id),
  
  -- Scoring
  points INTEGER DEFAULT 0,
  ball_potted INTEGER, -- 1-15 for pool, colors for snooker
  break_score INTEGER DEFAULT 0,
  frame_number INTEGER,
  
  -- Timing
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  
  -- Additional Details
  details JSONB DEFAULT '{}', -- flexible data for different event types
  
  -- Metadata
  created_by UUID REFERENCES auth.users(id)
);

-- Match Spectators (for engagement tracking)
CREATE TABLE IF NOT EXISTS match_spectators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES live_matches(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  
  -- Session Tracking
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ,
  total_watch_time INTERVAL,
  
  -- Engagement
  comments_count INTEGER DEFAULT 0,
  reactions_count INTEGER DEFAULT 0
);

-- Match Statistics View
CREATE OR REPLACE VIEW match_statistics AS
SELECT 
  lm.id as match_id,
  lm.tournament_id,
  lm.player1_id,
  lm.player2_id,
  lm.status,
  lm.player1_score,
  lm.player2_score,
  lm.current_frame,
  lm.total_frames,
  lm.player1_highest_break,
  lm.player2_highest_break,
  
  -- Calculate match progress
  CASE 
    WHEN lm.total_frames > 0 THEN 
      ROUND((lm.current_frame::decimal / lm.total_frames::decimal) * 100, 1)
    ELSE 0 
  END as progress_percentage,
  
  -- Player statistics
  p1.name as player1_name,
  p1.avatar_url as player1_avatar,
  p2.name as player2_name,
  p2.avatar_url as player2_avatar,
  
  -- Tournament information
  t.name as tournament_name,
  
  -- Spectator count
  COALESCE(spectator_stats.active_spectators, 0) as active_spectators,
  COALESCE(spectator_stats.total_spectators, 0) as total_spectators,
  
  -- Event counts
  COALESCE(event_stats.total_events, 0) as total_events,
  COALESCE(event_stats.pots_player1, 0) as pots_player1,
  COALESCE(event_stats.pots_player2, 0) as pots_player2,
  
  -- Timing
  lm.start_time,
  lm.end_time,
  CASE 
    WHEN lm.status = 'live' AND lm.start_time IS NOT NULL THEN
      NOW() - lm.start_time
    WHEN lm.status = 'completed' AND lm.start_time IS NOT NULL AND lm.end_time IS NOT NULL THEN
      lm.end_time - lm.start_time
    ELSE NULL
  END as match_duration

FROM live_matches lm
LEFT JOIN players p1 ON lm.player1_id = p1.id
LEFT JOIN players p2 ON lm.player2_id = p2.id  
LEFT JOIN tournaments t ON lm.tournament_id = t.id
LEFT JOIN (
  SELECT 
    match_id,
    COUNT(*) FILTER (WHERE left_at IS NULL) as active_spectators,
    COUNT(*) as total_spectators
  FROM match_spectators 
  GROUP BY match_id
) spectator_stats ON lm.id = spectator_stats.match_id
LEFT JOIN (
  SELECT 
    match_id,
    COUNT(*) as total_events,
    COUNT(*) FILTER (WHERE event_type = 'pot' AND player_id = lm.player1_id) as pots_player1,
    COUNT(*) FILTER (WHERE event_type = 'pot' AND player_id = lm.player2_id) as pots_player2
  FROM match_events me
  LEFT JOIN live_matches lm ON me.match_id = lm.id
  GROUP BY match_id
) event_stats ON lm.id = event_stats.match_id;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_live_matches_status ON live_matches(status);
CREATE INDEX IF NOT EXISTS idx_live_matches_tournament ON live_matches(tournament_id);
CREATE INDEX IF NOT EXISTS idx_live_matches_players ON live_matches(player1_id, player2_id);
CREATE INDEX IF NOT EXISTS idx_match_events_match ON match_events(match_id);
CREATE INDEX IF NOT EXISTS idx_match_events_type ON match_events(event_type);
CREATE INDEX IF NOT EXISTS idx_match_spectators_match ON match_spectators(match_id);

-- RLS Policies
ALTER TABLE live_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_spectators ENABLE ROW LEVEL SECURITY;

-- Live matches are readable by everyone
CREATE POLICY "Live matches are publicly readable"
  ON live_matches FOR SELECT
  USING (true);

-- Only authenticated users can create/update matches
CREATE POLICY "Authenticated users can create matches"
  ON live_matches FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Match creators can update matches"
  ON live_matches FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid() OR auth.uid() IN (
    SELECT user_id FROM user_roles WHERE role IN ('admin', 'official')
  ));

-- Match events policies
CREATE POLICY "Match events are publicly readable"
  ON match_events FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create match events"
  ON match_events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Spectators policies  
CREATE POLICY "Users can view spectator data"
  ON match_spectators FOR SELECT
  USING (true);

CREATE POLICY "Users can join as spectators"
  ON match_spectators FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their spectator status"
  ON match_spectators FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Functions for match management
CREATE OR REPLACE FUNCTION start_live_match(match_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE live_matches 
  SET 
    status = 'live',
    start_time = NOW(),
    frame_start_time = NOW(),
    updated_at = NOW()
  WHERE id = match_uuid;
  
  -- Log match start event
  INSERT INTO match_events (match_id, event_type, frame_number, details)
  VALUES (match_uuid, 'match_start', 1, '{"auto_generated": true}');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION end_live_match(match_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE live_matches 
  SET 
    status = 'completed',
    end_time = NOW(),
    updated_at = NOW()
  WHERE id = match_uuid;
  
  -- Log match end event
  INSERT INTO match_events (match_id, event_type, details)
  VALUES (match_uuid, 'match_end', '{"auto_generated": true}');
  
  -- Close all spectator sessions
  UPDATE match_spectators 
  SET 
    left_at = NOW(),
    total_watch_time = NOW() - joined_at
  WHERE match_id = match_uuid AND left_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;