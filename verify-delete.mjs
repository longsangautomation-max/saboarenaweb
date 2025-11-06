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

async function verifyDelete() {
  console.log('🔍 Checking current news articles...\n');
  
  // Fetch all articles
  const { data: beforeDelete, error: fetchError } = await supabase
    .from('news')
    .select('id, title, created_at')
    .order('created_at', { ascending: false });
  
  if (fetchError) {
    console.error('❌ Error fetching:', fetchError);
    return;
  }
  
  console.log(`📰 Total articles: ${beforeDelete.length}\n`);
  
  if (beforeDelete.length === 0) {
    console.log('⚠️ No articles to delete!');
    return;
  }
  
  // Show first article to delete
  const articleToDelete = beforeDelete[0];
  console.log('🎯 Will delete this article:');
  console.log(`   ID: ${articleToDelete.id}`);
  console.log(`   Title: ${articleToDelete.title}`);
  console.log(`   Created: ${articleToDelete.created_at}\n`);
  
  // Ask for confirmation
  console.log('⏳ Deleting in 2 seconds...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Delete
  console.log('🗑️ Deleting...');
  const { error: deleteError } = await supabase
    .from('news')
    .delete()
    .eq('id', articleToDelete.id);
  
  if (deleteError) {
    console.error('❌ Delete failed:', deleteError);
    return;
  }
  
  console.log('✅ Delete command executed\n');
  
  // Verify deletion
  console.log('🔍 Verifying deletion...');
  const { data: afterDelete, error: verifyError } = await supabase
    .from('news')
    .select('id, title')
    .order('created_at', { ascending: false });
  
  if (verifyError) {
    console.error('❌ Verify error:', verifyError);
    return;
  }
  
  console.log(`📰 Remaining articles: ${afterDelete.length}`);
  
  // Check if article still exists
  const stillExists = afterDelete.find(a => a.id === articleToDelete.id);
  
  if (stillExists) {
    console.log('❌ PROBLEM: Article still exists in database!');
    console.log('   This means DELETE is not working properly!');
  } else {
    console.log('✅ SUCCESS: Article was actually deleted from database!');
    console.log('   If UI still shows it, the problem is in React state management.');
  }
}

verifyDelete().catch(console.error);
