import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl ? '✓' : '✗');
console.log('Key:', supabaseKey ? '✓' : '✗');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

try {
  const { data, error } = await supabase
    .from('news')
    .select('slug, title, status')
    .limit(3);

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success! Found articles:', data?.length);
    data?.forEach(a => console.log(`  - ${a.slug}`));
  }
} catch (err) {
  console.error('Exception:', err.message);
}
