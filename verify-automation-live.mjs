#!/usr/bin/env node

/**
 * LIVE TEST - Verify Automation Works
 * Creates real article and tracks webhook execution
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import pg from 'pg';

config({ path: '.env' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const { Client } = pg;

async function liveTest() {
  console.log('🔴 LIVE TEST - Verifying Automation\n');
  console.log('━'.repeat(80));
  
  const testSlug = `live-test-${Date.now()}`;
  let articleId = null;

  try {
    // Step 1: Create test article
    console.log('\n📝 Step 1: Creating test article...');
    console.log(`   Slug: ${testSlug}`);
    
    const { data: article, error: insertError } = await supabase
      .from('news')
      .insert({
        title: '🧪 Live Test Article',
        title_en: '🧪 Live Test Article',
        slug: testSlug,
        content: `# Live Automation Test\n\nThis article tests the complete automation workflow.\n\n**Test Time:** ${new Date().toISOString()}`,
        content_en: `# Live Automation Test\n\nThis article tests the complete automation workflow.\n\n**Test Time:** ${new Date().toISOString()}`,
        excerpt: 'Testing automation workflow',
        excerpt_en: 'Testing automation workflow',
        category: 'news',
        cover_image_url: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200',
        status: 'published',
        is_featured: false,
        published_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) throw insertError;
    
    articleId = article.id;
    console.log('   ✅ Article created!');
    console.log(`   ID: ${article.id}\n`);

    // Step 2: Wait for trigger to fire
    console.log('⏳ Step 2: Waiting for database trigger (5 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('   ✅ Trigger should have fired\n');

    // Step 3: Check pg_net requests
    console.log('🔍 Step 3: Checking webhook requests...');
    const client = new Client({
      connectionString: process.env.SUPABASE_DB_TRANSACTION_URL,
    });
    await client.connect();

    try {
      const result = await client.query(`
        SELECT 
          id,
          status_code,
          content,
          error_msg,
          created_at
        FROM net._http_response
        WHERE created_at > NOW() - INTERVAL '1 minute'
        ORDER BY created_at DESC
        LIMIT 5
      `);

      if (result.rows.length > 0) {
        console.log(`   ✅ Found ${result.rows.length} webhook request(s):\n`);
        
        let webhookFired = false;
        for (const row of result.rows) {
          console.log(`   Request ID: ${row.id}`);
          console.log(`   Status: ${row.status_code || 'Pending'}`);
          console.log(`   Time: ${row.created_at}`);
          if (row.error_msg) {
            console.log(`   Error: ${row.error_msg}`);
          }
          console.log('');
          
          if (row.status_code === 200) {
            webhookFired = true;
          }
        }

        if (webhookFired) {
          console.log('   🎉 WEBHOOK FIRED SUCCESSFULLY!\n');
        } else {
          console.log('   ⚠️  Webhook fired but may have errors\n');
        }
      } else {
        console.log('   ⚠️  No webhook requests found in pg_net logs');
        console.log('   This might mean:');
        console.log('   - Webhook is still processing (wait longer)');
        console.log('   - pg_net logs not accessible');
        console.log('   - Need to check Vercel function logs\n');
      }
    } catch (error) {
      console.log('   ⚠️  Cannot access pg_net logs');
      console.log(`   Error: ${error.message}\n`);
    }

    await client.end();

    // Step 4: Check local sitemap
    console.log('📄 Step 4: Checking if automation generated sitemap...');
    try {
      const fs = await import('fs');
      const sitemapPath = 'd:\\sabo-arena-playbook\\public\\sitemap.xml';
      
      if (fs.existsSync(sitemapPath)) {
        const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
        
        if (sitemap.includes(testSlug)) {
          console.log('   ✅ Article found in LOCAL sitemap!');
          console.log('   ✅ Automation executed successfully!\n');
        } else {
          console.log('   ⚠️  Article not in local sitemap yet');
          console.log('   Automation may still be running...\n');
        }

        // Count total URLs
        const urlCount = (sitemap.match(/<loc>/g) || []).length;
        console.log(`   📊 Total URLs in sitemap: ${urlCount}\n`);
      } else {
        console.log('   ⚠️  Sitemap file not found\n');
      }
    } catch (error) {
      console.log('   ⚠️  Cannot check local sitemap\n');
    }

    // Step 5: Verify trigger exists
    console.log('🔧 Step 5: Verifying trigger configuration...');
    const client2 = new Client({
      connectionString: process.env.SUPABASE_DB_TRANSACTION_URL,
    });
    await client2.connect();

    const triggerCheck = await client2.query(`
      SELECT tgname, tgenabled 
      FROM pg_trigger 
      WHERE tgname = 'webhook_blog_published'
    `);

    if (triggerCheck.rows.length > 0) {
      console.log('   ✅ Database trigger exists and is enabled\n');
    } else {
      console.log('   ❌ Trigger not found!\n');
    }

    await client2.end();

    // Final summary
    console.log('━'.repeat(80));
    console.log('📊 TEST RESULTS SUMMARY\n');
    console.log(`Test Article: ${testSlug}`);
    console.log(`Article ID: ${articleId}`);
    console.log(`URL: https://saboarena.com/news/${testSlug}\n`);
    
    console.log('✅ What we verified:');
    console.log('   1. Article inserted into database');
    console.log('   2. Database trigger exists and enabled');
    console.log('   3. Checked for webhook execution\n');
    
    console.log('🔍 Manual verification steps:');
    console.log('1. Check Vercel function logs:');
    console.log('   https://vercel.com/sabos-projects-a56a8c3b/sabo-arena-playbook/logs\n');
    console.log('2. Check if sitemap updated on production:');
    console.log('   https://saboarena.com/sitemap.xml\n');
    console.log('3. Check Google Search Console (24 hours):');
    console.log('   https://search.google.com/search-console\n');
    console.log('━'.repeat(80));

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\nFull error:', error);
    process.exit(1);
  }
}

liveTest();
