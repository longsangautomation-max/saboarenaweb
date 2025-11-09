#!/usr/bin/env node

/**
 * Test complete referral flow with QR code
 * Simulates: User A shares QR → User B scans → B registers → Both get SPA
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('\n🧪 TEST REFERRAL FLOW VỚI QR CODE\n');
console.log('═'.repeat(70));

async function testReferralFlow() {
  try {
    // Step 1: Get an existing referral code
    console.log('\n📋 STEP 1: Tìm referral code (User A - người giới thiệu)');
    console.log('─'.repeat(70));
    
    const { data: referralCodes, error: refError } = await supabase
      .from('referral_codes')
      .select('*')
      .eq('is_active', true)
      .limit(1);

    if (refError || !referralCodes || referralCodes.length === 0) {
      console.log('❌ Không tìm thấy referral code nào!');
      console.log('💡 Cần tạo user và referral code trước');
      return;
    }

    const referralCode = referralCodes[0];
    
    // Get user info separately
    const { data: referrerUser, error: userError } = await supabase
      .from('users')
      .select('id, full_name, email, phone, spa_points')
      .eq('id', referralCode.user_id)
      .maybeSingle();

    if (userError || !referrerUser) {
      console.log('❌ Không tìm thấy user cho referral code này!');
      return;
    }
    
    console.log('✅ Tìm thấy User A:');
    console.log(`   Name: ${referrerUser.full_name || 'N/A'}`);
    console.log(`   Email: ${referrerUser.email || 'N/A'}`);
    console.log(`   Phone: ${referrerUser.phone || 'N/A'}`);
    console.log(`   Current SPA: ${referrerUser.spa_points || 0}`);
    console.log(`   Referral Code: ${referralCode.code}`);
    console.log(`   Max Uses: ${referralCode.max_uses || '∞'}`);

    // Step 2: Simulate QR scan - Get referral code
    console.log('\n\n📱 STEP 2: Mô phỏng User B quét QR code');
    console.log('─'.repeat(70));
    console.log(`✅ User B nhận được code: ${referralCode.code}`);
    console.log('   (Deep link: saboarena://referral?code=' + referralCode.code + ')');

    // Step 3: Check if code is valid
    console.log('\n\n🔍 STEP 3: Kiểm tra referral code có hợp lệ không');
    console.log('─'.repeat(70));
    
    const { data: codeCheck, error: checkError } = await supabase
      .from('referral_codes')
      .select('*')
      .eq('code', referralCode.code)
      .eq('is_active', true)
      .single();

    if (checkError || !codeCheck) {
      console.log('❌ Code không hợp lệ hoặc đã hết hạn');
      return;
    }

    const currentUses = codeCheck.uses_count || 0;
    const maxUses = codeCheck.max_uses || 999;
    
    if (currentUses >= maxUses) {
      console.log(`❌ Code đã hết lượt sử dụng (${currentUses}/${maxUses})`);
      return;
    }

    console.log('✅ Code hợp lệ:');
    console.log(`   Uses: ${currentUses}/${maxUses}`);
    console.log(`   Status: ${codeCheck.is_active ? 'Active' : 'Inactive'}`);
    console.log(`   Owner: ${codeCheck.user_id}`);

    // Step 4: Simulate User B registration
    console.log('\n\n👤 STEP 4: Mô phỏng User B đăng ký tài khoản mới');
    console.log('─'.repeat(70));
    
    const testEmail = `test_referred_${Date.now()}@test.com`;
    const testPassword = 'Test123456!';
    
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
    console.log('   Referral Code: ' + referralCode.code);

    // Create auth user (User B)
    console.log('\n   🔐 Creating auth user...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: {
        full_name: 'Test User B',
        referral_code: referralCode.code
      }
    });

    if (authError) {
      console.log('❌ Auth error:', authError.message);
      return;
    }

    console.log('   ✅ Auth user created:', authData.user.id);

    // Wait a bit for triggers to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if profile already exists (created by trigger)
    console.log('\n   🔍 Checking if profile exists...');
    const { data: existingProfile } = await supabase
      .from('users')
      .select('id')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (existingProfile) {
      console.log('   ✅ Profile already created by trigger');
      
      // Update with referral info
      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: 'Test User B',
          referred_by: referrerUser.id,
          spa_points: 0
        })
        .eq('id', authData.user.id);

      if (updateError) {
        console.log('   ⚠️  Could not update profile:', updateError.message);
      } else {
        console.log('   ✅ Profile updated with referral info');
      }
    } else {
      // Create profile manually if trigger didn't fire
      console.log('   📝 Creating user profile manually...');
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: testEmail,
          full_name: 'Test User B',
          role: 'player',
          referred_by: referrerUser.id,
          spa_points: 0
        });

      if (profileError) {
        console.log('❌ Profile error:', profileError.message);
        // Cleanup
        await supabase.auth.admin.deleteUser(authData.user.id);
        return;
      }

      console.log('   ✅ User profile created');
    }

    // Step 5: Process referral reward
    console.log('\n\n💰 STEP 5: Xử lý thưởng giới thiệu');
    console.log('─'.repeat(70));

    // Update referral code current_uses
    const { error: updateCodeError } = await supabase
      .from('referral_codes')
      .update({ 
        current_uses: currentUses + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', codeCheck.id);

    if (updateCodeError) {
      console.log('⚠️  Không cập nhật được current_uses:', updateCodeError.message);
    } else {
      console.log(`   ✅ Cập nhật current_uses: ${currentUses} → ${currentUses + 1}`);
    }

    // Award SPA to referrer (User A)
    const REFERRER_BONUS = 100; // SPA
    console.log(`\n   💎 Thưởng cho User A (người giới thiệu): ${REFERRER_BONUS} SPA`);
    
    const { error: updateReferrerError } = await supabase
      .from('users')
      .update({ 
        spa_points: (referrerUser.spa_points || 0) + REFERRER_BONUS
      })
      .eq('id', referrerUser.id);

    if (updateReferrerError) {
      console.log('   ❌ Không cộng SPA cho User A:', updateReferrerError.message);
    } else {
      console.log('   ✅ User A nhận thưởng thành công!');
    }

    // Award SPA to new user (User B)
    const NEW_USER_BONUS = 50; // SPA
    console.log(`\n   🎁 Thưởng cho User B (người mới): ${NEW_USER_BONUS} SPA`);
    
    const { error: updateNewUserError } = await supabase
      .from('users')
      .update({ 
        spa_points: NEW_USER_BONUS,
        referral_bonus_claimed: true
      })
      .eq('id', authData.user.id);

    if (updateNewUserError) {
      console.log('   ❌ Không cộng SPA cho User B:', updateNewUserError.message);
    } else {
      console.log('   ✅ User B nhận thưởng thành công!');
    }

    // Create spa_transactions records
    console.log('\n   📊 Ghi nhận giao dịch SPA...');
    
    const transactions = [
      {
        user_id: referrerUser.id,
        amount: REFERRER_BONUS,
        transaction_type: 'referral_bonus',
        description: `Thưởng giới thiệu thành viên mới: ${testEmail}`,
        balance_before: referrerUser.spa_points || 0,
        balance_after: (referrerUser.spa_points || 0) + REFERRER_BONUS,
        created_at: new Date().toISOString()
      },
      {
        user_id: authData.user.id,
        amount: NEW_USER_BONUS,
        transaction_type: 'welcome_bonus',
        description: 'Thưởng chào mừng thành viên mới',
        balance_before: 0,
        balance_after: NEW_USER_BONUS,
        created_at: new Date().toISOString()
      }
    ];

    const { error: txError } = await supabase
      .from('spa_transactions')
      .insert(transactions);

    if (txError) {
      console.log('   ⚠️  Không ghi được transactions:', txError.message);
    } else {
      console.log('   ✅ Ghi nhận transactions thành công');
    }

    // Step 6: Verify results
    console.log('\n\n✅ STEP 6: Xác nhận kết quả');
    console.log('═'.repeat(70));

    // Check User A's SPA
    const { data: referrerAfter } = await supabase
      .from('users')
      .select('spa_points')
      .eq('id', referrerUser.id)
      .single();

    console.log('\n👤 User A (người giới thiệu):');
    console.log(`   SPA trước: ${referrerUser.spa_points || 0}`);
    console.log(`   SPA sau:  ${referrerAfter?.spa_points || 0}`);
    console.log(`   Chênh lệch: +${(referrerAfter?.spa_points || 0) - (referrerUser.spa_points || 0)}`);

    // Check User B's SPA
    const { data: newUserAfter } = await supabase
      .from('users')
      .select('spa_points, referred_by')
      .eq('id', authData.user.id)
      .single();

    console.log('\n👤 User B (người mới):');
    console.log(`   SPA: ${newUserAfter?.spa_points || 0}`);
    console.log(`   Referred by: ${newUserAfter?.referred_by || 'N/A'}`);

    // Check transactions
    const { data: txList } = await supabase
      .from('spa_transactions')
      .select('*')
      .or(`user_id.eq.${referrerUser.id},user_id.eq.${authData.user.id}`)
      .eq('transaction_type', 'referral_bonus')
      .order('created_at', { ascending: false })
      .limit(5);

    console.log('\n💰 Giao dịch SPA:');
    if (txList && txList.length > 0) {
      console.log(`   ✅ Tìm thấy ${txList.length} transaction(s)`);
      txList.forEach(tx => {
        console.log(`   - User: ${tx.user_id}`);
        console.log(`     Amount: +${tx.amount} SPA`);
        console.log(`     Type: ${tx.transaction_type}`);
      });
    } else {
      console.log('   ⚠️  Không tìm thấy transactions');
    }

    // Cleanup prompt
    console.log('\n\n🧹 CLEANUP:');
    console.log('─'.repeat(70));
    console.log('❓ Bạn có muốn xóa test user không?');
    console.log(`   Test User ID: ${authData.user.id}`);
    console.log(`   Test Email: ${testEmail}`);
    console.log('\n💡 Để xóa, chạy:');
    console.log(`   node -e "import('@supabase/supabase-js').then(async ({createClient})=>{const s=createClient('${SUPABASE_URL}','${SERVICE_ROLE_KEY}');await s.auth.admin.deleteUser('${authData.user.id}');await s.from('users').delete().eq('id','${authData.user.id}');console.log('Deleted')})"`);

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
  }
}

console.log('\n🚀 Bắt đầu test...\n');
await testReferralFlow();
console.log('\n' + '═'.repeat(70));
console.log('✅ Test hoàn thành!\n');
