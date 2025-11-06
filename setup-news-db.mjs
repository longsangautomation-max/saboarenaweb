import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(supabaseUrl, serviceKey);

console.log('==================================================');
console.log('  SABO ARENA - Auto Setup News Database');
console.log('==================================================\n');

// Check if news table already exists
console.log('[1/3] Checking existing data...');
const { data: existingNews, error: checkError } = await supabase
  .from('news')
  .select('id')
  .limit(1);

if (!checkError) {
  console.log('      ✓ News table already exists');
  console.log('      ℹ Found existing news articles\n');
  
  const { count } = await supabase
    .from('news')
    .select('*', { count: 'exact', head: true });
  
  console.log(`      Total articles: ${count}`);
  console.log('\n==================================================');
  console.log('  ✓ Database is ready!');
  console.log('==================================================\n');
  process.exit(0);
}

console.log('      ℹ News table not found, creating...\n');
console.log('[2/3] Please run SQL manually:');
console.log('      1. Open: https://supabase.com/dashboard/project/mogjjvscxjwvhtpkrlqr/sql');
console.log('      2. Click "New Query"');
console.log('      3. Copy from: supabase_news_schema.sql');
console.log('      4. Paste and click "Run"\n');

console.log('[3/3] After running SQL, you can test:');
console.log('      • Open http://localhost:8082');
console.log('      • Scroll to "Tin Tức Mới Nhất"');
console.log('      • Click any article\n');

console.log('==================================================\n');
