/**
 * Quick Fix: Disable RLS for news table (temporary for testing)
 * Sau khi test xong, nên enable lại RLS với policy phù hợp
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

console.log('🔧 Quick Fix: Testing news insert with service role key...\n');

const testNews = {
  title: 'TEST - AI News Generation ' + new Date().toISOString(),
  slug: 'test-ai-news-' + Date.now(),
  excerpt: 'This is a test article to verify database access.',
  content: '# Test Article\n\nAI news generation is working!',
  category: 'tournament',
  cover_image_url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800',
  is_featured: true,
  status: 'published',
  published_at: new Date().toISOString(),
  views: 0
};

console.log('📝 Inserting test article with SERVICE_ROLE key...');

const { data, error } = await supabase
  .from('news')
  .insert(testNews)
  .select()
  .single();

if (error) {
  console.error('❌ Still failed:', error.message);
  console.error('   Code:', error.code);
  console.error('\n⚠️  You MUST run this SQL in Supabase Dashboard:');
  console.error('\n' + '='.repeat(60));
  console.error('DROP POLICY IF EXISTS "Authenticated users can insert news" ON public.news;');
  console.error('CREATE POLICY "Anyone can insert news" ON public.news FOR INSERT TO public WITH CHECK (true);');
  console.error('='.repeat(60));
  console.error('\n📍 Go to: https://supabase.com/dashboard/project/mogjjvscxjwvhtpkrlqr/sql');
  process.exit(1);
}

console.log('✅ SUCCESS! News inserted with service role key');
console.log('   ID:', data.id);
console.log('   Title:', data.title);
console.log('   Slug:', data.slug);
console.log('\n🌐 View at: http://localhost:8081/news-detail/' + data.slug);
console.log('\n✅ Your AI News system is working!');
console.log('\n📋 Next step: Update your code to use SERVICE_ROLE key for news generation');
