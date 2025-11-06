-- Create function to delete news (bypass RLS)
CREATE OR REPLACE FUNCTION delete_news_article(article_id UUID)
RETURNS void AS $$
BEGIN
    DELETE FROM public.news WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to service_role
GRANT EXECUTE ON FUNCTION delete_news_article(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION delete_news_article(UUID) TO authenticated;
