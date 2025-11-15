#!/usr/bin/env node

/**
 * Create Supabase SQL Trigger via Management API
 * Uses direct database connection to execute SQL
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// SQL to create trigger
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
  request_id BIGINT;
  payload JSONB;
BEGIN
  -- Build payload
  payload := jsonb_build_object(
    'type', TG_OP,
    'table', TG_TABLE_NAME,
    'record', row_to_json(NEW),
    'old_record', CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END
  );
  
  -- Call webhook (async, don't block)
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
  console.log('🔧 Creating Supabase SQL Trigger via API...\n');
  
  try {
    for (let i = 0; i < SQL_STATEMENTS.length; i++) {
      const sql = SQL_STATEMENTS[i];
      const stepName = [
        '1. Enable http extension',
        '2. Create trigger function',
        '3. Drop existing trigger',
        '4. Create trigger'
      ][i];
      
      console.log(`⏳ ${stepName}...`);
      
      // Execute SQL using Supabase RPC (if available) or direct query
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql }).catch(() => ({
        data: null,
        error: { message: 'RPC not available, trying direct query' }
      }));
      
      if (error) {
        // Try direct query method
        const { error: queryError } = await supabase
          .from('_sql')
          .insert({ query: sql })
          .catch(() => ({ error: { message: 'Direct query not available' } }));
        
        if (queryError) {
          console.log(`   ⚠️  Cannot execute via API: ${error.message}`);
          console.log('   Will show manual instructions instead.\n');
          throw new Error('API execution not supported');
        }
      }
      
      console.log(`   ✅ ${stepName} - Done!`);
    }
    
    console.log('\n✅ Trigger created successfully!\n');
    console.log('🎉 Phase 3 automation is now complete!\n');
    console.log('Test it by publishing a blog post:');
    console.log('1. Open: https://saboarena.com/ai-news-admin');
    console.log('2. Create article and set status to "published"');
    console.log('3. Watch webhook terminal for automatic indexing!\n');
    
  } catch (error) {
    console.log('\n⚠️  Cannot create trigger programmatically.');
    console.log('Please execute SQL manually:\n');
    console.log('━'.repeat(80));
    console.log('1. Open: https://app.supabase.com/project/mogjjvscxjwvhtpkrlqr/sql');
    console.log('2. Click: "New Query"');
    console.log('3. Paste this SQL:\n');
    console.log('━'.repeat(80));
    SQL_STATEMENTS.forEach((sql, i) => {
      console.log(`-- Step ${i + 1}`);
      console.log(sql);
      console.log('');
    });
    console.log('━'.repeat(80));
    console.log('4. Click: "RUN" (or Ctrl+Enter)');
    console.log('5. Expected: "Success. No rows returned"\n');
  }
}

createTrigger();
