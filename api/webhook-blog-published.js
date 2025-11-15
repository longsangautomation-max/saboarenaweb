/**
 * Vercel Serverless Function
 * Webhook endpoint for Supabase to trigger auto-indexing
 */

import { createClient } from '@supabase/supabase-js';
import { GoogleAuth } from 'google-auth-library';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
const PROPERTY_URL = 'https://saboarena.com';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const auth = new GoogleAuth({
  credentials: GOOGLE_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/indexing']
});

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

async function fetchArticles() {
  const { data, error } = await supabase
    .from('news')
    .select('slug, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

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

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

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

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('📨 Received webhook:', new Date().toISOString());
  
  const { table, record, old_record } = req.body;
  
  // Validate webhook
  if (table !== 'news') {
    return res.status(400).json({ error: 'Invalid table' });
  }

  // Check if article is published
  if (record.status !== 'published') {
    console.log('   ⏸️  Article not published, skipping automation');
    return res.json({ message: 'Article not published, no action taken' });
  }

  // Check if this is a new publish (not an update)
  const isNewPublish = !old_record || old_record.status !== 'published';
  
  const slug = record.slug;
  console.log(`   📝 Article slug: ${slug}`);
  console.log(`   🤖 Running automation...`);

  try {
    // Step 1: Fetch articles
    console.log('📊 Fetching published articles...');
    const articles = await fetchArticles();
    console.log(`   Found: ${articles.length} published article(s)`);

    // Step 2: Generate sitemap (Note: Vercel is read-only, we'll return it)
    console.log('🗺️  Generating sitemap...');
    const sitemapXml = generateSitemap(articles);
    const urlCount = articles.length + STATIC_PAGES.length;
    console.log(`   📊 Total URLs: ${urlCount}`);

    // Step 3: Index new article (if new publish)
    let indexSuccess = false;
    if (isNewPublish) {
      const newUrl = `${PROPERTY_URL}/news/${slug}`;
      console.log(`🚀 Indexing new article: ${newUrl}`);
      indexSuccess = await indexUrl(newUrl);
      console.log(indexSuccess ? '   ✅ Successfully indexed!' : '   ❌ Failed to index');
    } else {
      console.log('ℹ️  Article already published, sitemap only');
    }

    res.json({
      success: true,
      message: isNewPublish 
        ? `Automation completed for ${slug}` 
        : 'Sitemap regenerated',
      timestamp: new Date().toISOString(),
      sitemapUrlCount: urlCount,
      indexed: indexSuccess,
      // Return sitemap for manual update (Vercel is read-only)
      sitemap: sitemapXml
    });

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    res.status(500).json({
      error: 'Automation failed',
      message: error.message
    });
  }
}
