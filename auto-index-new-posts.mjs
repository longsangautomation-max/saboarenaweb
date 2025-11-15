#!/usr/bin/env node

/**
 * ====================================
 * 🤖 AUTO-INDEX NEW BLOG POSTS
 * ====================================
 * 
 * Tự động:
 * 1. Regenerate sitemap.xml
 * 2. Index URL mới lên Google
 * 3. Log results
 * 
 * Trigger: Khi publish blog post mới
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { GoogleAuth } from 'google-auth-library';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '.env') });
config({ path: join(__dirname, '.env.google') });

// Supabase
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Google
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
const PROPERTY_URL = 'https://saboarena.com';

const auth = new GoogleAuth({
  credentials: GOOGLE_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/indexing']
});

// Static pages
const STATIC_PAGES = [
  { url: '/', priority: 1, changefreq: 'daily' },
  { url: '/rankings', priority: 0.9, changefreq: 'daily' },
  { url: '/blog', priority: 0.9, changefreq: 'daily' },
  { url: '/clubs', priority: 0.8, changefreq: 'weekly' },
  { url: '/live-matches', priority: 0.9, changefreq: 'hourly' },
  { url: '/profile', priority: 0.6, changefreq: 'monthly' },
  { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly' }
];

/**
 * Step 1: Fetch all published articles
 */
async function fetchArticles() {
  const { data, error } = await supabase
    .from('news')
    .select('slug, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Step 2: Generate sitemap.xml
 */
function generateSitemap(articles) {
  const today = new Date().toISOString().split('T')[0];
  
  const urls = [
    ...STATIC_PAGES.map(page => ({
      loc: `${PROPERTY_URL}${page.url}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority
    })),
    ...articles.map(article => ({
      loc: `${PROPERTY_URL}/news/${article.slug}`,
      lastmod: article.published_at.split('T')[0],
      changefreq: 'monthly',
      priority: 0.9
    }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const sitemapPath = join(__dirname, 'public', 'sitemap.xml');
  writeFileSync(sitemapPath, xml);
  
  return { path: sitemapPath, urlCount: urls.length };
}

/**
 * Step 3: Index URL via Google Indexing API
 */
async function indexUrl(url) {
  try {
    const client = await auth.getClient();
    await client.request({
      url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
      method: 'POST',
      data: {
        url,
        type: 'URL_UPDATED'
      }
    });
    return true;
  } catch (error) {
    console.error(`Failed to index ${url}:`, error.message);
    return false;
  }
}

/**
 * Main automation function
 */
async function autoIndex(newSlug = null) {
  console.log('🤖 AUTO-INDEX: Starting automation...\n');
  
  try {
    // Step 1: Fetch articles
    console.log('📊 Fetching published articles...');
    const articles = await fetchArticles();
    console.log(`   Found: ${articles.length} published article(s)\n`);

    // Step 2: Generate sitemap
    console.log('🗺️  Generating sitemap...');
    const sitemap = generateSitemap(articles);
    console.log(`   ✅ Created: ${sitemap.path}`);
    console.log(`   📊 Total URLs: ${sitemap.urlCount}\n`);

    // Step 3: Index new article (if provided)
    if (newSlug) {
      const newUrl = `${PROPERTY_URL}/news/${newSlug}`;
      console.log(`🚀 Indexing new article: ${newUrl}`);
      const success = await indexUrl(newUrl);
      if (success) {
        console.log('   ✅ Successfully indexed!\n');
      } else {
        console.log('   ❌ Failed to index\n');
      }
    } else {
      console.log('ℹ️  No new article slug provided, skipping indexing\n');
    }

    console.log('✅ Automation complete!');
    console.log('\n📈 Expected results:');
    console.log('   - Crawling: Within 24 hours');
    console.log('   - Indexing: 3-7 days');
    console.log('   - Search appearance: 7-14 days\n');

  } catch (error) {
    console.error('❌ Automation failed:', error.message);
    process.exit(1);
  }
}

// CLI usage
const newSlug = process.argv[2];
if (process.argv.length === 2) {
  console.log('💡 Usage:');
  console.log('   node auto-index-new-posts.mjs [slug]');
  console.log('');
  console.log('Examples:');
  console.log('   node auto-index-new-posts.mjs                          # Regenerate sitemap only');
  console.log('   node auto-index-new-posts.mjs new-article-slug         # Regenerate + index new article\n');
}

autoIndex(newSlug);
