import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navigation from "@/components/Navigation";
import {
  runDailyNewsGeneration,
  testNewsGeneration,
  decideNewsToGenerate
} from "@/lib/ai-news-analyzer";
import { useNewsManagement, NewsArticle } from "@/hooks/useNewsManagement";
import { useNewsStats } from "@/hooks/useNewsStats";
import { useAISettings } from "@/hooks/useAISettings";
import {
  Newspaper,
  Sparkles,
  Calendar,
  Clock,
  TrendingUp,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Play,
  TestTube,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Settings as SettingsIcon,
  FileText,
  BarChart3,
  Save
} from "lucide-react";

const AINewsAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  
  // New hooks for CRUD, Stats, Settings
  const { news, loading: newsLoading, fetchNews, updateNews, deleteNews } = useNewsManagement();
  const { stats, loading: statsLoading, fetchStats } = useNewsStats();
  const { settings, saveSettings, getCostPerArticle } = useAISettings();
  
  // Edit dialog state
  const [editDialog, setEditDialog] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'published' as 'published' | 'draft' | 'archived'
  });
  
  // Delete confirmation
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Settings form
  const [settingsForm, setSettingsForm] = useState(settings);

  // Load news on mount
  useEffect(() => {
    fetchNews();
  }, []);
  
  // Update settings form when settings change
  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  const handleRunDaily = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      await runDailyNewsGeneration();
      setResult({
        type: 'success',
        message: 'Đã tạo tin tức tự động thành công! Kiểm tra trang chủ để xem.'
      });
    } catch (error: any) {
      setResult({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra khi tạo tin tức'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    setTestLoading(true);
    setResult(null);
    
    try {
      await testNewsGeneration();
      setResult({
        type: 'success',
        message: 'Tạo bài test thành công! Kiểm tra trang tin tức.'
      });
    } catch (error: any) {
      setResult({
        type: 'error',
        message: error.message || 'Có lỗi xảy ra'
      });
    } finally {
      setTestLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzeLoading(true);
    setOpportunities([]);
    
    try {
      const newsQueue = await decideNewsToGenerate();
      setOpportunities(newsQueue);
    } catch (error: any) {
      setResult({
        type: 'error',
        message: 'Không thể phân tích database'
      });
    } finally {
      setAnalyzeLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-10 h-10 text-gold" />
                <h1 className="text-4xl font-bold text-white">
                  AI News Generator
                </h1>
              </div>
              <p className="text-slate-400 text-lg">
                Hệ thống tạo tin tức tự động bằng AI từ dữ liệu thực tế
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-gold/20 bg-background/95">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Hôm nay</p>
                      <p className="text-2xl font-bold text-gold">Auto</p>
                    </div>
                    <Calendar className="w-8 h-8 text-gold/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/20 bg-background/95">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Thời gian</p>
                      <p className="text-2xl font-bold text-green-400">6:00 AM</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-400/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20 bg-background/95">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">AI Model</p>
                      <p className="text-2xl font-bold text-blue-400">GPT-4</p>
                    </div>
                    <Zap className="w-8 h-8 text-blue-400/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/20 bg-background/95">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Nguồn</p>
                      <p className="text-2xl font-bold text-purple-400">Database</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-400/50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="generate" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                <TabsTrigger value="generate">Tạo Tin Tức</TabsTrigger>
                <TabsTrigger value="analyze">Phân Tích</TabsTrigger>
                <TabsTrigger value="schedule">Lịch Chạy</TabsTrigger>
              </TabsList>

              {/* Generate Tab */}
              <TabsContent value="generate" className="space-y-6">
                <Card className="border-gold/20 bg-background/95">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Newspaper className="w-5 h-5 text-gold" />
                      Tạo Tin Tức Tự Động
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <h3 className="font-semibold text-white mb-2">Quy trình tự động:</h3>
                        <ol className="space-y-2 text-sm text-slate-300">
                          <li>✅ 1. Phân tích database (tournaments, matches, users)</li>
                          <li>✅ 2. Xác định sự kiện quan trọng nhất</li>
                          <li>✅ 3. Tạo nội dung bằng OpenAI GPT-4</li>
                          <li>✅ 4. Tạo bản tiếng Việt + tiếng Anh</li>
                          <li>✅ 5. Tự động publish lên website</li>
                        </ol>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={handleRunDaily}
                          disabled={loading}
                          className="flex-1 bg-gold text-black hover:bg-gold/90"
                          size="lg"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Đang tạo tin tức...
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-5 w-5" />
                              Chạy Ngay (Daily Generation)
                            </>
                          )}
                        </Button>

                        <Button
                          onClick={handleTest}
                          disabled={testLoading}
                          variant="outline"
                          className="border-blue-500/50 hover:bg-blue-500/10"
                          size="lg"
                        >
                          {testLoading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Testing...
                            </>
                          ) : (
                            <>
                              <TestTube className="mr-2 h-5 w-5" />
                              Test (1 bài mẫu)
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {result && (
                      <Alert className={result.type === 'success' ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}>
                        {result.type === 'success' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                        <AlertDescription className="text-white">
                          {result.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analyze Tab */}
              <TabsContent value="analyze" className="space-y-6">
                <Card className="border-gold/20 bg-background/95">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <TrendingUp className="w-5 h-5 text-gold" />
                      Phân Tích Cơ Hội Tin Tức
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Button
                      onClick={handleAnalyze}
                      disabled={analyzeLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {analyzeLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Đang phân tích...
                        </>
                      ) : (
                        'Phân Tích Database'
                      )}
                    </Button>

                    {opportunities.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-white">
                          Tìm thấy {opportunities.length} cơ hội tin tức:
                        </h3>
                        
                        {opportunities.map((opp, index) => (
                          <div
                            key={index}
                            className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <Badge variant="outline" className="mb-2">
                                  {opp.template}
                                </Badge>
                                <p className="text-sm text-slate-300">
                                  Priority: <span className="text-gold font-semibold">{opp.priority}</span>
                                </p>
                              </div>
                            </div>
                            <div className="text-xs text-slate-400 space-y-1 mt-2">
                              {Object.entries(opp.data).map(([key, value]) => (
                                <div key={key}>
                                  <span className="text-slate-500">{key}:</span> {String(value)}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <Card className="border-gold/20 bg-background/95">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Calendar className="w-5 h-5 text-gold" />
                      Lịch Chạy Tự Động
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Chạy hàng ngày</span>
                        <Badge className="bg-green-600">Đang bật</Badge>
                      </div>
                      <div className="text-sm text-slate-400">
                        ⏰ Thời gian: 6:00 AM (UTC+7)
                      </div>
                      <div className="text-sm text-slate-400">
                        📊 Tối đa: 3 bài/ngày
                      </div>
                      <div className="text-sm text-slate-400">
                        🔄 Cleanup: Giữ 100 bài mới nhất
                      </div>
                    </div>

                    <Alert className="border-blue-500/50 bg-blue-500/10">
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                      <AlertDescription className="text-white">
                        <strong>Lưu ý:</strong> Cần setup Supabase Edge Function hoặc cron job 
                        để chạy tự động. Hiện tại chỉ có thể trigger thủ công qua Admin Panel.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AINewsAdmin;
