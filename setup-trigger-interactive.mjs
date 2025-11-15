#!/usr/bin/env node

/**
 * Setup Supabase SQL Trigger - Interactive Helper
 * Copies SQL to clipboard and opens Supabase SQL Editor
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const SQL_TRIGGER = `-- =====================================================
-- Phase 3: Supabase Trigger for Auto-Indexing
-- =====================================================
-- This trigger automatically calls webhook when blog posts are published
-- Webhook → Automation script → Sitemap regeneration → Google indexing

-- Step 1: Enable http extension for making HTTP requests
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- Step 2: Create trigger function
CREATE OR REPLACE FUNCTION public.trigger_auto_index()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  webhook_url TEXT := 'http://localhost:3001/webhook/blog-published';
  request_id BIGINT;
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
$$;

-- Step 3: Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_blog_published ON public.news;

-- Step 4: Create trigger on news table
CREATE TRIGGER on_blog_published
  AFTER INSERT OR UPDATE ON public.news
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION public.trigger_auto_index();

-- =====================================================
-- Expected Output: "Success. No rows returned"
-- =====================================================`;

async function setup() {
  console.log('🔧 Supabase SQL Trigger Setup\n');
  
  // Copy SQL to clipboard
  try {
    console.log('📋 Copying SQL to clipboard...');
    await execAsync(`Set-Clipboard -Value "${SQL_TRIGGER.replace(/"/g, '`"')}"`, { shell: 'powershell.exe' });
    console.log('   ✅ SQL copied to clipboard!\n');
  } catch (error) {
    console.log('   ⚠️  Could not copy to clipboard');
    console.log('   You can manually copy the SQL below.\n');
  }
  
  // Open Supabase SQL Editor
  console.log('🌐 Opening Supabase SQL Editor...');
  const supabaseUrl = 'https://app.supabase.com/project/mogjjvscxjwvhtpkrlqr/sql';
  
  try {
    await execAsync(`start ${supabaseUrl}`, { shell: 'cmd.exe' });
    console.log('   ✅ Browser opened!\n');
  } catch (error) {
    console.log(`   ⚠️  Could not open browser automatically`);
    console.log(`   Please open manually: ${supabaseUrl}\n`);
  }
  
  // Show instructions
  console.log('📝 Instructions:\n');
  console.log('1. In the Supabase SQL Editor:');
  console.log('   - Click "New Query"');
  console.log('   - Paste the SQL (already in your clipboard!)');
  console.log('   - Click "RUN" or press Ctrl+Enter\n');
  
  console.log('2. Expected Output:');
  console.log('   ✅ "Success. No rows returned"\n');
  
  console.log('3. Test the automation:');
  console.log('   node test-phase3-automation.mjs\n');
  
  console.log('━'.repeat(80));
  console.log('SQL (in case clipboard didn\'t work):\n');
  console.log(SQL_TRIGGER);
  console.log('━'.repeat(80));
}

setup().catch(console.error);
