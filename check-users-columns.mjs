#!/usr/bin/env node

/**
 * Check users table structure and SPA-related columns
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

console.log('\n🔍 KIỂM TRA CẤU TRÚC BẢNG USERS\n');

async function checkUsersTable() {
  // Get a sample user to see available columns
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  if (data && data.length > 0) {
    console.log('📋 CÁC CỘT TRONG BẢNG USERS:');
    console.log('─'.repeat(50));
    const columns = Object.keys(data[0]);
    columns.forEach((col, index) => {
      const hasValue = data[0][col] !== null && data[0][col] !== undefined;
      console.log(`${index + 1}. ${col}${hasValue ? ' ✓' : ' (null)'}`);
    });

    console.log('\n🔍 TÌM KIẾM CỘT SPA:');
    const spaColumns = columns.filter(col => 
      col.toLowerCase().includes('spa') || 
      col.toLowerCase().includes('point') ||
      col.toLowerCase().includes('balance')
    );
    
    if (spaColumns.length > 0) {
      console.log('✅ Tìm thấy:', spaColumns.join(', '));
    } else {
      console.log('❌ KHÔNG TÌM THẤY cột SPA/points/balance');
      console.log('\n💡 Cần tạo cột mới:');
      console.log('   ALTER TABLE users ADD COLUMN spa_balance INTEGER DEFAULT 0;');
    }
  }
}

await checkUsersTable();
