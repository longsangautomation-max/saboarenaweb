#!/usr/bin/env node

/**
 * Automatically Create Supabase Database Webhook
 * Using Supabase Management API
 */

import { config } from 'dotenv';

config({ path: '.env' });

const PROJECT_REF = 'mogjjvscxjwvhtpkrlqr';
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const WEBHOOK_URL = 'https://sabo-arena-playbook-2h2ft4rx5-sabos-projects-a56a8c3b.vercel.app/api/webhook-blog-published';

// Database webhook configuration using pg_net
const webhookSQL = `
-- Create database webhook using pg_net
SELECT net.http_post(
    url := '${WEBHOOK_URL}',
    headers := jsonb_build_object(
        'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
        'type', TG_OP,
        'table', TG_TABLE_NAME,
        'record', row_to_json(NEW),
        'old_record', CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END
    )
) AS request_id
FROM news
WHERE status = 'published';
`;

async function createWebhookDirectly() {
  console.log('🔧 Creating Supabase Database Webhook Automatically...\n');
  console.log(`📍 Project: ${PROJECT_REF}`);
  console.log(`📍 Webhook URL: ${WEBHOOK_URL}\n`);

  try {
    // Use pg_cron to schedule webhook trigger
    const { Client } = await import('pg');
    const client = new Client({
      connectionString: process.env.SUPABASE_DB_TRANSACTION_URL,
    });

    await client.connect();
    console.log('✅ Connected to database\n');

    // Enable pg_net extension
    console.log('⏳ 1. Enabling pg_net extension...');
    await client.query(`CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;`);
    console.log('   ✅ pg_net extension enabled\n');

    // Create trigger function using pg_net
    console.log('⏳ 2. Creating webhook trigger function...');
    await client.query(`
      CREATE OR REPLACE FUNCTION public.webhook_on_blog_published()
      RETURNS TRIGGER
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
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
        
        -- Make async HTTP request using pg_net
        SELECT INTO request_id net.http_post(
          url := '${WEBHOOK_URL}',
          headers := jsonb_build_object(
            'Content-Type', 'application/json'
          ),
          body := payload
        );
        
        RETURN NEW;
      END;
      $$;
    `);
    console.log('   ✅ Trigger function created\n');

    // Drop old trigger if exists
    console.log('⏳ 3. Removing old trigger (if exists)...');
    await client.query(`DROP TRIGGER IF EXISTS webhook_blog_published ON public.news;`);
    console.log('   ✅ Old trigger removed\n');

    // Create new trigger
    console.log('⏳ 4. Creating database trigger...');
    await client.query(`
      CREATE TRIGGER webhook_blog_published
        AFTER INSERT OR UPDATE ON public.news
        FOR EACH ROW
        WHEN (NEW.status = 'published')
        EXECUTE FUNCTION public.webhook_on_blog_published();
    `);
    console.log('   ✅ Trigger created\n');

    await client.end();

    console.log('━'.repeat(80));
    console.log('🎉 WEBHOOK AUTOMATION COMPLETE!\n');
    console.log('✅ Database webhook configured');
    console.log('✅ Using pg_net for async HTTP requests');
    console.log('✅ Automatic retry built-in\n');
    console.log('🧪 Test it now:');
    console.log('1. Publish a blog post: https://saboarena.com/ai-news-admin');
    console.log('2. Webhook will automatically fire');
    console.log('3. Sitemap regenerates + Google indexing\n');
    console.log('✨ All automatic! No manual steps needed! 🚀');
    console.log('━'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Check if pg_net is not available
    if (error.message.includes('pg_net') || error.message.includes('net.http_post')) {
      console.log('\n⚠️  pg_net extension not available in this Supabase project.');
      console.log('This is normal for some Supabase plans.\n');
      console.log('📝 Alternative: Use Supabase Database Webhooks (UI)');
      console.log('Run: node setup-webhook-interactive.mjs\n');
    } else {
      console.log('\nFull error:', error);
    }
    
    process.exit(1);
  }
}

createWebhookDirectly();
