# Phase 9: Live Match Scoring System - Implementation Plan

## Tổng Quan
Phát triển hệ thống live scoring cho các trận đấu bi-a, cho phép real-time tracking và spectator engagement.

## Core Features

### 1. Live Match Interface
- **Real-time Score Updates**: Cập nhật điểm số trực tiếp
- **Match Progress Tracking**: Theo dõi progress (frames, sets)
- **Break Tracking**: Ghi lại highest break của từng player
- **Shot Clock**: Đếm thời gian shot (optional)

### 2. Spectator Experience  
- **Live Leaderboard**: Bảng xếp hạng real-time
- **Match Statistics**: Stats chi tiết cho từng player
- **Commentary System**: Live comments từ officials
- **Betting Odds Integration**: Tỷ lệ cược real-time (future)

### 3. Tournament Management
- **Match Scheduling**: Lịch thi đấu live
- **Bracket Updates**: Cập nhật bracket real-time
- **Result Broadcasting**: Phát kết quả tự động

## Technical Architecture

### Database Schema (Supabase)
```sql
-- Live Matches Table
CREATE TABLE live_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id),
  player1_id UUID REFERENCES players(id),
  player2_id UUID REFERENCES players(id),
  status TEXT DEFAULT 'scheduled', -- scheduled, live, completed, paused
  current_frame INTEGER DEFAULT 1,
  total_frames INTEGER DEFAULT 9, -- best of 9, 11, etc.
  player1_score INTEGER DEFAULT 0,
  player2_score INTEGER DEFAULT 0,
  player1_breaks INTEGER[] DEFAULT '{}',
  player2_breaks INTEGER[] DEFAULT '{}',
  current_player UUID, -- who's shooting
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  commentary TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Match Events Table (for detailed tracking)
CREATE TABLE match_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES live_matches(id),
  event_type TEXT, -- 'pot', 'miss', 'foul', 'break', 'frame_end'
  player_id UUID REFERENCES players(id),
  points INTEGER DEFAULT 0,
  break_score INTEGER DEFAULT 0,
  frame_number INTEGER,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  details JSONB -- flexible data for different event types
);

-- Match Spectators (for engagement tracking)
CREATE TABLE match_spectators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES live_matches(id),
  user_id UUID REFERENCES auth.users(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ
);
```

### Real-time Architecture
- **Supabase Realtime**: Live updates cho scores và events
- **WebSocket Integration**: Instant notifications
- **Optimistic Updates**: Smooth UX với immediate feedback
- **Conflict Resolution**: Handle concurrent updates

## UI/UX Design

### Live Match Viewer
```
+------------------------------------------+
|  🏆 SABO Championship Final             |
|  ⚪ Nguyễn Văn A  vs  Trần Văn B ⚪      |
+------------------------------------------+
|           3    -    2                    |
|       Frame 6 of 9                      |
+------------------------------------------+
|  Current Break: 47 (Nguyễn Văn A)      |
|  🎯 Shooting: Nguyễn Văn A              |
+------------------------------------------+
|  📊 Stats  💬 Chat  📺 Stream           |
+------------------------------------------+
```

### Match Control Panel (Officials)
```
+------------------------------------------+
|  🎮 Match Control                        |
+------------------------------------------+
|  [+1] [+2] [+3] [+4] [+5] [+6] [+7]    |
|  [ Miss ] [ Foul ] [ Break End ]        |
|  [ Frame End ] [ Match End ]            |
+------------------------------------------+
|  Current Player: [Switch]               |
|  Commentary: [Add Note...]              |
+------------------------------------------+
```

## Implementation Phases

### Phase 9a: Basic Live Scoring
- Live match creation và management
- Basic score updates (frame wins)
- Real-time spectator view
- Simple commentary system

### Phase 9b: Advanced Features  
- Detailed shot tracking
- Break recording
- Statistics compilation
- Enhanced spectator engagement

### Phase 9c: Tournament Integration
- Bracket real-time updates
- Leaderboard integration
- Notification system
- Mobile app sync

## Files to Create/Modify

### New Components
- `src/components/LiveMatch/LiveMatchViewer.tsx`
- `src/components/LiveMatch/MatchControl.tsx` 
- `src/components/LiveMatch/LiveScoreboard.tsx`
- `src/components/LiveMatch/MatchStatistics.tsx`
- `src/components/LiveMatch/SpectatorChat.tsx`

### New Hooks
- `src/hooks/useLiveMatch.ts`
- `src/hooks/useMatchEvents.ts`
- `src/hooks/useRealtimeUpdates.ts`

### New Pages
- `src/pages/LiveMatch.tsx`
- `src/pages/MatchControl.tsx`

### Database Utilities
- `src/lib/liveMatchHelpers.ts`
- `src/lib/realtimeSubscriptions.ts`

## Success Metrics
- Real-time update latency < 500ms
- Concurrent spectators support (100+)
- Match officials satisfaction với control interface
- Spectator engagement (time spent watching)

## Next Steps
1. Set up database schema
2. Implement basic live match viewer
3. Create match control interface
4. Add real-time subscriptions
5. Test với sample match data

Ready to start implementation? 🚀