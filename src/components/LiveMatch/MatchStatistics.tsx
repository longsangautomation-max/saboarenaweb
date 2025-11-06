import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { MatchEvent, MatchStatistics as MatchStatsType } from "@/hooks/useLiveMatch";
import {
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Activity,
  Zap,
  BarChart3
} from "lucide-react";

interface MatchStatisticsProps {
  events: MatchEvent[];
  statistics: MatchStatsType;
}

const MatchStatistics = ({ events, statistics }: MatchStatisticsProps) => {
  // Calculate detailed statistics from events
  const detailedStats = useMemo(() => {
    const player1Events = events.filter(e => e.player_id === statistics.player1_id);
    const player2Events = events.filter(e => e.player_id === statistics.player2_id);

    const player1Pots = player1Events.filter(e => e.event_type === 'pot').length;
    const player2Pots = player2Events.filter(e => e.event_type === 'pot').length;
    
    const player1Miss = player1Events.filter(e => e.event_type === 'miss').length;
    const player2Miss = player2Events.filter(e => e.event_type === 'miss').length;
    
    const player1Fouls = player1Events.filter(e => e.event_type === 'foul').length;
    const player2Fouls = player2Events.filter(e => e.event_type === 'foul').length;

    const player1TotalPoints = player1Events.reduce((sum, e) => sum + (e.points || 0), 0);
    const player2TotalPoints = player2Events.reduce((sum, e) => sum + (e.points || 0), 0);

    const player1Accuracy = player1Pots + player1Miss > 0 
      ? (player1Pots / (player1Pots + player1Miss)) * 100 
      : 0;
    const player2Accuracy = player2Pots + player2Miss > 0 
      ? (player2Pots / (player2Pots + player2Miss)) * 100 
      : 0;

    return {
      player1: {
        pots: player1Pots,
        miss: player1Miss,
        fouls: player1Fouls,
        totalPoints: player1TotalPoints,
        accuracy: player1Accuracy,
      },
      player2: {
        pots: player2Pots,
        miss: player2Miss,
        fouls: player2Fouls,
        totalPoints: player2TotalPoints,
        accuracy: player2Accuracy,
      }
    };
  }, [events, statistics.player1_id, statistics.player2_id]);

  const StatCard = ({ 
    title, 
    icon, 
    player1Value, 
    player2Value, 
    player1Label, 
    player2Label,
    format = 'number',
    color = 'default'
  }: {
    title: string;
    icon: React.ReactNode;
    player1Value: number;
    player2Value: number;
    player1Label: string;
    player2Label: string;
    format?: 'number' | 'percentage';
    color?: 'default' | 'gold' | 'green' | 'red';
  }) => {
    const formatValue = (value: number) => {
      if (format === 'percentage') {
        return `${value.toFixed(1)}%`;
      }
      return value.toString();
    };

    const getColorClass = () => {
      switch (color) {
        case 'gold':
          return 'text-gold';
        case 'green':
          return 'text-green-400';
        case 'red':
          return 'text-red-400';
        default:
          return 'text-slate-300';
      }
    };

    return (
      <Card className="border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">{player1Label}</span>
            <span className={`font-bold ${getColorClass()}`}>
              {formatValue(player1Value)}
            </span>
          </div>
          
          {format === 'percentage' && (
            <Progress 
              value={Math.max(player1Value, player2Value) > 0 ? 
                (player1Value / Math.max(player1Value, player2Value)) * 100 : 0
              } 
              className="h-2" 
            />
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">{player2Label}</span>
            <span className={`font-bold ${getColorClass()}`}>
              {formatValue(player2Value)}
            </span>
          </div>
          
          {format === 'percentage' && (
            <Progress 
              value={Math.max(player1Value, player2Value) > 0 ? 
                (player2Value / Math.max(player1Value, player2Value)) * 100 : 0
              } 
              className="h-2" 
            />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overall Match Progress */}
      <Card className="border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-gold" />
              Match Progress
            </h3>
            <Badge variant="outline" className="text-gold border-gold/50">
              {statistics.progress_percentage.toFixed(1)}%
            </Badge>
          </div>
          
          <Progress value={statistics.progress_percentage} className="mb-3" />
          
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-gold">{statistics.player1_score}</div>
              <div className="text-slate-400">{statistics.player1_name}</div>
            </div>
            <div>
              <div className="text-slate-400">Frames</div>
              <div className="text-white">{statistics.current_frame}/{statistics.total_frames}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">{statistics.player2_score}</div>
              <div className="text-slate-400">{statistics.player2_name}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Highest Break"
          icon={<Zap className="w-4 h-4 text-gold" />}
          player1Value={statistics.player1_highest_break}
          player2Value={statistics.player2_highest_break}
          player1Label={statistics.player1_name}
          player2Label={statistics.player2_name}
          color="gold"
        />

        <StatCard
          title="Total Pots"
          icon={<Target className="w-4 h-4 text-green-400" />}
          player1Value={detailedStats.player1.pots}
          player2Value={detailedStats.player2.pots}
          player1Label={statistics.player1_name}
          player2Label={statistics.player2_name}
          color="green"
        />

        <StatCard
          title="Accuracy"
          icon={<TrendingUp className="w-4 h-4 text-blue-400" />}
          player1Value={detailedStats.player1.accuracy}
          player2Value={detailedStats.player2.accuracy}
          player1Label={statistics.player1_name}
          player2Label={statistics.player2_name}
          format="percentage"
        />

        <StatCard
          title="Total Points"
          icon={<BarChart3 className="w-4 h-4 text-gold" />}
          player1Value={detailedStats.player1.totalPoints}
          player2Value={detailedStats.player2.totalPoints}
          player1Label={statistics.player1_name}
          player2Label={statistics.player2_name}
          color="gold"
        />

        <StatCard
          title="Fouls"
          icon={<Activity className="w-4 h-4 text-red-400" />}
          player1Value={detailedStats.player1.fouls}
          player2Value={detailedStats.player2.fouls}
          player1Label={statistics.player1_name}
          player2Label={statistics.player2_name}
          color="red"
        />

        <StatCard
          title="Spectators"
          icon={<Clock className="w-4 h-4 text-blue-400" />}
          player1Value={statistics.active_spectators}
          player2Value={statistics.total_spectators}
          player1Label="Currently Watching"
          player2Label="Total Joined"
        />
      </div>

      {/* Match Timeline */}
      <Card className="border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" />
            Match Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statistics.start_time && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg"
              >
                <Badge variant="outline" className="text-green-400 border-green-400/50">
                  Start
                </Badge>
                <span className="text-white">
                  {new Date(statistics.start_time).toLocaleString('vi-VN')}
                </span>
              </motion.div>
            )}

            {statistics.match_duration && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg"
              >
                <Badge variant="outline" className="text-gold border-gold/50">
                  Duration
                </Badge>
                <span className="text-white">
                  {statistics.match_duration}
                </span>
              </motion.div>
            )}

            {statistics.end_time && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg"
              >
                <Badge variant="outline" className="text-red-400 border-red-400/50">
                  End
                </Badge>
                <span className="text-white">
                  {new Date(statistics.end_time).toLocaleString('vi-VN')}
                </span>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchStatistics;