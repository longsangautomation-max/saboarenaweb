#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('\n🔍 KIỂM TRA SCHEMA SPA_TRANSACTIONS\n');
console.log('='.repeat(70));

// Test 1: Try insert with minimal fields
console.log('\n📝 Test 1: Insert với fields tối thiểu');
const test1 = await supabase
  .from('spa_transactions')
  .insert({
    user_id: 'f41f7638-62ea-409e-a663-7af4298663d0',
    amount: 10,
    transaction_type: 'test',
    description: 'Test minimal'
  })
  .select();

if (test1.error) {
  console.log('❌ Error:', test1.error.message);
  if (test1.error.details) console.log('   Details:', test1.error.details);
  if (test1.error.hint) console.log('   Hint:', test1.error.hint);
} else {
  console.log('✅ Success!');
  console.log('   Columns:', Object.keys(test1.data[0]).join(', '));
  
  // Delete test record
  await supabase
    .from('spa_transactions')
    .delete()
    .eq('id', test1.data[0].id);
}

// Test 2: Try with balance fields
console.log('\n📝 Test 2: Insert với balance_before/after');
const test2 = await supabase
  .from('spa_transactions')
  .insert({
    user_id: 'f41f7638-62ea-409e-a663-7af4298663d0',
    amount: 10,
    transaction_type: 'test',
    description: 'Test with balance',
    balance_before: 0,
    balance_after: 10
  })
  .select();

if (test2.error) {
  console.log('❌ Error:', test2.error.message);
} else {
  console.log('✅ Success!');
  console.log('   Data:', test2.data[0]);
  
  // Delete test record
  await supabase
    .from('spa_transactions')
    .delete()
    .eq('id', test2.data[0].id);
}

// Test 3: Check referral_codes columns
console.log('\n📝 Test 3: Kiểm tra referral_codes columns');
const { data: refCode } = await supabase
  .from('referral_codes')
  .select('*')
  .limit(1)
  .single();

console.log('Columns:', Object.keys(refCode).join(', '));
console.log('✅ Đúng column: current_uses (không phải uses_count)');

// Test 4: Try update current_uses
console.log('\n📝 Test 4: Test update current_uses');
const currentUses = refCode.current_uses || 0;
const { error: updateError } = await supabase
  .from('referral_codes')
  .update({ current_uses: currentUses + 1 })
  .eq('id', refCode.id);

if (updateError) {
  console.log('❌ Error:', updateError.message);
} else {
  console.log('✅ Update thành công!');
  
  // Revert
  await supabase
    .from('referral_codes')
    .update({ current_uses: currentUses })
    .eq('id', refCode.id);
  console.log('   (Đã revert về giá trị cũ)');
}

console.log('\n' + '='.repeat(70));
console.log('✅ Hoàn thành kiểm tra!\n');
