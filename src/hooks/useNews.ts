import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { News } from "@/types/database";

export const useNews = (limit?: number, category?: string) => {
  return useQuery({
    queryKey: ["news", limit, category],
    queryFn: async () => {
      let query = supabase
        .from("news")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as News[];
    },
  });
};

export const useNewsDetail = (slug: string) => {
  return useQuery({
    queryKey: ["news", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;

      // Increment views
      if (data) {
        await supabase.rpc("increment_news_views", { news_id: data.id });
      }

      return data as News;
    },
    enabled: !!slug,
  });
};

export const useFeaturedNews = () => {
  return useQuery({
    queryKey: ["news", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("status", "published")
        .eq("is_featured", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as News[];
    },
  });
};
