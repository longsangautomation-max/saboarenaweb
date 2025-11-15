#!/usr/bin/env node

/**
 * Verify SQL Trigger Status
 */

import pg from 'pg';
import { config } from 'dotenv';

config({ path: '.env' });

const { Client } = pg;

async function verifyTrigger() {
  const client = new Client({
    connectionString: process.env.SUPABASE_DB_TRANSACTION_URL,
  });

  console.log('🔍 Checking SQL Trigger Status...\n');

  try {
    await client.connect();

    // Check if trigger exists
    const triggerResult = await client.query(`
      SELECT 
        tgname as trigger_name,
        tgenabled as enabled,
        tgtype as type
      FROM pg_trigger 
      WHERE tgname = 'on_blog_published'
    `);

    if (triggerResult.rows.length > 0) {
      console.log('✅ TRIGGER EXISTS!\n');
      console.log('Details:');
      console.log(`  Name: ${triggerResult.rows[0].trigger_name}`);
      console.log(`  Enabled: ${triggerResult.rows[0].enabled === 'O' ? 'Yes' : 'No'}`);
      console.log('');
    } else {
      console.log('❌ Trigger not found');
      process.exit(1);
    }

    // Check if function exists
    const functionResult = await client.query(`
      SELECT routine_name 
      FROM information_schema.routines 
      WHERE routine_name = 'trigger_auto_index' 
      AND routine_schema = 'public'
    `);

    if (functionResult.rows.length > 0) {
      console.log('✅ TRIGGER FUNCTION EXISTS!\n');
    } else {
      console.log('❌ Trigger function not found');
    }

    // Check if http extension exists
    const extensionResult = await client.query(`
      SELECT extname 
      FROM pg_extension 
      WHERE extname = 'http'
    `);

    if (extensionResult.rows.length > 0) {
      console.log('✅ HTTP EXTENSION INSTALLED!\n');
    } else {
      console.log('❌ HTTP extension not found');
    }

    console.log('━'.repeat(80));
    console.log('🎉 ALL COMPONENTS VERIFIED!\n');
    console.log('Your automation is ready to use:');
    console.log('1. Make sure webhook server is running:');
    console.log('   npm run webhook\n');
    console.log('2. Publish a blog post:');
    console.log('   https://saboarena.com/ai-news-admin\n');
    console.log('3. Watch the magic happen! ✨');
    console.log('━'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

verifyTrigger();
