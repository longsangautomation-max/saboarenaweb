#!/usr/bin/env node

/**
 * Update Trigger to Use Vercel Production URL
 */

import pg from 'pg';
import { config } from 'dotenv';

config({ path: '.env' });

const { Client } = pg;

// Use Vercel production URL instead of localhost
const WEBHOOK_URL = 'https://sabo-arena-playbook-2h2ft4rx5-sabos-projects-a56a8c3b.vercel.app/api/webhook-blog-published';

const SQL_UPDATE = `
-- Update trigger function to use Vercel production URL
CREATE OR REPLACE FUNCTION public.trigger_auto_index()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  webhook_url TEXT := '${WEBHOOK_URL}';
  payload JSONB;
  request_id BIGINT;
BEGIN
  -- Build JSON payload
  payload := jsonb_build_object(
    'type', TG_OP,
    'table', TG_TABLE_NAME,
    'record', row_to_json(NEW),
    'old_record', CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END
  );
  
  -- Call webhook (async, doesn't block)
  SELECT extensions.http_post(
    webhook_url,
    payload::text,
    'application/json'
  ) INTO request_id;
  
  RETURN NEW;
END;
$$;
`;

async function updateTrigger() {
  const client = new Client({
    connectionString: process.env.SUPABASE_DB_TRANSACTION_URL,
  });

  console.log('🔧 Updating Trigger to Use Vercel Production URL...\n');
  console.log(`📍 Webhook URL: ${WEBHOOK_URL}\n`);

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    console.log('⏳ Updating trigger function...');
    await client.query(SQL_UPDATE);
    console.log('   ✅ Trigger function updated!\n');

    console.log('━'.repeat(80));
    console.log('🎉 TRIGGER UPDATED SUCCESSFULLY!\n');
    console.log('✅ Now using Vercel serverless function (always available)\n');
    console.log('📝 Next steps:');
    console.log('1. Remove Vercel authentication protection (if any)');
    console.log('2. Test by publishing a blog post:');
    console.log('   https://saboarena.com/ai-news-admin\n');
    console.log('3. Automation will run automatically! 🚀');
    console.log('━'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

updateTrigger();
