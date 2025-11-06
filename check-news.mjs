import { supabase } from './src/integrations/supabase/client.js';

console.log('🔍 Checking news in database...\n');

const { data: news, error } = await supabase
  .from('news')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(5);

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log(`✅ Found ${news.length} news articles:\n`);
  
  news.forEach((article, index) => {
    console.log(`${index + 1}. ${article.title}`);
    console.log(`   Created: ${new Date(article.created_at).toLocaleString('vi-VN')}`);
    console.log(`   Status: ${article.status}`);
    console.log(`   Published: ${article.published_at ? 'Yes' : 'No'}`);
    console.log(`   Slug: /news/${article.slug}`);
    console.log('');
  });
}
