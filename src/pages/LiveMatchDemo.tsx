import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Clock, 
  Users, 
  Trophy,
  Play,
  Eye,
  Zap
} from "lucide-react";

const LiveMatchDemo = () => {
  // Sample live matches for demo
  const liveMatches = [
    {
      id: "demo-match-1",
      tournament: "SABO Championship 2024",
      player1: "Nguyễn Văn A",
      player2: "Trần Văn B", 
      player1Score: 3,
      player2Score: 2,
      currentFrame: 6,
      totalFrames: 9,
      status: "live" as const,
      spectators: 127,
      currentBreak: 47,
      startTime: new Date(Date.now() - 2700000).toISOString(), // 45 minutes ago
    },
    {
      id: "demo-match-2",
      tournament: "Vietnam Open 2024",
      player1: "Lê Văn C",
      player2: "Phạm Văn D",
      player1Score: 1,
      player2Score: 4,
      currentFrame: 6,
      totalFrames: 7,
      status: "live" as const,
      spectators: 89,
      currentBreak: 0,
      startTime: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    },
    {
      id: "demo-match-3",
      tournament: "Ho Chi Minh City Cup",
      player1: "Hoàng Văn E",
      player2: "Đỗ Văn F",
      player1Score: 0,
      player2Score: 0,
      currentFrame: 1,
      totalFrames: 5,
      status: "scheduled" as const,
      spectators: 0,
      currentBreak: 0,
      startTime: new Date(Date.now() + 900000).toISOString(), // 15 minutes from now
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Badge className="bg-red-500 hover:bg-red-600">
              <Activity className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          </motion.div>
        );
      case 'scheduled':
        return (
          <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">
            <Clock className="w-3 h-3 mr-1" />
            SẮP DIỄN RA
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDuration = (startTime: string, status: string) => {
    if (status !== 'live') return null;
    
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = now.getTime() - start.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent mb-4">
              Live Match Demo
            </h1>
            <p className="text-xl text-slate-400 mb-6">
              Phase 9: Live Match Scoring System Demo
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Badge variant="outline" className="text-gold border-gold/50">
                <Zap className="w-3 h-3 mr-1" />
                Real-time Updates
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                <Users className="w-3 h-3 mr-1" />
                Live Chat
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                <Trophy className="w-3 h-3 mr-1" />
                Match Statistics
              </Badge>
            </div>
          </motion.div>

          {/* Live Matches Grid */}
          <div className="grid gap-6 max-w-4xl mx-auto">
            {liveMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-gold/20 bg-background/95 backdrop-blur-sm hover:border-gold/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <Trophy className="w-5 h-5 text-gold" />
                          {match.tournament}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Frame {match.currentFrame} of {match.totalFrames}
                        </CardDescription>
                      </div>
                      {getStatusBadge(match.status)}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Players & Score */}
                    <div className="flex items-center justify-center gap-8">
                      <div className="text-center">
                        <div className="font-semibold text-white">{match.player1}</div>
                        <div className="text-2xl font-bold text-gold mt-1">
                          {match.player1Score}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-slate-400 text-sm">vs</div>
                        <div className="text-lg font-bold text-white">-</div>
                      </div>

                      <div className="text-center">
                        <div className="font-semibold text-white">{match.player2}</div>
                        <div className="text-2xl font-bold text-gold mt-1">
                          {match.player2Score}
                        </div>
                      </div>
                    </div>

                    {/* Match Info */}
                    <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
                      {match.status === 'live' && (
                        <>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{match.spectators} watching</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatDuration(match.startTime, match.status)}</span>
                          </div>
                          {match.currentBreak > 0 && (
                            <div className="flex items-center gap-1 text-gold">
                              <Zap className="w-4 h-4" />
                              <span>Break: {match.currentBreak}</span>
                            </div>
                          )}
                        </>
                      )}
                      
                      {match.status === 'scheduled' && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            Bắt đầu lúc {new Date(match.startTime).toLocaleTimeString('vi-VN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center pt-2">
                      <Link to={`/live-match/${match.id}`}>
                        <Button 
                          className={`${
                            match.status === 'live' 
                              ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                              : 'bg-gold hover:bg-gold/90 text-black'
                          } min-w-[140px]`}
                        >
                          {match.status === 'live' ? (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Xem Live
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </>
                          )}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Features Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mt-12"
          >
            <Card className="border-gold/20 bg-background/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Phase 9 Features</CardTitle>
                <CardDescription>
                  Live Match Scoring System đã được triển khai thành công
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gold">✅ Đã triển khai:</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Real-time match viewer với live updates</li>
                    <li>• Live scoreboard với frame tracking</li>
                    <li>• Match statistics và break recording</li>
                    <li>• Spectator chat system</li>
                    <li>• Device-responsive UI</li>
                    <li>• Match control interface</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gold">🔄 Tính năng demo:</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Mock live match data</li>
                    <li>• Simulated real-time updates</li>
                    <li>• Sample chat messages</li>
                    <li>• Interactive spectator experience</li>
                    <li>• Match statistics calculation</li>
                    <li>• Multi-tab interface</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LiveMatchDemo;