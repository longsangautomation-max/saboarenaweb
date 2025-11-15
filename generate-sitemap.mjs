#!/usr/bin/env node
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('   Need: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Static pages configuration
const STATIC_PAGES = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/rankings', priority: 0.9, changefreq: 'daily' },
  { url: '/clubs', priority: 0.8, changefreq: 'weekly' },
  { url: '/live-matches', priority: 0.9, changefreq: 'hourly' },
  { url: '/profile', priority: 0.6, changefreq: 'monthly' },
  { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
];

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

function generateSitemapXML(urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.image ? `
    <image:image>
      <image:loc>${url.image}</image:loc>
      <image:title>${url.imageTitle}</image:title>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
}

async function generateSitemap() {
  console.log('🗺️  SABO ARENA - Sitemap Generator');
  console.log('═══════════════════════════════════════\n');

  try {
    // Fetch published news/blog articles
    console.log('📰 Fetching published articles...');
    const { data: articles, error } = await supabase
      .from('news')
      .select('slug, title, published_at, updated_at, cover_image_url, category')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log(`   ✅ Found ${articles?.length || 0} published articles\n`);

    // Build URLs array
    const baseUrl = 'https://saboarena.com';
    const urls = [];
    const now = formatDate(new Date());

    // Add static pages
    console.log('📄 Adding static pages...');
    STATIC_PAGES.forEach(page => {
      urls.push({
        loc: `${baseUrl}${page.url}`,
        lastmod: now,
        changefreq: page.changefreq,
        priority: page.priority
      });
      console.log(`   ✓ ${page.url}`);
    });

    // Add blog/news articles
    console.log('\n📝 Adding blog articles...');
    articles?.forEach(article => {
      const categoryPriority = {
        'tournament': 0.9,
        'guide': 0.8,
        'players': 0.7,
        'club': 0.7,
        'interview': 0.6,
        'regulation': 0.5
      };

      urls.push({
        loc: `${baseUrl}/news/${article.slug}`,
        lastmod: formatDate(article.updated_at || article.published_at),
        changefreq: 'weekly',
        priority: categoryPriority[article.category.toLowerCase()] || 0.6,
        image: article.cover_image_url,
        imageTitle: article.title
      });
      console.log(`   ✓ /news/${article.slug}`);
    });

    // Generate XML
    console.log('\n🔨 Generating sitemap.xml...');
    const sitemapXML = generateSitemapXML(urls);

    // Write to public folder
    const publicPath = join(__dirname, '..', 'public', 'sitemap.xml');
    writeFileSync(publicPath, sitemapXML, 'utf-8');

    console.log(`   ✅ Sitemap created: ${publicPath}`);
    console.log(`\n📊 SUMMARY:`);
    console.log(`   • Total URLs: ${urls.length}`);
    console.log(`   • Static pages: ${STATIC_PAGES.length}`);
    console.log(`   • Blog articles: ${articles?.length || 0}`);
    console.log(`   • File size: ${(sitemapXML.length / 1024).toFixed(2)} KB`);
    
    console.log('\n✅ Sitemap generation complete!');
    console.log('📍 Submit to Google: https://search.google.com/search-console');
    console.log(`🔗 View at: ${baseUrl}/sitemap.xml\n`);

    return {
      success: true,
      totalUrls: urls.length,
      staticPages: STATIC_PAGES.length,
      articles: articles?.length || 0
    };

  } catch (error) {
    console.error('\n❌ Error generating sitemap:');
    console.error(`   ${error.message}\n`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap };
