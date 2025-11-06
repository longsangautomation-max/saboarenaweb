/**
 * Debug script - Kiểm tra AI News có lưu được vào database không
 */

import { supabase } from './src/integrations/supabase/client.js';

async function testInsert() {
  console.log('🔍 Testing news insertion...\n');

  // Test insert một bài mẫu
  const testNews = {
    title: 'Test News - ' + new Date().toISOString(),
    slug: 'test-news-' + Date.now(),
    excerpt: 'This is a test excerpt',
    content: '# Test Content\n\nThis is a test article.',
    category: 'tournament',
    cover_image_url: 'https://via.placeholder.com/800x400',
    is_featured: false,
    status: 'published',
    published_at: new Date().toISOString(),
    views: 0
  };

  console.log('📝 Attempting to insert:', testNews.title);
  
  const { data, error } = await supabase
    .from('news')
    .insert(testNews)
    .select()
    .single();

  if (error) {
    console.error('\n❌ INSERT FAILED:');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('Error Details:', error.details);
    console.error('Error Hint:', error.hint);
    
    if (error.message.includes('row-level security')) {
      console.error('\n⚠️  PROBLEM: Row Level Security is blocking the insert!');
      console.error('SOLUTION: You need to either:');
      console.error('  1. Login as authenticated user before inserting');
      console.error('  2. Modify RLS policy to allow anon inserts (not recommended)');
    }
    
    if (error.message.includes('author_id')) {
      console.error('\n⚠️  PROBLEM: author_id constraint issue!');
      console.error('SOLUTION: Make sure author_id can be NULL or set it to a valid user ID');
    }
  } else {
    console.log('\n✅ INSERT SUCCESSFUL!');
    console.log('News ID:', data.id);
    console.log('Title:', data.title);
    console.log('Slug:', data.slug);
    console.log('\n🌐 View at: http://localhost:8081/news-detail/' + data.slug);
  }
}

testInsert().catch(console.error);
