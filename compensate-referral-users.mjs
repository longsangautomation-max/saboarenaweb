#!/usr/bin/env node

/**
 * Compensate users who were affected by the referral bug
 * Give SPA rewards to users who used referral codes but didn't receive rewards
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('\n💰 BÙ THƯỞNG SPA CHO USERS BỊ ẢNH HƯỞNG\n');
console.log('='.repeat(70));

async function compensateUsers() {
  try {
    // Get all referral_usage records
    const { data: usages, error: usageError } = await supabase
      .from('referral_usage')
      .select('*')
      .order('used_at', { ascending: true });

    if (usageError) {
      console.log('❌ Error fetching referral_usage:', usageError.message);
      return;
    }

    if (!usages || usages.length === 0) {
      console.log('✅ Không có referral usage nào cần xử lý');
      return;
    }

    console.log(`\n📋 Tìm thấy ${usages.length} referral usage record(s)\n`);

    let compensatedCount = 0;
    let alreadyPaidCount = 0;

    for (const usage of usages) {
      console.log(`\n${'─'.repeat(70)}`);
      console.log(`📝 Processing: ${usage.id}`);
      console.log(`   Used at: ${usage.used_at}`);
      
      const referrerBonus = usage.bonus_awarded?.referrer_bonus || 50;
      const refereeBonus = usage.bonus_awarded?.referee_bonus || 25;

      // Check referrer
      const { data: referrer } = await supabase
        .from('users')
        .select('email, full_name, spa_points')
        .eq('id', usage.referrer_id)
        .maybeSingle();

      // Check referee
      const { data: referee } = await supabase
        .from('users')
        .select('email, full_name, spa_points')
        .eq('id', usage.referred_user_id)
        .maybeSingle();

      if (!referrer || !referee) {
        console.log('   ⚠️  User not found, skipping');
        continue;
      }

      console.log(`\n   👤 Referrer: ${referrer.email} (${referrer.full_name || 'N/A'})`);
      console.log(`      Current SPA: ${referrer.spa_points || 0}`);
      console.log(`      Expected bonus: ${referrerBonus}`);

      console.log(`\n   👤 Referee: ${referee.email} (${referee.full_name || 'N/A'})`);
      console.log(`      Current SPA: ${referee.spa_points || 0}`);
      console.log(`      Expected bonus: ${refereeBonus}`);

      // Check if already compensated (check spa_transactions)
      const { data: existingTx } = await supabase
        .from('spa_transactions')
        .select('id')
        .or(`user_id.eq.${usage.referrer_id},user_id.eq.${usage.referred_user_id}`)
        .eq('transaction_type', 'referral_bonus')
        .limit(1);

      if (existingTx && existingTx.length > 0) {
        console.log('\n   ✅ Already compensated, skipping');
        alreadyPaidCount++;
        continue;
      }

      // Compensate!
      console.log('\n   💰 Compensating...');

      const referrerCurrentSpa = referrer.spa_points || 0;
      const refereeCurrentSpa = referee.spa_points || 0;

      // Update referrer SPA
      await supabase
        .from('users')
        .update({
          spa_points: referrerCurrentSpa + referrerBonus
        })
        .eq('id', usage.referrer_id);

      console.log(`   ✅ Referrer: ${referrerCurrentSpa} → ${referrerCurrentSpa + referrerBonus} SPA`);

      // Update referee SPA
      await supabase
        .from('users')
        .update({
          spa_points: refereeCurrentSpa + refereeBonus
        })
        .eq('id', usage.referred_user_id);

      console.log(`   ✅ Referee: ${refereeCurrentSpa} → ${refereeCurrentSpa + refereeBonus} SPA`);

      // Create transactions
      const now = new Date().toISOString();
      await supabase.from('spa_transactions').insert([
        {
          user_id: usage.referrer_id,
          amount: referrerBonus,
          transaction_type: 'referral_bonus',
          description: 'Bù thưởng giới thiệu thành viên (bug fix)',
          balance_before: referrerCurrentSpa,
          balance_after: referrerCurrentSpa + referrerBonus,
          created_at: now,
        },
        {
          user_id: usage.referred_user_id,
          amount: refereeBonus,
          transaction_type: 'welcome_bonus',
          description: 'Bù thưởng chào mừng thành viên (bug fix)',
          balance_before: refereeCurrentSpa,
          balance_after: refereeCurrentSpa + refereeBonus,
          created_at: now,
        },
      ]);

      console.log('   ✅ Created spa_transactions');

      compensatedCount++;
    }

    console.log('\n' + '='.repeat(70));
    console.log('\n✅ HOÀN THÀNH!');
    console.log(`   📊 Đã bù thưởng: ${compensatedCount} case(s)`);
    console.log(`   ✅ Already paid: ${alreadyPaidCount} case(s)`);
    console.log(`   📝 Total processed: ${usages.length} case(s)\n`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

await compensateUsers();
