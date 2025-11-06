/**
 * AI News Content Analyzer
 * Phân tích database để quyết định nên viết tin tức gì
 */

import { supabase } from '@/integrations/supabase/client';
import { generateNews, publishNews, NEWS_TEMPLATES } from './ai-news-generator';

interface TournamentStats {
  completed_today: any[];
  upcoming_high_prize: any[];
  ongoing_count: number;
}

interface PlayerStats {
  new_champions: any[];
  ranking_changes: any[];
  top_performers: any[];
}

interface MatchStats {
  exciting_matches: any[];
  total_today: number;
}

/**
 * Phân tích giải đấu
 */
export async function analyzeTournaments(): Promise<TournamentStats> {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Giải đấu kết thúc hôm qua/hôm nay
  const { data: completedToday } = await supabase
    .from('tournaments')
    .select(`
      *,
      participants:tournament_participants(count)
    `)
    .eq('status', 'completed')
    .gte('end_date', yesterday.toISOString())
    .lte('end_date', today.toISOString())
    .order('prize_pool', { ascending: false })
    .limit(5);
  
  // Giải đấu sắp diễn ra với giải thưởng cao
  const { data: upcomingHighPrize } = await supabase
    .from('tournaments')
    .select('*')
    .eq('status', 'upcoming')
    .gte('start_date', today.toISOString())
    .order('prize_pool', { ascending: false })
    .limit(3);
  
  // Đếm giải đang diễn ra
  const { count: ongoingCount } = await supabase
    .from('tournaments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'ongoing');
  
  return {
    completed_today: completedToday || [],
    upcoming_high_prize: upcomingHighPrize || [],
    ongoing_count: ongoingCount || 0
  };
}

/**
 * Phân tích cơ thủ
 */
export async function analyzePlayers(): Promise<PlayerStats> {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  // Top 10 cơ thủ hiện tại
  const { data: topPerformers } = await supabase
    .from('users')
    .select('*')
    .order('spa_points', { ascending: false })
    .limit(10);
  
  // TODO: Phân tích thay đổi ranking (cần bảng history)
  // TODO: Tìm nhà vô địch mới (từ tournaments)
  
  return {
    new_champions: [],
    ranking_changes: [],
    top_performers: topPerformers || []
  };
}

/**
 * Phân tích trận đấu
 */
export async function analyzeMatches(): Promise<MatchStats> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Trận đấu hôm nay
  const { data: todayMatches, count } = await supabase
    .from('matches')
    .select(`
      *,
      player1:users!matches_player1_id_fkey(display_name, avatar_url),
      player2:users!matches_player2_id_fkey(display_name, avatar_url)
    `, { count: 'exact' })
    .eq('status', 'completed')
    .gte('created_at', today.toISOString())
    .order('created_at', { ascending: false })
    .limit(20);
  
  // Tìm trận đấu kịch tính (tỷ số sát nút)
  const excitingMatches = (todayMatches || []).filter(match => {
    if (!match.player1_score || !match.player2_score) return false;
    const diff = Math.abs(match.player1_score - match.player2_score);
    return diff <= 2 && (match.player1_score >= 8 || match.player2_score >= 8);
  });
  
  return {
    exciting_matches: excitingMatches,
    total_today: count || 0
  };
}

/**
 * Quyết định nên viết tin tức gì dựa trên data
 */
export async function decideNewsToGenerate(): Promise<Array<{
  template: keyof typeof NEWS_TEMPLATES;
  data: Record<string, unknown>;
  priority: number;
}>> {
  const newsQueue: Array<{
    template: keyof typeof NEWS_TEMPLATES;
    data: Record<string, unknown>;
    priority: number;
  }> = [];
  
  console.log('🔍 Analyzing database for news opportunities...');
  
  // Phân tích tournaments
  const tournamentStats = await analyzeTournaments();
  
  // 1. Giải đấu vừa kết thúc - Priority cao nhất
  if (tournamentStats.completed_today.length > 0) {
    const tournament = tournamentStats.completed_today[0];
    
    newsQueue.push({
      template: 'TOURNAMENT_COMPLETED',
      data: {
        tournament_name: tournament.name,
        winner_name: 'Đang cập nhật', // TODO: Get from results
        total_players: tournament.participants?.[0]?.count || 0,
        prize_pool: `${tournament.prize_pool?.toLocaleString('vi-VN')} VNĐ`,
        date_range: `${new Date(tournament.start_date).toLocaleDateString('vi-VN')} - ${new Date(tournament.end_date).toLocaleDateString('vi-VN')}`
      },
      priority: 100
    });
  }
  
  // 2. Giải đấu sắp diễn ra với giải thưởng cao
  if (tournamentStats.upcoming_high_prize.length > 0) {
    const tournament = tournamentStats.upcoming_high_prize[0];
    
    if (tournament.prize_pool && tournament.prize_pool >= 10000000) { // >= 10 triệu
      newsQueue.push({
        template: 'UPCOMING_HIGH_PRIZE',
        data: {
          tournament_name: tournament.name,
          prize_pool: `${tournament.prize_pool.toLocaleString('vi-VN')} VNĐ`,
          start_date: new Date(tournament.start_date).toLocaleDateString('vi-VN'),
          venue: tournament.location || 'SABO Arena',
          max_participants: tournament.max_participants || 128
        },
        priority: 90
      });
    }
  }
  
  // 3. Phân tích players
  const playerStats = await analyzePlayers();
  
  if (playerStats.top_performers.length >= 5) {
    const top5 = playerStats.top_performers.slice(0, 5);
    
    newsQueue.push({
      template: 'RANKING_SHAKE_UP',
      data: {
        top_5_players: top5.map((p, i) => 
          `${i + 1}. ${p.display_name} - ${p.spa_points || 0} SPA`
        ).join('\n'),
        biggest_mover: top5[0].display_name,
        spa_changes: 'Đang cập nhật'
      },
      priority: 70
    });
  }
  
  // 4. Phân tích matches
  const matchStats = await analyzeMatches();
  
  if (matchStats.exciting_matches.length > 0) {
    const match = matchStats.exciting_matches[0];
    
    newsQueue.push({
      template: 'MATCH_HIGHLIGHT',
      data: {
        player1_name: match.player1?.display_name || 'Player 1',
        player1_score: match.player1_score,
        player2_name: match.player2?.display_name || 'Player 2',
        player2_score: match.player2_score,
        tournament_name: 'SABO Arena',
        match_highlights: 'Trận đấu kịch tính với tỷ số sát nút'
      },
      priority: 60
    });
  }
  
  // 5. Thống kê tuần (Priority thấp, chỉ tạo nếu không có tin quan trọng)
  if (newsQueue.length === 0) {
    newsQueue.push({
      template: 'WEEKLY_STATS',
      data: {
        total_matches: matchStats.total_today,
        most_active: 'Đang phân tích',
        highest_winrate: 'Đang phân tích',
        most_active_club: 'Đang phân tích'
      },
      priority: 50
    });
  }
  
  // Sort by priority
  newsQueue.sort((a, b) => b.priority - a.priority);
  
  console.log(`📊 Found ${newsQueue.length} news opportunities`);
  
  return newsQueue;
}

/**
 * Chạy auto-generation hàng ngày
 */
export async function runDailyNewsGeneration(): Promise<void> {
  console.log('🤖 Starting daily AI news generation...');
  console.log(`📅 Date: ${new Date().toLocaleDateString('vi-VN')}`);
  
  try {
    // Quyết định tin tức cần viết
    const newsQueue = await decideNewsToGenerate();
    
    if (newsQueue.length === 0) {
      console.log('ℹ️ No significant events to report today');
      return;
    }
    
    // Tạo tin tức (tối đa 3 bài/ngày)
    const newsToGenerate = newsQueue.slice(0, 3);
    
    for (const newsItem of newsToGenerate) {
      console.log(`\n📝 Generating: ${newsItem.template}`);
      console.log(`   Priority: ${newsItem.priority}`);
      
      try {
        const generatedNews = await generateNews({
          template: newsItem.template,
          data: newsItem.data,
          generateEnglish: true // Tạo cả tiếng Anh
        });
        
        const newsId = await publishNews(generatedNews);
        
        console.log(`✅ Published: ${generatedNews.title}`);
        console.log(`   ID: ${newsId}`);
        console.log(`   Slug: ${generatedNews.slug}`);
        
        // Delay 5s giữa các bài để tránh rate limit OpenAI
        await new Promise(resolve => setTimeout(resolve, 5000));
        
      } catch (error) {
        console.error(`❌ Failed to generate ${newsItem.template}:`, error);
      }
    }
    
    console.log('\n🎉 Daily news generation completed!');
    
  } catch (error) {
    console.error('❌ Daily news generation failed:', error);
    throw error;
  }
}

/**
 * Test function - Tạo 1 bài mẫu
 */
export async function testNewsGeneration(): Promise<void> {
  console.log('🧪 Testing AI news generation...');
  
  try {
    const testNews = await generateNews({
      template: 'UPCOMING_HIGH_PRIZE',
      data: {
        tournament_name: 'Giải Vô Địch SABO Arena 2024',
        prize_pool: '100.000.000 VNĐ',
        start_date: '15/12/2024',
        venue: 'SABO Arena - Quận 1, TP.HCM',
        max_participants: 128
      },
      generateEnglish: true
    });
    
    console.log('\n📄 Generated News:');
    console.log('Title (VI):', testNews.title);
    console.log('Title (EN):', testNews.title_en);
    console.log('Slug:', testNews.slug);
    console.log('Category:', testNews.category);
    console.log('Featured:', testNews.is_featured);
    console.log('\nContent Preview:');
    console.log(testNews.content.substring(0, 300) + '...');
    
    // Publish
    console.log('\n💾 Saving to database...');
    const newsId = await publishNews(testNews);
    console.log('\n✅ Published with ID:', newsId);
    console.log('🌐 View at: /news-detail/' + testNews.slug);
    
  } catch (error: any) {
    console.error('\n❌ Test failed:', error);
    console.error('Error message:', error.message);
    console.error('Error details:', error);
    throw error;
  }
}
