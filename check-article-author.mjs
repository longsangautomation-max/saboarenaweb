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

async function checkAuthors() {
  console.log('🔍 Checking author_id of articles...\n');
  
  const { data, error } = await supabase
    .from('news')
    .select('id, title, author_id')
    .order('created_at', { ascending: false })
    .limit(5);
  
  if (error) {
    console.error('❌ Error:', error);
    return;
  }
  
  console.log(`📰 Found ${data.length} articles:\n`);
  
  data.forEach((article, idx) => {
    console.log(`${idx + 1}. ${article.title.substring(0, 50)}...`);
    console.log(`   ID: ${article.id}`);
    console.log(`   author_id: ${article.author_id || 'NULL'}\n`);
  });
  
  const nullAuthors = data.filter(a => !a.author_id).length;
  console.log(`⚠️  ${nullAuthors} articles have NULL author_id`);
  console.log('   These CANNOT be deleted with RLS policy!');
  console.log('\n💡 Solution: Use service_role key to bypass RLS');
}

checkAuthors();
