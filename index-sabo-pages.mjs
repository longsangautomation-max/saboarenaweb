#!/usr/bin/env node

/**
 * ====================================
 * 🚀 SABO ARENA - GOOGLE INDEXING API
 * ====================================
 * 
 * Script để index các trang của SABO ARENA lên Google Search
 * 
 * Sử dụng:
 * - Submit sitemap: node index-sabo-pages.mjs submit-sitemap
 * - Index URL đơn: node index-sabo-pages.mjs index-url https://saboarena.com/
 * - Index tất cả: node index-sabo-pages.mjs index-all
 * - Xem status: node index-sabo-pages.mjs status
 */

import { GoogleAuth } from 'google-auth-library';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load credentials
config({ path: join(__dirname, '.env.google') });

const PROPERTY_URL = process.env.GOOGLE_SEARCH_CONSOLE_PROPERTY_URL || 'https://saboarena.com';
const CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');

// 7 static pages from sitemap
const STATIC_PAGES = [
  { url: '/', priority: 1, name: 'Homepage' },
  { url: '/rankings', priority: 0.9, name: 'Rankings' },
  { url: '/live-matches', priority: 0.9, name: 'Live Matches' },
  { url: '/clubs', priority: 0.8, name: 'Clubs' },
  { url: '/profile', priority: 0.6, name: 'Profile' },
  { url: '/privacy-policy', priority: 0.3, name: 'Privacy Policy' },
  { url: '/terms-of-service', priority: 0.3, name: 'Terms of Service' }
];

// Initialize Google Auth
const auth = new GoogleAuth({
  credentials: CREDENTIALS,
  scopes: [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/indexing'
  ]
});

/**
 * Submit sitemap to Google Search Console
 */
async function submitSitemap(sitemapUrl) {
  try {
    console.log('\n🗺️  SUBMITTING SITEMAP TO GOOGLE SEARCH CONSOLE\n');
    
    const client = await auth.getClient();
    const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPERTY_URL)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
    
    await client.request({
      url,
      method: 'PUT'
    });
    
    console.log('✅ Sitemap submitted successfully!');
    console.log(`📍 Sitemap URL: ${sitemapUrl}`);
    console.log(`🔍 Check status at: https://search.google.com/search-console/sitemaps?resource_id=${PROPERTY_URL}\n`);
    
    return true;
  } catch (error) {
    console.error('❌ Error submitting sitemap:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

/**
 * Index single URL via Google Indexing API
 */
async function indexUrl(url) {
  try {
    const client = await auth.getClient();
    const fullUrl = url.startsWith('http') ? url : `${PROPERTY_URL}${url}`;
    
    const response = await client.request({
      url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
      method: 'POST',
      data: {
        url: fullUrl,
        type: 'URL_UPDATED'
      }
    });
    
    console.log(`✅ ${fullUrl}`);
    return response.data;
  } catch (error) {
    console.error(`❌ ${url} - Error: ${error.message}`);
    return null;
  }
}

/**
 * Index all static pages
 */
async function indexAllPages() {
  console.log('\n🚀 INDEXING ALL STATIC PAGES\n');
  console.log(`📊 Total pages: ${STATIC_PAGES.length}\n`);
  
  const results = {
    success: 0,
    failed: 0
  };
  
  for (const page of STATIC_PAGES) {
    const result = await indexUrl(page.url);
    if (result) {
      results.success++;
    } else {
      results.failed++;
    }
    // Delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📈 INDEXING RESULTS');
  console.log(`✅ Success: ${results.success}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📊 Total: ${STATIC_PAGES.length}\n`);
  
  console.log('⏱️  Expected timeline:');
  console.log('   - Crawling starts: Within 24 hours');
  console.log('   - Indexing complete: 3-7 days');
  console.log('   - Check status: https://search.google.com/search-console\n');
}

/**
 * Check sitemap status
 */
async function checkStatus() {
  try {
    console.log('\n📊 CHECKING SITEMAP STATUS\n');
    
    const client = await auth.getClient();
    const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPERTY_URL)}/sitemaps`;
    
    const response = await client.request({
      url,
      method: 'GET'
    });
    
    const sitemaps = response.data.sitemap || [];
    
    if (sitemaps.length === 0) {
      console.log('⚠️  No sitemaps found');
      console.log('💡 Run: node index-sabo-pages.mjs submit-sitemap https://saboarena.com/sitemap.xml\n');
    } else {
      console.log(`✅ Found ${sitemaps.length} sitemap(s):\n`);
      sitemaps.forEach(sitemap => {
        console.log(`📍 ${sitemap.path}`);
        console.log(`   Status: ${sitemap.isPending ? '⏳ Pending' : '✅ Processed'}`);
        console.log(`   Submitted: ${sitemap.lastSubmitted || 'Unknown'}`);
        console.log(`   URLs: ${sitemap.contents?.[0]?.submitted || 0} submitted, ${sitemap.contents?.[0]?.indexed || 0} indexed\n`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking status:', error.message);
  }
}

/**
 * Main CLI handler
 */
async function main() {
  const command = process.argv[2];
  const arg = process.argv[3];
  
  console.log('🎱 SABO ARENA - Google Indexing Tool\n');
  
  if (!CREDENTIALS.private_key) {
    console.error('❌ Missing Google credentials!');
    console.error('💡 Make sure .env.google file exists with GOOGLE_SERVICE_ACCOUNT_JSON\n');
    process.exit(1);
  }
  
  switch (command) {
    case 'submit-sitemap':
      await submitSitemap(arg || `${PROPERTY_URL}/sitemap.xml`);
      break;
      
    case 'index-url':
      if (!arg) {
        console.error('❌ Please provide URL to index');
        console.log('💡 Example: node index-sabo-pages.mjs index-url https://saboarena.com/\n');
        process.exit(1);
      }
      await indexUrl(arg);
      break;
      
    case 'index-all':
      await indexAllPages();
      break;
      
    case 'status':
      await checkStatus();
      break;
      
    default:
      console.log('📚 AVAILABLE COMMANDS:\n');
      console.log('  submit-sitemap [url]  - Submit sitemap to Google Search Console');
      console.log('                          Default: https://saboarena.com/sitemap.xml');
      console.log('');
      console.log('  index-url <url>       - Index single URL via Indexing API');
      console.log('                          Example: index-url https://saboarena.com/');
      console.log('');
      console.log('  index-all             - Index all 7 static pages');
      console.log('');
      console.log('  status                - Check sitemap status in Search Console');
      console.log('');
      console.log('💡 QUICK START:');
      console.log('   1. node index-sabo-pages.mjs submit-sitemap');
      console.log('   2. node index-sabo-pages.mjs index-all');
      console.log('   3. node index-sabo-pages.mjs status\n');
      break;
  }
}

main().catch(console.error);
