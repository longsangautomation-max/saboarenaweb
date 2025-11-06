import { useState, useEffect } from 'react';
import { supabaseAdmin } from '@/lib/supabase-admin';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image: string;
  status: 'published' | 'draft' | 'archived';
  published_at: string;
  created_at: string;
  author_id?: string;
  view_count?: number;
  ai_generated?: boolean;
  ai_model?: string;
  ai_persona?: string;
}

export function useNewsManagement() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all news articles
  const fetchNews = async (status?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('📥 Fetching news from database...');
      
      let query = supabaseAdmin
        .from('news')
        .select('*')
        .order('created_at', { ascending: false});
      
      if (status && status !== 'all') {
        query = query.eq('status', status);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      console.log(`✅ Fetched ${data?.length || 0} articles from database`);
      console.log('   Updating React state...');
      
      // Force new array reference to trigger re-render
      setNews([...(data || [])]);
      
      console.log('✅ React state updated');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update news article
  const updateNews = async (id: string, updates: Partial<NewsArticle>) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('✏️ Updating news with ID:', id);
      console.log('Updates:', updates);
      
      const { error: updateError } = await supabaseAdmin
        .from('news')
        .update(updates)
        .eq('id', id);
      
      if (updateError) {
        console.error('❌ Update error:', updateError);
        throw updateError;
      }
      
      console.log('✅ Update successful, refreshing list...');
      
      // Refresh list
      await fetchNews();
      
      console.log('✅ List refreshed');
      
      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error updating news:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Delete news article
  const deleteNews = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🗑️ Deleting news with ID:', id);
      console.log('   Using service_role key to bypass RLS');
      
      // Force bypass RLS by using rpc or direct SQL
      const { data: deleteData, error: deleteError } = await supabaseAdmin
        .rpc('delete_news_article', { article_id: id });
      
      if (deleteError) {
        console.warn('⚠️  RPC failed, trying direct delete:', deleteError);
        
        // Fallback to direct delete
        const { error: directDeleteError } = await supabaseAdmin
          .from('news')
          .delete()
          .eq('id', id);
        
        if (directDeleteError) {
          console.error('❌ Direct delete also failed:', directDeleteError);
          throw directDeleteError;
        }
      }
      
      console.log('✅ Delete successful, refreshing list...');
      
      // Refresh list
      await fetchNews();
      
      console.log('✅ List refreshed');
      
      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error deleting news:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get single news article
  const getNewsById = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabaseAdmin
        .from('news')
        .select('*')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      return { success: true, data };
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching news:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    news,
    loading,
    error,
    fetchNews,
    updateNews,
    deleteNews,
    getNewsById
  };
}
