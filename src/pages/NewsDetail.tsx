import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNewsDetail } from "@/hooks/useNews";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Eye, ArrowLeft, Share2, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { data: article, isLoading } = useNewsDetail(slug || "");

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

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: language === "vi" ? article.title : (article.title_en || article.title),
        text: language === "vi" ? article.excerpt : (article.excerpt_en || article.excerpt),
        url: window.location.href,
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-6" />
            <Skeleton className="h-96 w-full mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
          <Card className="max-w-md p-12 text-center">
            <h1 className="text-2xl font-bold mb-4">
              {language === "vi" ? "Không tìm thấy bài viết" : "Article not found"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {language === "vi" 
                ? "Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa" 
                : "The article you are looking for does not exist or has been deleted"}
            </p>
            <Link to="/">
              <Button className="bg-gold text-black hover:bg-gold/90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "vi" ? "Về trang chủ" : "Back to home"}
              </Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  const title = language === "vi" ? article.title : (article.title_en || article.title);
  const content = language === "vi" ? article.content : (article.content_en || article.content);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-background to-slate-900 pt-20">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link to="/#news">
              <Button variant="ghost" className="hover:text-gold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "vi" ? "Quay lại" : "Back"}
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Badge className={`${getCategoryColor(article.category)} border mb-4`}>
              {getCategoryName(article.category)}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.published_at).toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{article.views.toLocaleString()} {language === "vi" ? "lượt xem" : "views"}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="hover:text-gold"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {language === "vi" ? "Chia sẻ" : "Share"}
              </Button>
            </div>
          </motion.div>

          {/* Featured Image */}
          {article.cover_image_url && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <img
                src={article.cover_image_url}
                alt={title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none mb-12"
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold text-gold mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold text-white mb-3 mt-8">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold text-white mb-2 mt-6">{children}</h3>,
                p: ({ children }) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-slate-300 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-slate-300 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="ml-4">{children}</li>,
                a: ({ children, href }) => <a href={href} className="text-gold hover:text-gold/80 underline">{children}</a>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-gold pl-4 italic text-slate-400 my-4">{children}</blockquote>,
              }}
            >
              {content}
            </ReactMarkdown>
          </motion.div>

          {/* Author Info (if available) */}
          {article.author_id && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-gold/20 bg-slate-800/50 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">
                      {language === "vi" ? "Tác giả" : "Author"}
                    </p>
                    <p className="font-semibold text-white">SABO Arena Team</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </article>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;
