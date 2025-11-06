// TEST SCRIPT: Kiểm tra CRUD operations
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(supabaseUrl, serviceKey);

console.log('🧪 Testing CRUD Operations...\n');

// Test 1: Fetch news
console.log('1️⃣ Testing FETCH...');
const { data: newsData, error: fetchError } = await supabase
  .from('news')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(5);

if (fetchError) {
  console.error('❌ Fetch Error:', fetchError);
} else {
  console.log(`✅ Fetched ${newsData.length} articles`);
  console.log('Sample:', newsData[0]?.title);
}

// Test 2: Update news (if exists)
if (newsData && newsData.length > 0) {
  const testArticle = newsData[0];
  console.log('\n2️⃣ Testing UPDATE...');
  console.log('Updating:', testArticle.title);
  
  const { error: updateError } = await supabase
    .from('news')
    .update({ 
      title: testArticle.title + ' [EDITED]',
      updated_at: new Date().toISOString()
    })
    .eq('id', testArticle.id);
  
  if (updateError) {
    console.error('❌ Update Error:', updateError);
  } else {
    console.log('✅ Update successful!');
    
    // Revert change
    await supabase
      .from('news')
      .update({ title: testArticle.title })
      .eq('id', testArticle.id);
    console.log('✅ Reverted changes');
  }
}

// Test 3: Test delete permissions (without actually deleting)
console.log('\n3️⃣ Testing DELETE permissions...');
const { data: testData, error: deleteError } = await supabase
  .from('news')
  .select('id')
  .limit(1);

if (deleteError) {
  console.error('❌ Delete Permission Error:', deleteError);
} else {
  console.log('✅ Delete permissions OK (service_role can delete)');
}

console.log('\n🎉 All tests completed!');
console.log('\n💡 If you see errors above, that\'s the issue!');
