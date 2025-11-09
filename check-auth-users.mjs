#!/usr/bin/env node

/**
 * Check if phone exists in Supabase Auth (auth.users table)
 * Usage: node check-auth-users.mjs +84XXXXXXXXX
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

const phoneNumber = process.argv[2];

if (!phoneNumber) {
  console.error('Usage: node check-auth-users.mjs +84XXXXXXXXX');
  process.exit(1);
}

console.log(`\n🔍 Checking phone number: ${phoneNumber}`);
console.log('━'.repeat(50));

async function checkAuthUsers() {
  try {
    // Check in public.users table
    const { data: publicUsers, error: publicError } = await supabase
      .from('users')
      .select('id, phone, username, created_at')
      .eq('phone', phoneNumber);

    if (publicError) {
      console.error('❌ Error checking public.users:', publicError.message);
    } else {
      console.log('\n📊 public.users table:');
      if (publicUsers && publicUsers.length > 0) {
        console.log('✅ FOUND:', publicUsers);
      } else {
        console.log('❌ NOT FOUND');
      }
    }

    // Check in auth.users using admin API
    console.log('\n📊 auth.users table:');
    const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error('❌ Error listing auth users:', authError.message);
    } else {
      const matchingUser = authUsers.find(user => user.phone === phoneNumber);
      
      if (matchingUser) {
        console.log('✅ FOUND in auth.users:');
        console.log({
          id: matchingUser.id,
          phone: matchingUser.phone,
          email: matchingUser.email,
          confirmed_at: matchingUser.confirmed_at,
          created_at: matchingUser.created_at,
          last_sign_in_at: matchingUser.last_sign_in_at
        });
      } else {
        console.log('❌ NOT FOUND in auth.users');
      }
    }

    console.log('\n━'.repeat(50));

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

await checkAuthUsers();
