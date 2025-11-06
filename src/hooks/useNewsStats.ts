import { useState, useEffect } from 'react';
import { supabaseAdmin } from '@/lib/supabase-admin';

export interface NewsStats {
  totalNews: number;
  todayNews: number;
  weekNews: number;
  monthNews: number;
  publishedNews: number;
  draftNews: number;
  estimatedCost: number;
  avgTokensPerArticle: number;
}

export function useNewsStats() {
  const [stats, setStats] = useState<NewsStats>({
    totalNews: 0,
    todayNews: 0,
    weekNews: 0,
    monthNews: 0,
    publishedNews: 0,
    draftNews: 0,
    estimatedCost: 0,
    avgTokensPerArticle: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    
    try {
      // Get all AI-generated news
      const { data: allNews, error } = await supabaseAdmin
        .from('news')
        .select('*')
        .eq('ai_generated', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const todayNews = allNews?.filter(n => 
        new Date(n.created_at) >= today
      ).length || 0;

      const weekNews = allNews?.filter(n => 
        new Date(n.created_at) >= weekAgo
      ).length || 0;

      const monthNews = allNews?.filter(n => 
        new Date(n.created_at) >= monthAgo
      ).length || 0;

      const publishedNews = allNews?.filter(n => n.status === 'published').length || 0;
      const draftNews = allNews?.filter(n => n.status === 'draft').length || 0;

      // Estimate cost based on GPT-4o-mini pricing
      // Average article: ~1500 chars content + 100 chars title = ~400 tokens input + 1800 tokens output
      // GPT-4o-mini: $0.150 per 1M input tokens, $0.600 per 1M output tokens
      const avgInputTokens = 400;
      const avgOutputTokens = 1800;
      const inputCostPer1M = 0.15; // USD
      const outputCostPer1M = 0.60; // USD
      
      const totalArticles = allNews?.length || 0;
      const totalInputTokens = totalArticles * avgInputTokens;
      const totalOutputTokens = totalArticles * avgOutputTokens;
      
      const inputCost = (totalInputTokens / 1000000) * inputCostPer1M;
      const outputCost = (totalOutputTokens / 1000000) * outputCostPer1M;
      const estimatedCost = inputCost + outputCost;

      setStats({
        totalNews: totalArticles,
        todayNews,
        weekNews,
        monthNews,
        publishedNews,
        draftNews,
        estimatedCost: Number(estimatedCost.toFixed(4)),
        avgTokensPerArticle: avgInputTokens + avgOutputTokens
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, fetchStats };
}
