import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import {
  MessageCircle,
  Send,
  Users,
  Heart,
  Smile,
  Eye,
  AlertCircle
} from "lucide-react";

interface ChatMessage {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  message: string;
  timestamp: string;
  reactions?: { [emoji: string]: number };
}

interface SpectatorChatProps {
  matchId: string;
  isSpectating: boolean;
}

const SpectatorChat = ({ matchId, isSpectating }: SpectatorChatProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock messages for demo
  const mockMessages: ChatMessage[] = [
    {
      id: "1",
      user_id: "user1",
      username: "BiLiardFan2024",
      message: "Trận đấu này hay quá! Ai nghĩ sẽ thắng? 🎱",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      reactions: { "🔥": 3, "👍": 2 }
    },
    {
      id: "2", 
      user_id: "user2",
      username: "Cuemaster",
      message: "Break này của Nguyễn Văn A đỉnh thật!",
      timestamp: new Date(Date.now() - 240000).toISOString(),
      reactions: { "💪": 5, "🎯": 2 }
    },
    {
      id: "3",
      user_id: "user3", 
      username: "PoolLover",
      message: "147 maximum break incoming? 😱",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      reactions: { "😱": 4, "🤞": 3 }
    },
    {
      id: "4",
      user_id: "user4",
      username: "SaboFan",
      message: "Atmosphere ở tournament này tuyệt vời!",
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
  ];

  useEffect(() => {
    // Load mock messages
    setMessages(mockMessages);
  }, [matchId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !isSpectating) return;

    setIsLoading(true);
    
    try {
      // Mock sending message
      const mockNewMessage: ChatMessage = {
        id: Date.now().toString(),
        user_id: user.id,
        username: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        avatar_url: user.user_metadata?.avatar_url,
        message: newMessage,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, mockNewMessage]);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Vừa xong';
    if (diffMinutes < 60) return `${diffMinutes}p trước`;
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isSpectating && user) {
    return (
      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <CardContent className="p-6 text-center">
          <Eye className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Tham gia xem trận đấu để chat
          </h3>
          <p className="text-slate-400 mb-4">
            Bạn cần tham gia xem trận đấu để có thể chat với các spectators khác
          </p>
          <Button className="bg-gold hover:bg-gold/90 text-black">
            <Eye className="w-4 h-4 mr-2" />
            Tham gia xem
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Bạn cần đăng nhập để tham gia chat trong trận đấu.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chat Header */}
      <Card className="border-gold/20 bg-gold/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-gold" />
              <div>
                <h3 className="font-semibold text-white">Live Chat</h3>
                <p className="text-sm text-slate-400">
                  Trò chuyện với {messages.length + 50} spectators
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-gold border-gold/50">
              <Users className="w-3 h-3 mr-1" />
              {Math.floor(Math.random() * 100) + 50} online
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96 px-4">
            <div className="space-y-4 pb-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 p-3 hover:bg-slate-800/50 rounded-lg transition-colors"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.avatar_url} />
                      <AvatarFallback className="text-xs bg-gold text-black">
                        {message.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white truncate">
                          {message.username}
                        </span>
                        <span className="text-xs text-slate-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-300 break-words">
                        {message.message}
                      </p>
                      
                      {message.reactions && Object.keys(message.reactions).length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {Object.entries(message.reactions).map(([emoji, count]) => (
                            <button
                              key={emoji}
                              onClick={() => handleReaction(message.id, emoji)}
                              className="flex items-center gap-1 px-2 py-1 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-xs transition-colors"
                            >
                              <span>{emoji}</span>
                              <span className="text-slate-400">{count}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleReaction(message.id, '👍')}
                        className="p-1 hover:bg-slate-700/50 rounded text-slate-400 hover:text-white transition-colors"
                      >
                        <Heart className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleReaction(message.id, '😂')}
                        className="p-1 hover:bg-slate-700/50 rounded text-slate-400 hover:text-white transition-colors"
                      >
                        <Smile className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="border-t border-slate-700 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1"
                disabled={!isSpectating || isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || !isSpectating || isLoading}
                className="bg-gold hover:bg-gold/90 text-black"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {!isSpectating && (
              <p className="text-xs text-slate-500 mt-2">
                Tham gia xem trận đấu để có thể chat
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reactions */}
      <Card className="border-slate-700">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold text-white mb-3">Quick Reactions</h4>
          <div className="flex gap-2 flex-wrap">
            {['🔥', '👏', '😱', '💪', '🎯', '👍', '❤️', '😂'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  // Add as a quick chat message
                  if (isSpectating && user) {
                    const mockReaction: ChatMessage = {
                      id: Date.now().toString(),
                      user_id: user.id,
                      username: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
                      avatar_url: user.user_metadata?.avatar_url,
                      message: emoji,
                      timestamp: new Date().toISOString(),
                    };
                    setMessages(prev => [...prev, mockReaction]);
                  }
                }}
                disabled={!isSpectating}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors text-xl disabled:opacity-50"
              >
                {emoji}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpectatorChat;