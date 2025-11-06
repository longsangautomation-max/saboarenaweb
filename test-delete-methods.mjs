// Test xóa thật với nhiều cách
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(supabaseUrl, serviceKey);

const testId = '953e41c9-7999-4626-8b60-c5644d923082';

console.log('🧪 Testing delete với nhiều cách...\n');

// Cách 1: Delete thông thường
console.log('1️⃣ Cách 1: Delete bình thường');
const { data: d1, error: e1 } = await supabase
  .from('news')
  .delete()
  .eq('id', testId);

console.log('   Data returned:', d1);
console.log('   Error:', e1);

// Kiểm tra
const { data: check1 } = await supabase
  .from('news')
  .select('id')
  .eq('id', testId);
console.log('   Still exists?', check1?.length > 0 ? 'YES ⚠️' : 'NO ✅');
console.log('');

// Cách 2: Delete với match
console.log('2️⃣ Cách 2: Delete với match');
const { data: d2, error: e2 } = await supabase
  .from('news')
  .delete()
  .match({ id: testId });

console.log('   Data returned:', d2);
console.log('   Error:', e2);

const { data: check2 } = await supabase
  .from('news')
  .select('id')
  .eq('id', testId);
console.log('   Still exists?', check2?.length > 0 ? 'YES ⚠️' : 'NO ✅');
console.log('');

// Cách 3: Kiểm tra RLS policies
console.log('3️⃣ Kiểm tra RLS Policies trên table news');
const { data: policies, error: policyError } = await supabase
  .rpc('get_policies', { table_name: 'news' })
  .catch(() => ({ data: null, error: 'RPC not available' }));

if (policies) {
  console.log('   Policies:', policies);
} else {
  console.log('   Cannot check policies (normal)');
}
console.log('');

// Cách 4: Thử với trigger OFF (nếu có soft delete trigger)
console.log('4️⃣ Thử update status = "deleted" thay vì xóa');
const { data: d4, error: e4 } = await supabase
  .from('news')
  .update({ status: 'archived' })
  .eq('id', testId);

console.log('   Error:', e4);
const { data: check4 } = await supabase
  .from('news')
  .select('id, status')
  .eq('id', testId);
console.log('   Status now:', check4?.[0]?.status);
console.log('');

console.log('💡 NHẬN XÉT:');
console.log('   - Nếu delete không có error nhưng vẫn còn → RLS policy issue');
console.log('   - Nếu update được → Dùng soft delete (archive) thay vì hard delete');
