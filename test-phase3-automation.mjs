#!/usr/bin/env node

/**
 * Test End-to-End Automation
 * Create test blog post and verify automation triggers
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function testAutomation() {
  console.log('🧪 Testing Phase 3 Automation...\n');
  
  const testSlug = `test-automation-phase3-${Date.now()}`;
  
  console.log('📝 Creating test article...');
  console.log(`   Slug: ${testSlug}\n`);
  
  try {
    // Insert test article
    const { data, error } = await supabase
      .from('news')
      .insert({
        title: '🧪 Test Automation Phase 3',
        title_en: '🧪 Test Automation Phase 3',
        slug: testSlug,
        content: `# Test Article

This article was created automatically to test Phase 3 automation workflow.

## Features Being Tested:

1. ✅ Supabase trigger activation
2. ✅ Webhook receives event
3. ✅ Automation script executes
4. ✅ Sitemap regenerated
5. ✅ URL submitted to Google

**Expected Results:**
- Webhook logs show received event
- Sitemap includes new URL
- Google Indexing API returns success

---

**Test Time:** ${new Date().toISOString()}`,
        content_en: `# Test Article

This article was created automatically to test Phase 3 automation workflow.

## Features Being Tested:

1. ✅ Supabase trigger activation
2. ✅ Webhook receives event
3. ✅ Automation script executes
4. ✅ Sitemap regenerated
5. ✅ URL submitted to Google

**Expected Results:**
- Webhook logs show received event
- Sitemap includes new URL
- Google Indexing API returns success

---

**Test Time:** ${new Date().toISOString()}`,
        excerpt: 'Test article for Phase 3 automation workflow verification',
        excerpt_en: 'Test article for Phase 3 automation workflow verification',
        category: 'news',
        cover_image_url: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200&h=630&fit=crop&q=80',
        status: 'published',
        is_featured: false,
        published_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error creating article:', error.message);
      console.log('\n⚠️  Note: If trigger exists, webhook should still fire.');
      console.log('Check webhook terminal for logs.\n');
      process.exit(1);
    }
    
    console.log('✅ Article created successfully!');
    console.log(`   ID: ${data.id}`);
    console.log(`   URL: https://saboarena.com/news/${testSlug}\n`);
    
    console.log('⏳ Waiting for webhook (5 seconds)...\n');
    
    // Wait for webhook to process
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('🔍 Checking webhook terminal...');
    console.log('   Look for: "📨 Received webhook"');
    console.log('   Then: "✅ Successfully indexed!"\n');
    
    console.log('📊 Verification Steps:\n');
    console.log('1. Check webhook terminal output');
    console.log('2. Verify sitemap includes new article:');
    console.log(`   curl https://saboarena.com/sitemap.xml | grep "${testSlug}"`);
    console.log('3. Check Google Search Console (24 hours):');
    console.log(`   https://search.google.com/search-console`);
    console.log(`   URL: https://saboarena.com/news/${testSlug}\n`);
    
    console.log('✅ Test complete!');
    console.log('\n💡 If webhook logs show success, Phase 3 is working!\n');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testAutomation();
