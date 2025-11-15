#!/usr/bin/env node

/**
 * Setup Supabase SQL Trigger for Auto-Indexing
 * Creates trigger that calls local webhook when blog post is published
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const SQL_TRIGGER = `
-- Enable http extension if not already enabled
CREATE EXTENSION IF NOT EXISTS http;

-- Create function to call automation locally
CREATE OR REPLACE FUNCTION trigger_auto_index()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'http://localhost:3001/webhook/blog-published';
  request_id BIGINT;
BEGIN
  -- Call webhook asynchronously using http extension
  SELECT http_post(
    webhook_url,
    json_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW),
      'old_record', row_to_json(OLD)
    )::text,
    'application/json'
  ) INTO request_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_blog_published ON news;

-- Create trigger on news table
CREATE TRIGGER on_blog_published
  AFTER INSERT OR UPDATE ON news
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION trigger_auto_index();
`;

async function setupTrigger() {
  console.log('🔧 Setting up Supabase SQL trigger...\n');
  
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql: SQL_TRIGGER });
    
    if (error) {
      // Try direct SQL execution
      console.log('⏳ Creating http extension...');
      await supabase.rpc('query', { query_string: 'CREATE EXTENSION IF NOT EXISTS http;' });
      
      console.log('⏳ Creating trigger function...');
      const functionSQL = SQL_TRIGGER.split('--')[2]; // Get function part
      
      console.log('⏳ Creating trigger...');
      // Execute via REST API since RPC might not work
      console.log('\n⚠️  SQL execution via code is limited.');
      console.log('Please run the SQL manually in Supabase SQL Editor:\n');
      console.log('1. Go to: https://app.supabase.com/project/mogjjvscxjwvhtpkrlqr/sql');
      console.log('2. Click: "New Query"');
      console.log('3. Paste the SQL below:');
      console.log('\n' + '='.repeat(80));
      console.log(SQL_TRIGGER);
      console.log('='.repeat(80));
      console.log('\n4. Click: "RUN" (or Ctrl+Enter)');
      console.log('\n✅ Expected output: "Success. No rows returned"\n');
      
      return;
    }
    
    console.log('✅ Trigger created successfully!\n');
    console.log('🎉 Automation is now active!');
    console.log('\nNext steps:');
    console.log('1. Start webhook server: npm run webhook');
    console.log('2. Publish a blog post via AI News Admin');
    console.log('3. Watch automation happen automatically!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nPlease run SQL manually (see SUPABASE_WEBHOOK_SETUP.md)\n');
  }
}

setupTrigger();
