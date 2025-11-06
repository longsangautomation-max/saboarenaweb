import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import LiveMatchViewer from "@/components/LiveMatch/LiveMatchViewer";
import { ArrowLeft, AlertCircle } from "lucide-react";

const LiveMatch = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 flex items-center justify-center">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Không tìm thấy ID trận đấu. Vui lòng kiểm tra lại URL.
            </AlertDescription>
          </Alert>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-4 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </motion.div>
        </div>

        {/* Live Match Viewer */}
        <LiveMatchViewer matchId={id} />
      </div>
    </>
  );
};

export default LiveMatch;