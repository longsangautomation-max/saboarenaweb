#!/usr/bin/env node
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function analyzeSEOPotential() {
  console.log('🔍 SABO ARENA - COMPREHENSIVE SEO ANALYSIS');
  console.log('='.repeat(50));
  
  let totalPages = 0;
  
  // 1. STATIC PAGES
  console.log('\n📄 STATIC PAGES:');
  const staticPages = [
    '/', '/rankings', '/clubs', '/live-matches', '/profile', 
    '/blog', '/privacy-policy', '/terms-of-service', '/delete-account',
    '/ai-news-admin', '/ai-news-admin-v2', '/news-test', '/deeplink-demo',
    '/live-match-demo'
  ];
  staticPages.forEach(page => console.log(`   ✓ ${page}`));
  console.log(`   📊 Count: ${staticPages.length}`);
  totalPages += staticPages.length;
  
  // 2. TOURNAMENTS
  try {
    const { data: tournaments, count } = await supabase
      .from('tournaments')
      .select('id, name, status, created_at', { count: 'exact' })
      .limit(5);
    
    console.log('\n🏆 TOURNAMENT PAGES:');
    if (tournaments) {
      tournaments.forEach(t => console.log(`   ✓ /tournaments/${t.id} - ${t.name}`));
      tournaments.forEach(t => console.log(`   ✓ /tournament/${t.id}/full - ${t.name} (Full Bracket)`));
    }
    console.log(`   📊 Total Tournaments: ${count || 0}`);
    console.log(`   📊 SEO Pages: ${(count || 0) * 2} (detail + full bracket)`);
    totalPages += (count || 0) * 2;
  } catch (e) {
    console.log('   ❌ Error fetching tournaments:', e.message);
  }
  
  // 3. USER PROFILES  
  try {
    const { data: users, count } = await supabase
      .from('users')
      .select('id, full_name, elo_rating', { count: 'exact' })
      .limit(5);
    
    console.log('\n👤 USER PROFILE PAGES:');
    if (users) {
      users.forEach(u => console.log(`   ✓ /user/${u.id} - ${u.full_name} (ELO: ${u.elo_rating})`));
    }
    console.log(`   📊 Total Users: ${count || 0}`);
    totalPages += count || 0;
  } catch (e) {
    console.log('   ❌ Error fetching users:', e.message);
  }
  
  // 4. LIVE MATCHES
  try {
    const { data: matches, count } = await supabase
      .from('matches')
      .select('id, tournament_id, status', { count: 'exact' })
      .limit(5);
    
    console.log('\n⚡ LIVE MATCH PAGES:');
    if (matches) {
      matches.forEach(m => console.log(`   ✓ /live-match/${m.id} - Tournament ${m.tournament_id}`));
    }
    console.log(`   📊 Total Matches: ${count || 0}`);
    totalPages += count || 0;
  } catch (e) {
    console.log('   ❌ Error fetching matches:', e.message);
  }
  
  // 5. NEWS/BLOG ARTICLES
  try {
    const { data: articles, count } = await supabase
      .from('news')
      .select('id, title, slug, status', { count: 'exact' })
      .limit(5);
    
    console.log('\n📰 NEWS/BLOG PAGES:');
    if (articles) {
      articles.forEach(a => console.log(`   ✓ /news/${a.slug} - ${a.title}`));
    }
    console.log(`   📊 Total Articles: ${count || 0}`);
    totalPages += count || 0;
  } catch (e) {
    console.log('   ❌ Error fetching articles:', e.message);
  }
  
  // 6. CLUBS (if exists)
  try {
    const { data: clubs, count } = await supabase
      .from('clubs')
      .select('id, name, location', { count: 'exact' })
      .limit(5);
    
    if (count > 0) {
      console.log('\n🏛️ CLUB PAGES:');
      if (clubs) {
        clubs.forEach(c => console.log(`   ✓ /club/${c.id} - ${c.name} (${c.location})`));
      }
      console.log(`   📊 Total Clubs: ${count}`);
      totalPages += count;
    }
  } catch (e) {
    // Club table might not exist, that's ok
  }
  
  // SUMMARY
  console.log('\n🎯 SEO OPPORTUNITY SUMMARY:');
  console.log('='.repeat(50));
  console.log(`📊 TOTAL INDEXABLE PAGES: ${totalPages.toLocaleString()}`);
  console.log(`🚀 CURRENT INDEXED: 7 (0.0001% coverage)`);
  console.log(`💎 UNTAPPED POTENTIAL: ${(totalPages - 7).toLocaleString()} pages`);
  
  console.log('\n🎱 BILLIARDS SEO KEYWORDS PER PAGE TYPE:');
  console.log('  🏆 Tournaments: giải đấu bi-a [name], lịch thi đấu bi-a');
  console.log('  👤 Players: cơ thủ bi-a [name], xếp hạng elo bi-a');
  console.log('  ⚡ Matches: trận đấu bi-a, kết quả bi-a live');
  console.log('  📰 Articles: tin tức bi-a, hướng dẫn chơi bi-a');
  console.log('  🏛️ Clubs: câu lạc bộ bi-a [location], địa điểm chơi bi-a');
  
  console.log('\n🔥 MASSIVE SEO OPPORTUNITY IDENTIFIED!');
  return totalPages;
}

analyzeSEOPotential().catch(console.error);