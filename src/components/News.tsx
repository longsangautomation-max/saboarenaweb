import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Eye, ArrowRight, Newspaper } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNews } from "@/hooks/useNews";
import { Link } from "react-router-dom";

const News = () => {
  const { t, language } = useLanguage();
  const { data: newsArticles, isLoading } = useNews(6); // Lấy 6 bài mới nhất

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "tournament": "bg-gold/20 text-gold border-gold/30",
      "players": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "guide": "bg-green-500/20 text-green-400 border-green-500/30",
      "club": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "interview": "bg-pink-500/20 text-pink-400 border-pink-500/30",
      "regulation": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    };
    return colors[category.toLowerCase()] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, { vi: string; en: string }> = {
      "tournament": { vi: "Giải đấu", en: "Tournament" },
      "players": { vi: "Cơ Thủ", en: "Players" },
      "guide": { vi: "Hướng Dẫn", en: "Guide" },
      "club": { vi: "Câu Lạc Bộ", en: "Club" },
      "interview": { vi: "Phỏng Vấn", en: "Interview" },
      "regulation": { vi: "Quy Định", en: "Regulation" },
    };
    return language === "vi" 
      ? names[category.toLowerCase()]?.vi || category 
      : names[category.toLowerCase()]?.en || category;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-900" id="news">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-6">
            <Newspaper className="w-4 h-4" />
            {t("nav.news")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {language === "vi" ? "Tin Tức Mới Nhất" : "Latest News"}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {language === "vi" 
              ? "Cập nhật tin tức, sự kiện và thông tin mới nhất từ thế giới bi-a" 
              : "Stay updated with the latest news, events and information from the billiards world"}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border-slate-700 bg-slate-800/50">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : newsArticles && newsArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/news/${article.slug}`}>
                  <Card className="group overflow-hidden border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-gold/30 transition-all duration-300 h-full flex flex-col cursor-pointer">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.cover_image_url || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop"}
                        alt={language === "vi" ? article.title : (article.title_en || article.title)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(article.category)} border`}>
                          {getCategoryName(article.category)}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-gold transition-colors line-clamp-2">
                        {language === "vi" ? article.title : (article.title_en || article.title)}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col justify-between">
                      <p className="text-slate-400 mb-4 line-clamp-3">
                        {language === "vi" ? article.excerpt : (article.excerpt_en || article.excerpt)}
                      </p>

                      <div className="space-y-3">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(article.published_at).toLocaleDateString(language === "vi" ? "vi-VN" : "en-US")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Read More Button */}
                        <Button
                          variant="ghost"
                          className="w-full group/btn hover:bg-gold/10 hover:text-gold"
                        >
                          {language === "vi" ? "Đọc Thêm" : "Read More"}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">
              {language === "vi" ? "Chưa có tin tức nào" : "No news available"}
            </p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gold text-black hover:bg-gold/90 font-bold px-8"
          >
            {language === "vi" ? "XEM TẤT CẢ TIN TỨC" : "VIEW ALL NEWS"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default News;
