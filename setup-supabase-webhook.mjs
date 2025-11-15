#!/usr/bin/env node

/**
 * Setup Supabase Database Webhook Automatically
 * Uses Supabase Management API
 */

import { config } from 'dotenv';

config({ path: '.env' });

const PROJECT_REF = 'mogjjvscxjwvhtpkrlqr';
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const WEBHOOK_URL = 'https://sabo-arena-playbook-2h2ft4rx5-sabos-projects-a56a8c3b.vercel.app/api/webhook-blog-published';

// Webhook configuration
const webhookConfig = {
  name: 'auto-index-on-blog-published',
  type: 'http_request',
  enabled: true,
  events: ['INSERT', 'UPDATE'],
  table: 'news',
  schema: 'public',
  filter: "record.status = 'published'",
  http_request: {
    method: 'POST',
    url: WEBHOOK_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout_ms: 30000
  }
};

async function createWebhook() {
  console.log('🔧 Setting up Supabase Database Webhook...\n');
  console.log(`📍 Project: ${PROJECT_REF}`);
  console.log(`📍 Table: public.news`);
  console.log(`📍 Events: INSERT, UPDATE`);
  console.log(`📍 Condition: status = 'published'`);
  console.log(`📍 Webhook URL: ${WEBHOOK_URL}\n`);

  try {
    // Supabase Management API endpoint for webhooks
    const apiUrl = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/webhooks`;
    
    console.log('⏳ Creating webhook via Supabase API...');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'apikey': ACCESS_TOKEN
      },
      body: JSON.stringify(webhookConfig)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error (${response.status}): ${error}`);
    }

    const result = await response.json();
    
    console.log('   ✅ Webhook created!\n');
    console.log('━'.repeat(80));
    console.log('🎉 WEBHOOK SETUP COMPLETE!\n');
    console.log('📊 Webhook Details:');
    console.log(`   ID: ${result.id || 'Created'}`);
    console.log(`   Name: ${webhookConfig.name}`);
    console.log(`   Status: Enabled\n`);
    console.log('🧪 Test it now:');
    console.log('1. Go to: https://saboarena.com/ai-news-admin');
    console.log('2. Create/edit article with status "published"');
    console.log('3. Check Supabase webhook logs:');
    console.log(`   https://app.supabase.com/project/${PROJECT_REF}/database/hooks\n`);
    console.log('✅ Automation will run automatically! 🚀');
    console.log('━'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Manual setup required:');
    console.log(`1. Go to: https://app.supabase.com/project/${PROJECT_REF}/database/hooks`);
    console.log('2. Click "Create a new hook"');
    console.log('3. Configure:');
    console.log(`   Name: ${webhookConfig.name}`);
    console.log(`   Table: ${webhookConfig.table}`);
    console.log(`   Events: ${webhookConfig.events.join(', ')}`);
    console.log(`   Condition: ${webhookConfig.filter}`);
    console.log(`   Method: ${webhookConfig.http_request.method}`);
    console.log(`   URL: ${webhookConfig.http_request.url}`);
    console.log(`   Timeout: ${webhookConfig.http_request.timeout_ms}ms`);
    process.exit(1);
  }
}

// First, check if we need to remove old SQL trigger
async function cleanupOldTrigger() {
  console.log('🧹 Checking for old SQL trigger...\n');
  
  try {
    const { Client } = await import('pg');
    const client = new Client({
      connectionString: process.env.SUPABASE_DB_TRANSACTION_URL,
    });

    await client.connect();
    
    // Check if trigger exists
    const result = await client.query(`
      SELECT tgname FROM pg_trigger WHERE tgname = 'on_blog_published'
    `);

    if (result.rows.length > 0) {
      console.log('⏳ Removing old SQL trigger...');
      await client.query('DROP TRIGGER IF EXISTS on_blog_published ON public.news;');
      await client.query('DROP FUNCTION IF EXISTS public.trigger_auto_index();');
      console.log('   ✅ Old trigger removed\n');
    } else {
      console.log('   ℹ️  No old trigger found\n');
    }

    await client.end();
  } catch (error) {
    console.log('   ⚠️  Could not check old trigger (this is OK)\n');
  }
}

async function main() {
  await cleanupOldTrigger();
  await createWebhook();
}

main();
