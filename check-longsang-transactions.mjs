#!/usr/bin/env node

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: user } = await supabase
  .from('users')
  .select('id, email, spa_points')
  .eq('email', 'longsang063@gmail.com')
  .single();

console.log('\n📊 User:', user.email);
console.log('Current SPA:', user.spa_points);

const { data: txs } = await supabase
  .from('spa_transactions')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });

console.log('\n💰 Transactions:');
if (txs && txs.length > 0) {
  for (const tx of txs) {
    console.log(`- ${tx.transaction_type}: ${tx.amount} SPA`);
    console.log(`  ${tx.description}`);
    console.log(`  ${tx.created_at}`);
    console.log();
  }
} else {
  console.log('No transactions found');
}
