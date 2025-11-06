/**
 * Test script để kiểm tra việc insert vào bảng news
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwODU4NDQsImV4cCI6MjA0NTY2MTg0NH0.iwYdqQfJ1IVfNvdZxqZjk9FBKjCIlk3t0kFqYJ05Sh4';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Testing news insertion...\n');

// Test 1: Kiểm tra bảng news có tồn tại không
console.log('1️⃣ Checking if news table exists...');
const { data: tables, error: tableError } = await supabase
  .from('news')
  .select('id')
  .limit(1);

if (tableError) {
  console.error('❌ News table error:', tableError);
  process.exit(1);
} else {
  console.log('✅ News table exists\n');
}

// Test 2: Thử insert một bài mẫu (không cần auth)
console.log('2️⃣ Trying to insert without authentication...');
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

const { data: insertData, error: insertError } = await supabase
  .from('news')
  .insert(testNews)
  .select()
  .single();

if (insertError) {
  console.error('❌ Insert failed:', insertError);
  console.error('Code:', insertError.code);
  console.error('Message:', insertError.message);
  console.error('Details:', insertError.details);
  console.error('Hint:', insertError.hint);
} else {
  console.log('✅ Insert successful!');
  console.log('News ID:', insertData.id);
  console.log('Title:', insertData.title);
}

console.log('\n3️⃣ Checking RLS policies...');
console.log('Note: If insert failed with "new row violates row-level security policy"');
console.log('You need to either:');
console.log('  a) Login before inserting (recommended for production)');
console.log('  b) Adjust RLS policy to allow anon inserts (for testing only)');
