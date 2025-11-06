import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const NewsTest = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from("news")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(10);

      if (fetchError) throw fetchError;
      
      console.log("📰 Fetched news:", data);
      setNews(data || []);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">News Test Page</h1>
            <Button onClick={loadNews} className="bg-gold text-black">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          {loading && (
            <p className="text-white">Loading...</p>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded p-4 text-red-400 mb-4">
              Error: {error}
            </div>
          )}

          {!loading && news.length === 0 && (
            <div className="bg-yellow-500/20 border border-yellow-500 rounded p-4 text-yellow-400 mb-4">
              No published news found!
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {news.map((article) => (
              <Card key={article.id} className="border-gold/20 bg-background/95">
                <CardHeader>
                  <CardTitle className="text-white">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-400">
                      <span className="text-gold">Category:</span> {article.category}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-gold">Status:</span> {article.status}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-gold">Published:</span>{" "}
                      {article.published_at ? new Date(article.published_at).toLocaleString("vi-VN") : "Not published"}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-gold">Views:</span> {article.views || 0}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-gold">Featured:</span> {article.is_featured ? "Yes" : "No"}
                    </p>
                    <p className="text-slate-400">
                      <span className="text-gold">Slug:</span> /news/{article.slug}
                    </p>
                    <p className="text-slate-400 line-clamp-2">
                      <span className="text-gold">Excerpt:</span> {article.excerpt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsTest;
