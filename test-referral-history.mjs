#!/usr/bin/env node

/**
 * Test referral history and stats
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('\n📊 TEST REFERRAL HISTORY & STATS\n');
console.log('='.repeat(70));

async function testReferralHistory() {
  try {
    // Get a user who has referrals
    const { data: usage } = await supabase
      .from('referral_usage')
      .select('referrer_id')
      .limit(1)
      .single();

    if (!usage) {
      console.log('❌ Không có referral usage nào để test');
      return;
    }

    const userId = usage.referrer_id;

    // Get user info
    const { data: user } = await supabase
      .from('users')
      .select('email, full_name')
      .eq('id', userId)
      .single();

    console.log('\n👤 Testing user:');
    console.log('   Email:', user.email);
    console.log('   Name:', user.full_name || 'N/A');
    console.log('   ID:', userId);

    // Get referral history
    console.log('\n📜 REFERRAL HISTORY:');
    console.log('─'.repeat(70));

    const { data: history } = await supabase
      .from('referral_usage')
      .select(`
        id,
        used_at,
        bonus_awarded,
        status,
        referred_user_id
      `)
      .eq('referrer_id', userId)
      .order('used_at', { ascending: false });

    if (!history || history.length === 0) {
      console.log('   Không có lịch sử giới thiệu');
    } else {
      console.log(`   Tổng số người đã giới thiệu: ${history.length}\n`);

      for (let i = 0; i < history.length; i++) {
        const record = history[i];
        
        // Get referred user info
        const { data: refUser } = await supabase
          .from('users')
          .select('full_name, email, created_at')
          .eq('id', record.referred_user_id)
          .maybeSingle();

        console.log(`   ${i + 1}. Người được giới thiệu:`);
        console.log(`      Name: ${refUser?.full_name || 'Anonymous'}`);
        console.log(`      Email: ${refUser?.email || 'N/A'}`);
        console.log(`      Joined: ${new Date(refUser?.created_at || record.used_at).toLocaleDateString('vi-VN')}`);
        console.log(`      Reward: ${record.bonus_awarded?.referrer_bonus || 0} SPA`);
        console.log(`      Status: ${record.status}`);
        console.log(`      Date: ${new Date(record.used_at).toLocaleString('vi-VN')}`);
        console.log();
      }
    }

    // Get total SPA earned
    console.log('💰 TỔNG SPA KIẾM ĐƯỢC TỪ GIỚI THIỆU:');
    console.log('─'.repeat(70));

    const { data: transactions } = await supabase
      .from('spa_transactions')
      .select('amount, description, created_at')
      .eq('user_id', userId)
      .eq('transaction_type', 'referral_bonus')
      .order('created_at', { ascending: false });

    if (!transactions || transactions.length === 0) {
      console.log('   Không có transaction nào');
    } else {
      let total = 0;
      console.log(`   Tổng số transactions: ${transactions.length}\n`);

      for (const tx of transactions) {
        total += tx.amount;
        console.log(`   + ${tx.amount} SPA - ${tx.description}`);
        console.log(`     ${new Date(tx.created_at).toLocaleString('vi-VN')}`);
      }

      console.log(`\n   📊 Tổng cộng: ${total} SPA`);
    }

    // Get current SPA balance
    const { data: userData } = await supabase
      .from('users')
      .select('spa_points')
      .eq('id', userId)
      .single();

    console.log(`   💎 SPA hiện tại: ${userData?.spa_points || 0}`);

    console.log('\n' + '='.repeat(70));
    console.log('✅ Test hoàn thành!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

await testReferralHistory();
