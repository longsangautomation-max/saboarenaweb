#!/usr/bin/env node

/**
 * Check if users receive SPA rewards when referring new users
 * Usage: node check-referral-rewards.mjs
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('\n🔍 KIỂM TRA HỆ THỐNG REFERRAL & REWARDS\n');
console.log('═'.repeat(70));

async function checkReferralSystem() {
  try {
    // 1. Check referral_codes table
    console.log('\n📋 1. BẢNG REFERRAL_CODES:');
    console.log('─'.repeat(70));
    
    const { data: referralCodes, error: refError } = await supabase
      .from('referral_codes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (refError) {
      console.error('❌ Error:', refError.message);
    } else if (!referralCodes || referralCodes.length === 0) {
      console.log('⚠️  Chưa có referral code nào được tạo');
    } else {
      console.log(`✅ Tìm thấy ${referralCodes.length} referral codes (hiển thị 5 mới nhất):`);
      referralCodes.forEach(code => {
        console.log(`\n   Code: ${code.code}`);
        console.log(`   User ID: ${code.user_id}`);
        console.log(`   Uses: ${code.uses_count}/${code.max_uses || '∞'}`);
        console.log(`   Created: ${new Date(code.created_at).toLocaleString('vi-VN')}`);
      });
    }

    // 2. Check spa_transactions for referral rewards
    console.log('\n\n💰 2. GIAO DỊCH SPA TỪ REFERRAL:');
    console.log('─'.repeat(70));
    
    const { data: spaTransactions, error: spaError } = await supabase
      .from('spa_transactions')
      .select('*')
      .eq('transaction_type', 'referral_bonus')
      .order('created_at', { ascending: false })
      .limit(10);

    if (spaError) {
      console.error('❌ Error:', spaError.message);
    } else if (!spaTransactions || spaTransactions.length === 0) {
      console.log('⚠️  CHƯA CÓ giao dịch SPA nào từ referral!');
      console.log('\n🔍 Có thể:');
      console.log('   1. Chưa ai sử dụng referral code');
      console.log('   2. Hệ thống referral chưa hoạt động');
      console.log('   3. Hook/trigger chưa được thiết lập');
    } else {
      console.log(`✅ Tìm thấy ${spaTransactions.length} giao dịch SPA từ referral:`);
      
      let totalReferralSPA = 0;
      for (const tx of spaTransactions) {
        totalReferralSPA += tx.amount;
        
        // Get user info
        const { data: user } = await supabase
          .from('users')
          .select('username, full_name, phone')
          .eq('id', tx.user_id)
          .single();

        console.log(`\n   User: ${user?.username || user?.full_name || tx.user_id}`);
        console.log(`   Amount: +${tx.amount} SPA`);
        console.log(`   Description: ${tx.description || 'N/A'}`);
        console.log(`   Created: ${new Date(tx.created_at).toLocaleString('vi-VN')}`);
      }
      
      console.log(`\n   📊 TỔNG SPA đã thưởng: ${totalReferralSPA} SPA`);
    }

    // 3. Check users table for SPA balances
    console.log('\n\n👥 3. USER VỚI SPA > 0:');
    console.log('─'.repeat(70));
    
    const { data: usersWithSPA, error: userError } = await supabase
      .from('users')
      .select('id, username, full_name, phone, spa_balance, created_at')
      .gt('spa_balance', 0)
      .order('spa_balance', { ascending: false })
      .limit(10);

    if (userError) {
      console.error('❌ Error:', userError.message);
    } else if (!usersWithSPA || usersWithSPA.length === 0) {
      console.log('⚠️  Chưa có user nào có SPA balance > 0');
    } else {
      console.log(`✅ Tìm thấy ${usersWithSPA.length} users có SPA:`);
      usersWithSPA.forEach(user => {
        console.log(`\n   User: ${user.username || user.full_name || 'N/A'}`);
        console.log(`   SPA: ${user.spa_balance}`);
        console.log(`   Phone: ${user.phone || 'N/A'}`);
        console.log(`   Joined: ${new Date(user.created_at).toLocaleString('vi-VN')}`);
      });
    }

    // 4. Check referral_transactions table (if exists)
    console.log('\n\n🔗 4. BẢNG REFERRAL_TRANSACTIONS:');
    console.log('─'.repeat(70));
    
    const { data: refTransactions, error: refTxError } = await supabase
      .from('referral_transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (refTxError) {
      if (refTxError.message.includes('does not exist')) {
        console.log('⚠️  Bảng referral_transactions chưa tồn tại');
      } else {
        console.error('❌ Error:', refTxError.message);
      }
    } else if (!refTransactions || refTransactions.length === 0) {
      console.log('⚠️  Chưa có referral transaction nào');
    } else {
      console.log(`✅ Tìm thấy ${refTransactions.length} referral transactions:`);
      refTransactions.forEach(tx => {
        console.log(`\n   Referrer ID: ${tx.referrer_id}`);
        console.log(`   Referred ID: ${tx.referred_user_id}`);
        console.log(`   Status: ${tx.status}`);
        console.log(`   Created: ${new Date(tx.created_at).toLocaleString('vi-VN')}`);
      });
    }

    // 5. Summary & Recommendations
    console.log('\n\n📊 TÓM TẮT & KHUYẾN NGHỊ:');
    console.log('═'.repeat(70));
    
    const hasReferralCodes = referralCodes && referralCodes.length > 0;
    const hasReferralRewards = spaTransactions && spaTransactions.length > 0;
    const hasUsersWithSPA = usersWithSPA && usersWithSPA.length > 0;
    
    if (hasReferralRewards) {
      console.log('\n✅ HỆ THỐNG REFERRAL HOẠT ĐỘNG TỐT!');
      console.log('   - User đã nhận được SPA rewards');
      console.log('   - Giao dịch được ghi nhận trong spa_transactions');
    } else if (hasReferralCodes && !hasReferralRewards) {
      console.log('\n⚠️  CÓ REFERRAL CODES NHƯNG CHƯA CÓ REWARDS!');
      console.log('\n🔍 Cần kiểm tra:');
      console.log('   1. ReferralService.useReferralCode() có được gọi không?');
      console.log('   2. Database triggers/functions có hoạt động không?');
      console.log('   3. Có lỗi nào trong quá trình đăng ký không?');
      console.log('\n💡 Kiến nghị:');
      console.log('   - Test flow: Tạo user mới với referral code');
      console.log('   - Check logs trong AuthService khi đăng ký');
      console.log('   - Verify ReferralService.useReferralCode() được gọi');
    } else {
      console.log('\n❌ HỆ THỐNG REFERRAL CHƯA HOẠT ĐỘNG!');
      console.log('\n🔍 Cần thực hiện:');
      console.log('   1. Tạo referral code cho user');
      console.log('   2. Test đăng ký với referral code');
      console.log('   3. Kiểm tra logs và transactions');
    }

    if (hasUsersWithSPA) {
      console.log('\n💰 CÓ USERS VỚI SPA BALANCE');
      console.log('   - Kiểm tra xem SPA có phải từ referral không?');
      console.log('   - Hoặc từ nguồn khác (welcome bonus, manual)?');
    }

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
  }
}

console.log('\n🚀 Bắt đầu kiểm tra...\n');
await checkReferralSystem();
console.log('\n' + '═'.repeat(70));
console.log('✅ Hoàn thành kiểm tra!\n');
