#!/usr/bin/env node
// Social Media SEO Testing for saboarena.com

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://diexsbzqwsbpilsymnfb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZXhzYnpxd3NicGlsc3ltbmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMjIzMzEsImV4cCI6MjA0Njg5ODMzMX0.ZKAZ2eCnP7zKnXNJfVNGZfGe8E1Q7nLd8qWYTKQKzpk';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('📱 SOCIAL MEDIA SEO TESTING - SABOARENA');
console.log('='.repeat(50));
console.log(`📅 Date: ${new Date().toLocaleDateString('vi-VN')}`);
console.log(`🕒 Time: ${new Date().toLocaleTimeString('vi-VN')}\n`);

console.log('🎯 PERFECT URLs FOR SOCIAL SHARING:');
console.log('─'.repeat(40));

// Get some high-value URLs from database
try {
  console.log('🔍 Fetching top performers from database...\n');
  
  // Get a top user profile
  const { data: users } = await supabase
    .from('users')
    .select('id, username, elo_rating')
    .order('elo_rating', { ascending: false })
    .limit(3);
  
  // Get recent match
  const { data: matches } = await supabase
    .from('matches')
    .select('id, player1_id, player2_id, created_at')
    .order('created_at', { ascending: false })
    .limit(3);
    
  // Get news article
  const { data: news } = await supabase
    .from('news')
    .select('id, title, created_at')
    .order('created_at', { ascending: false })
    .limit(3);

  const sharingUrls = [
    {
      platform: 'Facebook',
      type: 'User Profile',
      url: `https://saboarena.com/users/${users?.[0]?.id || '1'}`,
      title: `Top Player: ${users?.[0]?.username || 'Champion'} (ELO: ${users?.[0]?.elo_rating || '1800'})`,
      description: 'Xem profile cơ thủ hàng đầu tại SABO ARENA - Nền tảng bi-a số 1 Việt Nam',
      hashtags: '#BiAVietNam #SaboArena #ELORanking'
    },
    {
      platform: 'Twitter/X',
      type: 'Match Result',
      url: `https://saboarena.com/matches/${matches?.[0]?.id || '1'}`,
      title: 'Trận đấu bi-a kịch tính tại SABO ARENA',
      description: 'Theo dõi kết quả trận đấu mới nhất và xếp hạng ELO',
      hashtags: '#Billiards #LiveMatch #Competition #Vietnam'
    },
    {
      platform: 'LinkedIn',
      type: 'News Article',
      url: `https://saboarena.com/news/${news?.[0]?.id || '1'}`,
      title: news?.[0]?.title || 'Tin tức bi-a mới nhất',
      description: 'Cập nhật tin tức và sự kiện bi-a từ SABO ARENA',
      hashtags: '#SportsNews #Billiards #Vietnam #Tournament'
    },
    {
      platform: 'WhatsApp',
      type: 'Rankings Page',
      url: 'https://saboarena.com/rankings',
      title: 'Bảng xếp hạng ELO Bi-a Việt Nam 2025',
      description: 'Xem ai là cơ thủ số 1! 🎱',
      hashtags: '#TopPlayer #Rankings #BiA'
    },
    {
      platform: 'Telegram',
      type: 'Tournament Page',
      url: 'https://saboarena.com/tournaments',
      title: 'Giải đấu bi-a đang diễn ra',
      description: 'Tham gia giải đấu và thách thức các cao thủ!',
      hashtags: '#Tournament #Competition #JoinNow'
    }
  ];

  console.log('🚀 READY-TO-SHARE CONTENT:');
  console.log('─'.repeat(40));

  for (let i = 0; i < sharingUrls.length; i++) {
    const content = sharingUrls[i];
    console.log(`${i+1}. ${content.platform} - ${content.type}`);
    console.log(`   🔗 URL: ${content.url}`);
    console.log(`   📝 Title: ${content.title}`);
    console.log(`   💬 Description: ${content.description}`);
    console.log(`   🏷️ Hashtags: ${content.hashtags}`);
    console.log('');
  }

} catch (error) {
  console.log('⚠️ Database connection issue, using fallback URLs...\n');
  
  const fallbackUrls = [
    { platform: 'Facebook', url: 'https://saboarena.com/users/1', type: 'User Profile' },
    { platform: 'Twitter', url: 'https://saboarena.com/matches/1', type: 'Match Result' },
    { platform: 'LinkedIn', url: 'https://saboarena.com/rankings', type: 'Rankings' },
    { platform: 'WhatsApp', url: 'https://saboarena.com/tournaments', type: 'Tournaments' },
    { platform: 'Telegram', url: 'https://saboarena.com', type: 'Homepage' }
  ];
  
  fallbackUrls.forEach((item, i) => {
    console.log(`${i+1}. ${item.platform}: ${item.url} (${item.type})`);
  });
  console.log('');
}

console.log('🎨 OPEN GRAPH & TWITTER CARDS TEST:');
console.log('─'.repeat(40));

const metaTagsTest = [
  { tool: 'Facebook Debugger', url: 'https://developers.facebook.com/tools/debug/', action: 'Paste saboarena.com URL' },
  { tool: 'Twitter Card Validator', url: 'https://cards-dev.twitter.com/validator', action: 'Test Twitter preview' },
  { tool: 'LinkedIn Post Inspector', url: 'https://www.linkedin.com/post-inspector/', action: 'Check LinkedIn sharing' },
  { tool: 'WhatsApp Link Preview', url: 'Manual test', action: 'Send link in WhatsApp chat' }
];

metaTagsTest.forEach((test, i) => {
  console.log(`${i+1}. ${test.tool}`);
  console.log(`   🔗 ${test.url}`);
  console.log(`   ✅ ${test.action}`);
  console.log('');
});

console.log('📊 EXPECTED SOCIAL SEO BENEFITS:');
console.log('─'.repeat(40));

const socialBenefits = [
  { benefit: 'Brand Awareness', impact: '+300% mentions', timeline: '2 weeks' },
  { benefit: 'Backlink Generation', impact: '+50 social backlinks', timeline: '1 month' },
  { benefit: 'Direct Traffic', impact: '+1000 visitors', timeline: '1 week' },
  { benefit: 'Local SEO Boost', impact: 'Higher Vietnam rankings', timeline: '2 weeks' },
  { benefit: 'User Engagement', impact: '+200% session duration', timeline: '1 week' }
];

socialBenefits.forEach((benefit, i) => {
  console.log(`${i+1}. ${benefit.benefit}`);
  console.log(`   📈 Impact: ${benefit.impact}`);
  console.log(`   ⏰ Timeline: ${benefit.timeline}`);
  console.log('');
});

console.log('🎯 SOCIAL MEDIA ACTION PLAN:');
console.log('─'.repeat(40));

const actionPlan = [
  { time: '⚡ NOW', action: 'Share homepage on Facebook', expected: 'Test Open Graph tags' },
  { time: '⚡ +5 MIN', action: 'Tweet top player profile', expected: 'Twitter Cards verification' },
  { time: '⚡ +10 MIN', action: 'LinkedIn post about rankings', expected: 'Professional network reach' },
  { time: '⚡ +15 MIN', action: 'WhatsApp group sharing', expected: 'Viral potential test' },
  { time: '⚡ +20 MIN', action: 'Telegram channel post', expected: 'Tech community engagement' }
];

actionPlan.forEach((plan, i) => {
  console.log(`${i+1}. ${plan.time}: ${plan.action}`);
  console.log(`   🎯 Expected: ${plan.expected}`);
  console.log('');
});

console.log('🔥 VIRAL CONTENT IDEAS:');
console.log('─'.repeat(40));

const viralIdeas = [
  { content: 'Screenshot bảng xếp hạng ELO', virality: 'HIGH', reason: 'Competition drives engagement' },
  { content: 'Trận đấu kịch tính với tỷ số sát nút', virality: 'HIGH', reason: 'Sports drama attracts viewers' },
  { content: 'Profile cơ thủ với ELO cao nhất', virality: 'MEDIUM', reason: 'People love success stories' },
  { content: 'Thông báo giải đấu mới', virality: 'MEDIUM', reason: 'Event announcements get shares' },
  { content: 'Statistics và insights từ platform', virality: 'LOW', reason: 'Data posts for niche audience' }
];

viralIdeas.forEach((idea, i) => {
  console.log(`${i+1}. ${idea.content} (${idea.virality})`);
  console.log(`   💡 Why: ${idea.reason}`);
  console.log('');
});

console.log('📱 QUICK TEST CHECKLIST:');
console.log('='.repeat(30));
console.log('□ Copy saboarena.com và paste vào Facebook status');
console.log('□ Check if thumbnail và title hiển thị đúng');
console.log('□ Tweet link với hashtags #BiAVietNam #SaboArena');
console.log('□ Share trong WhatsApp group để test preview');
console.log('□ Post trên LinkedIn với professional tone');
console.log('□ Monitor social media traffic trong Analytics');
console.log('');
console.log('💎 GOAL: Generate 2000+ social media visitors this week! 🎯');