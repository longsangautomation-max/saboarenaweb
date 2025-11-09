import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mogjjvscxjwvhtpkrlqr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo'
);

const phoneNumber = process.argv[2];

if (!phoneNumber) {
  console.error('❌ Vui lòng cung cấp số điện thoại');
  console.log('📖 Cách dùng: node delete-test-user.mjs +840123456789');
  process.exit(1);
}

console.log(`🔍 Tìm kiếm user với số điện thoại: ${phoneNumber}`);

// Find user by phone
const { data: users, error: findError } = await supabase
  .from('users')
  .select('id, phone, full_name, username, created_at')
  .eq('phone', phoneNumber);

if (findError) {
  console.error('❌ Lỗi khi tìm kiếm:', findError);
  process.exit(1);
}

if (!users || users.length === 0) {
  console.log('✅ Không tìm thấy user với số điện thoại này');
  process.exit(0);
}

console.log(`\n📋 Tìm thấy ${users.length} user(s):\n`);
for (const user of users) {
  console.log(`👤 User ID: ${user.id}`);
  console.log(`   Phone: ${user.phone}`);
  console.log(`   Name: ${user.full_name || 'N/A'}`);
  console.log(`   Username: ${user.username || 'N/A'}`);
  console.log(`   Created: ${user.created_at}`);
  console.log('');
}

// Ask for confirmation
console.log('⚠️  CẢNH BÁO: Bạn có chắc muốn XÓA user(s) này?');
console.log('⚠️  Hành động này KHÔNG THỂ hoàn tác!');
console.log('');
console.log('Để xóa, chạy lại với flag --confirm:');
console.log(`node delete-test-user.mjs ${phoneNumber} --confirm`);

if (process.argv[3] !== '--confirm') {
  process.exit(0);
}

console.log('\n🗑️  Đang xóa user(s)...\n');

for (const user of users) {
  try {
    // Delete from users table
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', user.id);

    if (deleteError) {
      console.error(`❌ Lỗi khi xóa user ${user.id}:`, deleteError);
    } else {
      console.log(`✅ Đã xóa user ${user.id} (${user.phone})`);
    }

    // Try to delete from auth.users (requires service role)
    try {
      const { error: authDeleteError } = await supabase.auth.admin.deleteUser(user.id);
      if (authDeleteError) {
        console.log(`⚠️  Không thể xóa auth user ${user.id}:`, authDeleteError.message);
      } else {
        console.log(`✅ Đã xóa auth user ${user.id}`);
      }
    } catch (authError) {
      console.log(`⚠️  Không thể xóa auth user ${user.id}:`, authError.message);
    }
  } catch (error) {
    console.error(`❌ Lỗi khi xử lý user ${user.id}:`, error);
  }
}

console.log('\n✅ Hoàn tất! Bây giờ bạn có thể đăng ký lại với số điện thoại này.');
