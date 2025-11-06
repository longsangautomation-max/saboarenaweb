import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useDeepLink } from "@/hooks/useDeepLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import { 
  Smartphone, 
  Monitor, 
  ExternalLink,
  Trophy,
  Users,
  DollarSign,
  Calendar,
  Zap,
  Download,
  Share2,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const DeepLinkDemo = () => {
  const { user } = useAuth();
  const { deviceInfo, smartRedirect, getUniversalLink } = useDeepLink();

  // Sample tournament data for demo
  const sampleTournament = {
    id: "demo-tournament-123",
    name: "SABO Arena Championship 2024",
    description: "Giải đấu bi-a hàng đầu Việt Nam",
    current_participants: 42,
    max_participants: 64,
    entry_fee: 500000,
    prize_pool: 10000000,
    status: "upcoming",
  };

  const handleDeepLinkTest = async (action: "register" | "view" | "share") => {
    switch (action) {
      case "register":
        await smartRedirect({
          tournamentId: sampleTournament.id,
          action: "register",
          userId: user?.id,
          fallbackUrl: `/tournaments/${sampleTournament.id}/register`,
        });
        break;
        
      case "view":
        await smartRedirect({
          tournamentId: sampleTournament.id,
          action: "view",
          fallbackUrl: `/tournaments/${sampleTournament.id}`,
        });
        break;
        
      case "share": {
        const universalLink = getUniversalLink({
          tournamentId: sampleTournament.id,
          action: "view",
        });
        
        if (navigator.share) {
          navigator.share({
            title: sampleTournament.name,
            text: `Tham gia giải đấu ${sampleTournament.name}`,
            url: universalLink,
          });
        } else {
          navigator.clipboard.writeText(universalLink);
          alert("Link đã được copy vào clipboard!");
        }
        break;
      }
    }
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
              Deep Link Integration Demo
            </h1>
            <p className="text-xl text-slate-400 mb-6">
              Test smart app/web navigation cho tournament registration
            </p>
            
            {/* Device Detection Info */}
            <div className="flex justify-center mb-8">
              <Card className="border-gold/20 bg-background/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {deviceInfo.isMobile ? (
                      <Smartphone className="w-8 h-8 text-gold" />
                    ) : (
                      <Monitor className="w-8 h-8 text-gold" />
                    )}
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {deviceInfo.isMobile ? "Mobile Device" : "Desktop Device"}
                      </div>
                      <div className="text-sm text-slate-400">
                        {deviceInfo.isIOS && "iOS"} 
                        {deviceInfo.isAndroid && "Android"} 
                        {deviceInfo.isDesktop && "Desktop Browser"}
                      </div>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      Detected
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Sample Tournament Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <Card className="border-gold/20 bg-background/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Trophy className="w-6 h-6 text-gold" />
                      {sampleTournament.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {sampleTournament.description}
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="bg-gold text-black">
                    Demo Tournament
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Tournament Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-300">
                      {sampleTournament.current_participants}/{sampleTournament.max_participants}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">
                      {sampleTournament.entry_fee.toLocaleString()} VND
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-gold" />
                    <span className="text-slate-300">
                      {sampleTournament.prize_pool.toLocaleString()} VND
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span className="text-slate-300">Dec 15, 2024</span>
                  </div>
                </div>

                {/* Deep Link Actions */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-gold" />
                    Deep Link Actions
                  </h3>

                  <div className="grid gap-3">
                    {deviceInfo.isMobile ? (
                      <>
                        {/* Mobile Actions */}
                        <Button
                          onClick={() => handleDeepLinkTest("register")}
                          className="w-full h-auto p-4 flex items-center justify-between bg-gradient-to-r from-gold to-yellow-300 hover:from-gold/90 hover:to-yellow-300/90 text-black"
                        >
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5" />
                            <div className="text-left">
                              <div className="font-semibold">Mở App & Đăng Ký</div>
                              <div className="text-xs opacity-80">Deep link vào app mobile</div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4" />
                        </Button>

                        <Button
                          onClick={() => handleDeepLinkTest("view")}
                          variant="outline"
                          className="w-full h-auto p-4 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Monitor className="w-5 h-5" />
                            <div className="text-left">
                              <div className="font-semibold">Xem trong Browser</div>
                              <div className="text-xs opacity-60">Fallback web view</div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Desktop Actions */}
                        <Button
                          onClick={() => handleDeepLinkTest("register")}
                          className="w-full h-auto p-4 flex items-center justify-between bg-gradient-to-r from-gold to-yellow-300 hover:from-gold/90 hover:to-yellow-300/90 text-black"
                        >
                          <div className="flex items-center gap-3">
                            <Monitor className="w-5 h-5" />
                            <div className="text-left">
                              <div className="font-semibold">Đăng Ký Trên Web</div>
                              <div className="text-xs opacity-80">Desktop registration flow</div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4" />
                        </Button>

                        <Alert>
                          <Download className="h-4 w-4" />
                          <AlertDescription>
                            Tải app mobile SABO Arena để có trải nghiệm tốt nhất! 
                            <Button variant="link" className="p-0 h-auto text-gold ml-2">
                              Download App
                            </Button>
                          </AlertDescription>
                        </Alert>
                      </>
                    )}

                    {/* Share Action */}
                    <Button
                      onClick={() => handleDeepLinkTest("share")}
                      variant="outline"
                      className="w-full flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Chia sẻ giải đấu
                    </Button>
                  </div>
                </div>

                {/* Auth Status */}
                <div className="pt-4 border-t border-slate-700">
                  {user ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>Đã đăng nhập: {user.email}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>Chưa đăng nhập - Click "Đăng Ký" để test auth flow</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Technical Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-gold/20 bg-background/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Deep Link Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 text-sm">
                  <div>
                    <strong className="text-gold">iOS Deep Link:</strong>
                    <code className="block bg-slate-800 p-2 rounded mt-1 text-slate-300">
                      saboarena://tournament/{sampleTournament.id}?action=register&userId={user?.id}
                    </code>
                  </div>
                  <div>
                    <strong className="text-gold">Android Deep Link:</strong>
                    <code className="block bg-slate-800 p-2 rounded mt-1 text-slate-300">
                      saboarena://tournament/{sampleTournament.id}?action=register&userId={user?.id}
                    </code>
                  </div>
                  <div>
                    <strong className="text-gold">Web Fallback:</strong>
                    <code className="block bg-slate-800 p-2 rounded mt-1 text-slate-300">
                      {globalThis.location.origin}/tournaments/{sampleTournament.id}?action=register
                    </code>
                  </div>
                  <div>
                    <strong className="text-gold">Universal Link:</strong>
                    <code className="block bg-slate-800 p-2 rounded mt-1 text-slate-300">
                      {getUniversalLink({ tournamentId: sampleTournament.id, action: "view" })}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DeepLinkDemo;