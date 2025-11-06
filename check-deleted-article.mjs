// Kiểm tra xem bài viết đã bị xóa trong database chưa
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(supabaseUrl, serviceKey);

const deletedId = '953e41c9-7999-4626-8b60-c5644d923082';

console.log('🔍 Kiểm tra bài viết ID:', deletedId);
console.log('');

// Tìm bài viết
const { data, error } = await supabase
  .from('news')
  .select('*')
  .eq('id', deletedId);

if (error) {
  console.error('❌ Error:', error);
} else if (!data || data.length === 0) {
  console.log('✅ BÀI VIẾT ĐÃ BỊ XÓA THÀNH CÔNG trong database!');
  console.log('   Bài viết không còn tồn tại.');
} else {
  console.log('⚠️ BÀI VIẾT VẪN CÒN trong database!');
  console.log('   Title:', data[0].title);
  console.log('   Status:', data[0].status);
}

console.log('');
console.log('📊 Tổng số bài viết hiện tại:');
const { data: allNews, error: countError } = await supabase
  .from('news')
  .select('id, title, status')
  .order('created_at', { ascending: false });

if (countError) {
  console.error('❌ Error:', countError);
} else {
  console.log(`   Total: ${allNews.length} bài`);
  console.log('');
  console.log('   5 bài mới nhất:');
  allNews.slice(0, 5).forEach((item, i) => {
    console.log(`   ${i + 1}. ${item.title.substring(0, 50)}... (${item.status})`);
  });
}
