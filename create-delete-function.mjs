import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createDeleteFunction() {
  console.log('🔧 Creating delete function with SECURITY DEFINER...\n');
  
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `
      -- Create function to delete news (bypass RLS)
      CREATE OR REPLACE FUNCTION delete_news_article(article_id UUID)
      RETURNS void AS $$
      BEGIN
          DELETE FROM public.news WHERE id = article_id;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- Grant execute to service_role and authenticated
      GRANT EXECUTE ON FUNCTION delete_news_article(UUID) TO service_role;
      GRANT EXECUTE ON FUNCTION delete_news_article(UUID) TO authenticated;
    `
  });
  
  if (error) {
    console.error('❌ Error:', error);
    console.log('\n⚠️  Need to run SQL directly in Supabase Dashboard!');
    console.log('\nGo to: https://supabase.com/dashboard/project/mogjjvscxjwvhtpkrlqr/sql/new');
    console.log('\nPaste this SQL:\n');
    console.log(`
-- Create function to delete news (bypass RLS)
CREATE OR REPLACE FUNCTION delete_news_article(article_id UUID)
RETURNS void AS $$
BEGIN
    DELETE FROM public.news WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION delete_news_article(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION delete_news_article(UUID) TO authenticated;
    `);
    return;
  }
  
  console.log('✅ Function created successfully!');
  console.log('   Now testing delete...\n');
  
  // Test the function
  const { data: articles } = await supabase
    .from('news')
    .select('id, title')
    .limit(1);
  
  if (articles && articles.length > 0) {
    const testId = articles[0].id;
    console.log(`🧪 Testing delete for: ${articles[0].title}`);
    console.log(`   ID: ${testId}\n`);
    
    const { error: deleteError } = await supabase
      .rpc('delete_news_article', { article_id: testId });
    
    if (deleteError) {
      console.error('❌ Delete test failed:', deleteError);
    } else {
      console.log('✅ Delete test successful!');
    }
  }
}

createDeleteFunction();
