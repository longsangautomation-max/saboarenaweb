import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LiveMatch, MatchEvent, MatchStatistics } from "@/hooks/useLiveMatch";
import {
  Trophy,
  Target,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  Circle,
  Minus
} from "lucide-react";

interface LiveScoreboardProps {
  match: LiveMatch;
  events: MatchEvent[];
  statistics: MatchStatistics;
  isOfficialMode?: boolean;
}

const LiveScoreboard = ({ match, events, statistics }: LiveScoreboardProps) => {
  // Get recent events (last 10)
  const recentEvents = events.slice(0, 10);

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'pot':
        return <Target className="w-4 h-4 text-green-400" />;
      case 'miss':
        return <Minus className="w-4 h-4 text-red-400" />;
      case 'foul':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'break_start':
        return <Zap className="w-4 h-4 text-gold" />;
      case 'frame_end':
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      default:
        return <Circle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getEventDescription = (event: MatchEvent) => {
    const playerName = event.player_id === statistics.player1_id 
      ? statistics.player1_name 
      : statistics.player2_name;

    switch (event.event_type) {
      case 'pot':
        return `${playerName} potted ball ${event.ball_potted || ''} (+${event.points})`;
      case 'miss':
        return `${playerName} missed`;
      case 'foul':
        return `${playerName} committed a foul (-${event.points})`;
      case 'break_start':
        return `${playerName} started break`;
      case 'break_end':
        return `${playerName} ended break (${event.break_score} points)`;
      case 'frame_start':
        return `Frame ${event.frame_number} started`;
      case 'frame_end':
        return `Frame ${event.frame_number} completed`;
      default:
        return `${event.event_type.replace('_', ' ')}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Frame Status */}
      <Card className="border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-gold" />
              <div>
                <h3 className="font-semibold text-white">
                  Frame {match.current_frame} of {match.total_frames}
                </h3>
                <p className="text-sm text-slate-400">
                  {match.status === 'live' ? 'Đang diễn ra' : 'Chưa bắt đầu'}
                </p>
              </div>
            </div>

            {match.current_break > 0 && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-right"
              >
                <div className="text-2xl font-bold text-gold">{match.current_break}</div>
                <div className="text-xs text-slate-400">Current Break</div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Frame History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Player 1 Breaks */}
        <Card className="border-slate-700">
          <CardContent className="p-4">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-gold" />
              {statistics.player1_name} - Breaks
            </h4>
            <div className="space-y-2">
              {match.player1_breaks.length > 0 ? (
                match.player1_breaks.map((breakScore, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                    <span className="text-slate-300">Break {index + 1}</span>
                    <Badge variant="secondary" className="text-gold">
                      {breakScore} points
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-500 py-4">
                  Chưa có break nào
                </div>
              )}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">Highest Break</span>
              <span className="text-xl font-bold text-gold">
                {statistics.player1_highest_break}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Player 2 Breaks */}
        <Card className="border-slate-700">
          <CardContent className="p-4">
            <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-gold" />
              {statistics.player2_name} - Breaks
            </h4>
            <div className="space-y-2">
              {match.player2_breaks.length > 0 ? (
                match.player2_breaks.map((breakScore, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                    <span className="text-slate-300">Break {index + 1}</span>
                    <Badge variant="secondary" className="text-gold">
                      {breakScore} points
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-500 py-4">
                  Chưa có break nào
                </div>
              )}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-white">Highest Break</span>
              <span className="text-xl font-bold text-gold">
                {statistics.player2_highest_break}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card className="border-slate-700">
        <CardContent className="p-4">
          <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            Recent Events
          </h4>
          
          {recentEvents.length > 0 ? (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                >
                  {getEventIcon(event.event_type)}
                  <div className="flex-1">
                    <div className="text-sm text-white">
                      {getEventDescription(event)}
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(event.timestamp).toLocaleTimeString('vi-VN')}
                    </div>
                  </div>
                  {event.points !== 0 && (
                    <Badge 
                      variant={event.points > 0 ? "default" : "destructive"}
                      className={event.points > 0 ? "bg-green-600" : ""}
                    >
                      {event.points > 0 ? '+' : ''}{event.points}
                    </Badge>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500 py-8">
              Chưa có sự kiện nào được ghi nhận
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveScoreboard;