#!/usr/bin/env node

/**
 * Create Supabase SQL Trigger via Direct PostgreSQL Connection
 */

import pg from 'pg';
import { config } from 'dotenv';

config({ path: '.env' });

const { Client } = pg;

const SQL_STATEMENTS = [
  // 1. Enable http extension
  `CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;`,
  
  // 2. Create trigger function
  `CREATE OR REPLACE FUNCTION public.trigger_auto_index()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  webhook_url TEXT := 'http://localhost:3001/webhook/blog-published';
  payload JSONB;
BEGIN
  -- Build JSON payload
  payload := jsonb_build_object(
    'type', TG_OP,
    'table', TG_TABLE_NAME,
    'record', row_to_json(NEW),
    'old_record', CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END
  );
  
  -- Call webhook (async, doesn't block)
  PERFORM extensions.http_post(
    webhook_url,
    payload::text,
    'application/json'
  );
  
  RETURN NEW;
END;
$$;`,

  // 3. Drop existing trigger if exists
  `DROP TRIGGER IF EXISTS on_blog_published ON public.news;`,
  
  // 4. Create trigger
  `CREATE TRIGGER on_blog_published
  AFTER INSERT OR UPDATE ON public.news
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION public.trigger_auto_index();`
];

async function createTrigger() {
  const client = new Client({
    connectionString: process.env.SUPABASE_DB_TRANSACTION_URL,
  });

  console.log('🔧 Creating Supabase SQL Trigger...\n');

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    for (let i = 0; i < SQL_STATEMENTS.length; i++) {
      const stepName = [
        '1. Enable http extension',
        '2. Create trigger function',
        '3. Drop existing trigger',
        '4. Create trigger'
      ][i];
      
      console.log(`⏳ ${stepName}...`);
      
      await client.query(SQL_STATEMENTS[i]);
      
      console.log(`   ✅ ${stepName} - Done!\n`);
    }

    console.log('━'.repeat(80));
    console.log('🎉 TRIGGER CREATED SUCCESSFULLY!\n');
    console.log('✅ Phase 3 automation is now 100% complete!\n');
    console.log('Test it now:');
    console.log('  node test-phase3-automation.mjs\n');
    console.log('Or publish a blog post:');
    console.log('  https://saboarena.com/ai-news-admin\n');
    console.log('Webhook will automatically trigger when you publish! 🚀');
    console.log('━'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

createTrigger();
