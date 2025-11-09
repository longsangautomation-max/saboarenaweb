#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔄 Resetting referral code...\n');

const { error } = await supabase
  .from('referral_codes')
  .update({ current_uses: 0 })
  .eq('code', 'KBDI08RQ');

if (error) {
  console.log('❌ Error:', error.message);
} else {
  console.log('✅ Reset current_uses về 0');
  
  const { data } = await supabase
    .from('referral_codes')
    .select('code, current_uses, max_uses')
    .eq('code', 'KBDI08RQ')
    .single();
    
  console.log('\n📋 Referral Code Status:');
  console.log('   Code:', data.code);
  console.log('   Uses:', data.current_uses + '/' + data.max_uses);
  console.log('\n✅ Sẵn sàng test lại!');
}
