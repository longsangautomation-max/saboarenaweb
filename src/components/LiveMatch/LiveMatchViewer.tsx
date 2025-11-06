import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveMatch } from "@/hooks/useLiveMatch";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LiveScoreboard from "./LiveScoreboard";
import MatchStatistics from "./MatchStatistics";
import SpectatorChat from "./SpectatorChat";
import { 
  Play, 
  Pause, 
  Users, 
  Eye, 
  EyeOff,
  Trophy,
  Clock,
  Target,
  Activity,
  Zap,
  MessageCircle,
  BarChart3,
  Tv,
  Share2,
  Heart,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface LiveMatchViewerProps {
  matchId: string;
  isOfficialMode?: boolean;
}

const LiveMatchViewer = ({ matchId, isOfficialMode = false }: LiveMatchViewerProps) => {
  const { user } = useAuth();
  const {
    match,
    statistics,
    events,
    isLoading,
    error,
    isSpectating,
    joinAsSpectator,
    leaveAsSpectator,
    startMatch,
    endMatch,
  } = useLiveMatch(matchId);

  const [activeTab, setActiveTab] = useState<'scoreboard' | 'stats' | 'chat'>('scoreboard');
  const [isLiked, setIsLiked] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !match || !statistics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || "Không thể tải thông tin trận đấu"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (match.status) {
      case 'live':
        return <Activity className="w-4 h-4 text-red-500" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusText = () => {
    switch (match.status) {
      case 'live':
        return 'LIVE';
      case 'paused':
        return 'TẠII DỪNG';
      case 'completed':
        return 'ĐÃ KẾT THÚC';
      default:
        return 'SẮP DIỄN RA';
    }
  };

  const getStatusColor = () => {
    switch (match.status) {
      case 'live':
        return 'bg-red-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-slate-500';
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/live-match/${matchId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${statistics.player1_name} vs ${statistics.player2_name}`,
          text: `Xem trận đấu trực tiếp tại ${statistics.tournament_name}`,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link đã được copy vào clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-gold/20 bg-background/95 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`px-3 py-1 rounded-full ${getStatusColor()} text-white text-sm font-bold flex items-center gap-2`}
                    animate={match.status === 'live' ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {getStatusIcon()}
                    {getStatusText()}
                  </motion.div>
                  <Badge variant="outline" className="text-gold border-gold/50">
                    {statistics.tournament_name}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </Button>
                  
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
                  </Button>
                </div>
              </div>

              {/* Players Header */}
              <div className="flex items-center justify-center gap-8 mt-4">
                <motion.div 
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    match.current_player === statistics.player1_id 
                      ? 'bg-gold/20 border border-gold/50' 
                      : 'bg-slate-800/50'
                  }`}
                  animate={match.current_player === statistics.player1_id ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Avatar className="w-12 h-12 border-2 border-gold/50">
                    <AvatarImage src={statistics.player1_avatar || undefined} />
                    <AvatarFallback className="bg-gold text-black font-bold">
                      {statistics.player1_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">{statistics.player1_name}</div>
                    <div className="text-sm text-slate-400">
                      Highest Break: {statistics.player1_highest_break}
                    </div>
                  </div>
                </motion.div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-gold mb-2">
                    {statistics.player1_score} - {statistics.player2_score}
                  </div>
                  <div className="text-sm text-slate-400">
                    Frame {match.current_frame} of {match.total_frames}
                  </div>
                  <Progress 
                    value={statistics.progress_percentage} 
                    className="w-32 mt-2" 
                  />
                </div>

                <motion.div 
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    match.current_player === statistics.player2_id 
                      ? 'bg-gold/20 border border-gold/50' 
                      : 'bg-slate-800/50'
                  }`}
                  animate={match.current_player === statistics.player2_id ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-right">
                    <div className="font-semibold text-white">{statistics.player2_name}</div>
                    <div className="text-sm text-slate-400">
                      Highest Break: {statistics.player2_highest_break}
                    </div>
                  </div>
                  <Avatar className="w-12 h-12 border-2 border-gold/50">
                    <AvatarImage src={statistics.player2_avatar || undefined} />
                    <AvatarFallback className="bg-gold text-black font-bold">
                      {statistics.player2_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
              </div>

              {/* Current Break Info */}
              {match.status === 'live' && match.current_break > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center mt-4 p-3 bg-gold/10 rounded-lg border border-gold/30"
                >
                  <div className="flex items-center justify-center gap-2 text-gold">
                    <Zap className="w-5 h-5" />
                    <span className="font-semibold">Current Break: {match.current_break}</span>
                  </div>
                </motion.div>
              )}

              {/* Spectator Info */}
              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{statistics.active_spectators} đang xem</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>{statistics.total_events} events</span>
                </div>
                {statistics.match_duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{statistics.match_duration}</span>
                  </div>
                )}
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Spectator Controls */}
        {!isOfficialMode && user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="border-slate-700 bg-slate-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Tv className="w-5 h-5 text-gold" />
                    <span className="font-semibold">Spectator Mode</span>
                  </div>
                  
                  <Button
                    onClick={isSpectating ? leaveAsSpectator : joinAsSpectator}
                    variant={isSpectating ? "destructive" : "default"}
                    className={isSpectating ? "" : "bg-gold hover:bg-gold/90 text-black"}
                  >
                    {isSpectating ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Rời khỏi
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Theo dõi trận đấu
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Official Controls */}
        {isOfficialMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="border-gold/20 bg-background/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-gold" />
                  Match Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  {match.status === 'scheduled' && (
                    <Button onClick={startMatch} className="bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-2" />
                      Bắt đầu trận đấu
                    </Button>
                  )}
                  
                  {match.status === 'live' && (
                    <Button onClick={endMatch} className="bg-red-600 hover:bg-red-700">
                      Kết thúc trận đấu
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-gold/20 bg-background/95 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex space-x-4">
                <Button
                  variant={activeTab === 'scoreboard' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('scoreboard')}
                  className={activeTab === 'scoreboard' ? 'bg-gold text-black' : ''}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Bảng điểm
                </Button>
                <Button
                  variant={activeTab === 'stats' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('stats')}
                  className={activeTab === 'stats' ? 'bg-gold text-black' : ''}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Thống kê
                </Button>
                <Button
                  variant={activeTab === 'chat' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('chat')}
                  className={activeTab === 'chat' ? 'bg-gold text-black' : ''}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat ({statistics.active_spectators})
                </Button>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'scoreboard' && (
                  <motion.div
                    key="scoreboard"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <LiveScoreboard 
                      match={match} 
                      events={events} 
                      statistics={statistics}
                      isOfficialMode={isOfficialMode}
                    />
                  </motion.div>
                )}

                {activeTab === 'stats' && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <MatchStatistics 
                      match={match} 
                      events={events} 
                      statistics={statistics} 
                    />
                  </motion.div>
                )}

                {activeTab === 'chat' && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <SpectatorChat 
                      matchId={matchId}
                      isSpectating={isSpectating}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveMatchViewer;