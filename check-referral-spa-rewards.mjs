#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('\n🔍 KIỂM TRA REFERRAL USAGE VÀ SPA REWARDS\n');
console.log('='.repeat(70));

// Get referral usage record
const { data: usage } = await supabase
  .from('referral_usage')
  .select('*')
  .limit(1)
  .single();

if (!usage) {
  console.log('❌ Không có referral usage nào trong database');
  process.exit(0);
}

console.log('\n📋 Referral Usage Record:');
console.log('   ID:', usage.id);
console.log('   Referrer:', usage.referrer_id);
console.log('   Referee:', usage.referred_user_id);
console.log('   Bonus:', JSON.stringify(usage.bonus_awarded));
console.log('   Status:', usage.status);
console.log('   Used at:', usage.used_at);

// Check referrer's SPA
const { data: referrer } = await supabase
  .from('users')
  .select('email, full_name, spa_points')
  .eq('id', usage.referrer_id)
  .maybeSingle();

// Check referee's SPA
const { data: referee } = await supabase
  .from('users')
  .select('email, full_name, spa_points')
  .eq('id', usage.referred_user_id)
  .maybeSingle();

console.log('\n👤 REFERRER (Người giới thiệu):');
console.log('   Email:', referrer?.email || 'N/A');
console.log('   Name:', referrer?.full_name || 'N/A');
console.log('   SPA Points:', referrer?.spa_points || 0);
console.log('   Expected:', usage.bonus_awarded.referrer_bonus);
console.log('   Status:', (referrer?.spa_points || 0) >= usage.bonus_awarded.referrer_bonus ? '✅ OK' : '❌ CHƯA NHẬN');

console.log('\n👤 REFEREE (Người được giới thiệu):');
console.log('   Email:', referee?.email || 'N/A');
console.log('   Name:', referee?.full_name || 'N/A');
console.log('   SPA Points:', referee?.spa_points || 0);
console.log('   Expected:', usage.bonus_awarded.referee_bonus);
console.log('   Status:', (referee?.spa_points || 0) >= usage.bonus_awarded.referee_bonus ? '✅ OK' : '❌ CHƯA NHẬN');

// Check spa_transactions
const { data: txs } = await supabase
  .from('spa_transactions')
  .select('*')
  .or(`user_id.eq.${usage.referrer_id},user_id.eq.${usage.referred_user_id}`)
  .eq('transaction_type', 'referral_bonus');

console.log('\n💰 SPA Transactions:');
if (txs && txs.length > 0) {
  console.log(`   ✅ Tìm thấy ${txs.length} transaction(s)`);
  txs.forEach(tx => {
    console.log(`   - User: ${tx.user_id}`);
    console.log(`     Amount: ${tx.amount}`);
    console.log(`     Type: ${tx.transaction_type}`);
  });
} else {
  console.log('   ❌ KHÔNG có transactions nào!');
}

console.log('\n' + '='.repeat(70));
console.log('\n🔍 KẾT LUẬN:');
if ((referrer?.spa_points || 0) === 0 && (referee?.spa_points || 0) === 0) {
  console.log('❌ HỆ THỐNG REFERRAL KHÔNG HOẠT ĐỘNG!');
  console.log('   - referral_usage được ghi nhận ✅');
  console.log('   - SPA points KHÔNG được cộng ❌');
  console.log('   - spa_transactions KHÔNG được ghi ❌');
  console.log('\n💡 CẦN SỬA CODE FLUTTER: Thêm logic cộng SPA vào useReferralCode()');
} else {
  console.log('✅ Hệ thống hoạt động bình thường');
}

console.log();
