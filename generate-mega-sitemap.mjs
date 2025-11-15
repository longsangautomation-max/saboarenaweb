#!/usr/bin/env node
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const BASE_URL = 'https://saboarena.com';
const MAX_SITEMAP_URLS = 50000; // Google limit

async function generateMegaSitemap() {
  console.log('🚀 GENERATING MEGA SITEMAP FOR 300+ PAGES');
  console.log('='.repeat(50));
  
  const urls = [];
  const now = new Date().toISOString().split('T')[0];
  
  // 1. STATIC PAGES (High Priority)
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/rankings', priority: 0.9, changefreq: 'daily' },
    { url: '/live-matches', priority: 0.9, changefreq: 'hourly' },
    { url: '/clubs', priority: 0.8, changefreq: 'weekly' },
    { url: '/blog', priority: 0.8, changefreq: 'daily' },
    { url: '/profile', priority: 0.6, changefreq: 'monthly' },
    { url: '/tournaments', priority: 0.8, changefreq: 'weekly' }, // New
    { url: '/players', priority: 0.7, changefreq: 'weekly' }, // New
    { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
  ];
  
  for (const page of staticPages) {
    urls.push({
      loc: `${BASE_URL}${page.url}`,
      lastmod: now,
      changefreq: page.changefreq,
      priority: page.priority
    });
  }
  
  console.log(`✅ Added ${staticPages.length} static pages`);
  
  // 2. USER PROFILES (123 pages)
  try {
    const { data: users } = await supabase
      .from('users')
      .select('id, full_name, elo_rating, updated_at')
      .order('elo_rating', { ascending: false });
    
    if (users) {
      for (const user of users) {
        urls.push({
          loc: `${BASE_URL}/user/${user.id}`,
          lastmod: user.updated_at ? user.updated_at.split('T')[0] : now,
          changefreq: 'weekly',
          priority: 0.6,
          title: `${user.full_name} - Cơ Thủ Bi-a ELO ${user.elo_rating}`
        });
      }
      console.log(`✅ Added ${users.length} user profile pages`);
    }
  } catch (e) {
    console.log('❌ Error fetching users:', e.message);
  }
  
  // 3. LIVE MATCHES (170 pages)
  try {
    const { data: matches } = await supabase
      .from('matches')
      .select('id, tournament_id, status, updated_at, player1_id, player2_id')
      .order('updated_at', { ascending: false });
    
    if (matches) {
      for (const match of matches) {
        const priority = match.status === 'live' ? 0.9 : 
                        match.status === 'upcoming' ? 0.7 : 0.5;
        
        urls.push({
          loc: `${BASE_URL}/live-match/${match.id}`,
          lastmod: match.updated_at ? match.updated_at.split('T')[0] : now,
          changefreq: match.status === 'live' ? 'hourly' : 'daily',
          priority: priority,
          title: `Trận Đấu Bi-a Live ${match.id.slice(0,8)}`
        });
      }
      console.log(`✅ Added ${matches.length} match pages`);
    }
  } catch (e) {
    console.log('❌ Error fetching matches:', e.message);
  }
  
  // 4. NEWS/ARTICLES
  try {
    const { data: articles } = await supabase
      .from('news')
      .select('slug, title, published_at, updated_at, category, status')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    
    if (articles) {
      for (const article of articles) {
        const categoryPriority = {
          'tournament': 0.9,
          'players': 0.8,
          'guide': 0.7,
          'club': 0.6,
          'interview': 0.6,
          'regulation': 0.5
        };
        
        urls.push({
          loc: `${BASE_URL}/news/${article.slug}`,
          lastmod: article.updated_at ? article.updated_at.split('T')[0] : now,
          changefreq: 'weekly',
          priority: categoryPriority[article.category] || 0.6,
          title: article.title
        });
      }
      console.log(`✅ Added ${articles.length} news articles`);
    }
  } catch (e) {
    console.log('❌ Error fetching articles:', e.message);
  }
  
  // 5. TOURNAMENT PAGES (if any)
  try {
    const { data: tournaments } = await supabase
      .from('tournaments')
      .select('id, name, status, created_at, updated_at')
      .order('created_at', { ascending: false });
    
    if (tournaments && tournaments.length > 0) {
      for (const tournament of tournaments) {
        // Tournament detail page
        urls.push({
          loc: `${BASE_URL}/tournaments/${tournament.id}`,
          lastmod: tournament.updated_at ? tournament.updated_at.split('T')[0] : now,
          changefreq: 'daily',
          priority: 0.8,
          title: `${tournament.name} - Giải Đấu Bi-a`
        });
        
        // Tournament bracket page
        urls.push({
          loc: `${BASE_URL}/tournament/${tournament.id}/full`,
          lastmod: tournament.updated_at ? tournament.updated_at.split('T')[0] : now,
          changefreq: 'daily',
          priority: 0.7,
          title: `${tournament.name} - Bảng Đấu Chi Tiết`
        });
      }
      console.log(`✅ Added ${tournaments.length * 2} tournament pages`);
    }
  } catch (e) {
    console.log('❌ Error fetching tournaments:', e.message);
  }
  
  // Generate XML
  console.log(`\n📊 TOTAL URLS: ${urls.length}`);
  
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  // Write to file
  writeFileSync('./public/sitemap.xml', sitemapXML);
  
  const fileSizeKB = Buffer.byteLength(sitemapXML, 'utf8') / 1024;
  
  console.log('\n🎉 MEGA SITEMAP GENERATED!');
  console.log('='.repeat(30));
  console.log(`📁 File: public/sitemap.xml`);
  console.log(`📊 URLs: ${urls.length.toLocaleString()}`);
  console.log(`💾 Size: ${fileSizeKB.toFixed(1)} KB`);
  console.log(`🌐 Coverage: ${((urls.length / 314) * 100).toFixed(1)}%`);
  
  if (urls.length > MAX_SITEMAP_URLS) {
    console.log(`⚠️  WARNING: Exceeds Google limit (${MAX_SITEMAP_URLS})`);
    console.log(`💡 Consider splitting into multiple sitemaps`);
  }
  
  // Generate URL list for mass indexing
  const urlList = urls.map(u => u.loc).join('\n');
  writeFileSync('./mega-index-urls.txt', urlList);
  console.log(`📋 URL list saved: mega-index-urls.txt`);
  
  return urls.length;
}

await generateMegaSitemap();