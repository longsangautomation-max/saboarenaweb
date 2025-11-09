/**
 * Test script to verify bracket data from Supabase
 * Run with: node test-bracket-data.mjs
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testBracketData() {
  console.log('🔍 Testing Bracket Data Connection...\n');
  
  try {
    // 1. Get all tournaments
    console.log('1️⃣ Fetching tournaments...');
    const { data: tournaments, error: tournamentsError } = await supabase
      .from('tournaments')
      .select('id, title, status, max_participants, current_participants, start_date')
      .order('start_date', { ascending: false })
      .limit(10);
    
    if (tournamentsError) {
      console.error('❌ Error fetching tournaments:', tournamentsError);
      return;
    }
    
    console.log(`✅ Found ${tournaments.length} tournaments\n`);
    
    if (tournaments.length === 0) {
      console.log('⚠️ No tournaments found in database');
      return;
    }
    
    // Display tournaments
    console.log('📋 Available Tournaments:');
    tournaments.forEach((t, idx) => {
      console.log(`   ${idx + 1}. ${t.title} (${t.status})`);
      console.log(`      ID: ${t.id}`);
      console.log(`      Participants: ${t.current_participants}/${t.max_participants}`);
      console.log(`      Date: ${new Date(t.start_date).toLocaleDateString()}\n`);
    });
    
    // 2. Test with first tournament
    const testTournament = tournaments[0];
    console.log(`\n2️⃣ Testing bracket data for: "${testTournament.title}"`);
    console.log(`   Tournament ID: ${testTournament.id}\n`);
    
    // 3. Fetch matches
    console.log('3️⃣ Fetching matches...');
    const { data: matches, error: matchesError } = await supabase
      .from('matches')
      .select(`
        id,
        tournament_id,
        round_number,
        match_number,
        bracket_type,
        bracket_group,
        player1_id,
        player2_id,
        player1_score,
        player2_score,
        winner_id,
        status,
        created_at
      `)
      .eq('tournament_id', testTournament.id)
      .order('round_number', { ascending: true })
      .order('match_number', { ascending: true });
    
    if (matchesError) {
      console.error('❌ Error fetching matches:', matchesError);
      return;
    }
    
    console.log(`✅ Found ${matches.length} matches\n`);
    
    if (matches.length === 0) {
      console.log('⚠️ No matches found for this tournament');
      console.log('💡 You may need to generate bracket first using mobile app or admin tools\n');
      return;
    }
    
    // 4. Analyze match structure
    console.log('4️⃣ Analyzing match structure...');
    
    const rounds = {};
    matches.forEach(match => {
      const round = match.round_number;
      if (!rounds[round]) {
        rounds[round] = [];
      }
      rounds[round].push(match);
    });
    
    console.log(`\n   Rounds breakdown:`);
    Object.keys(rounds).sort((a, b) => a - b).forEach(roundNum => {
      const roundMatches = rounds[roundNum];
      const completed = roundMatches.filter(m => m.status === 'completed').length;
      console.log(`   Round ${roundNum}: ${roundMatches.length} matches (${completed} completed)`);
    });
    
    // 5. Check for missing fields
    console.log('\n5️⃣ Checking database schema...');
    const firstMatch = matches[0];
    console.log('   Available fields:', Object.keys(firstMatch).join(', '));
    
    // Check bracket_group distribution
    console.log('\n6️⃣ Checking bracket_group distribution...');
    const groupCounts = {};
    for (const match of matches) {
      const group = match.bracket_group || 'null';
      groupCounts[group] = (groupCounts[group] || 0) + 1;
    }
    console.log('   Group distribution:');
    for (const [group, count] of Object.entries(groupCounts)) {
      console.log(`   - ${group}: ${count} matches`);
    }
    
    // Check bracket_type distribution
    console.log('\n7️⃣ Checking bracket_type distribution...');
    const typeCounts = {};
    for (const match of matches) {
      const type = match.bracket_type || 'null';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    }
    console.log('   Type distribution:');
    for (const [type, count] of Object.entries(typeCounts)) {
      console.log(`   - ${type}: ${count} matches`);
    }
    
    const missingFields = [];
    if (!('bracket_type' in firstMatch)) missingFields.push('bracket_type');
    if (!('bracket_group' in firstMatch)) missingFields.push('bracket_group');
    if (!('loser_id' in firstMatch)) missingFields.push('loser_id');
    if (!('bracket_position' in firstMatch)) missingFields.push('bracket_position');
    
    if (missingFields.length > 0) {
      console.log('\n   ⚠️ Missing fields:', missingFields.join(', '));
      console.log('   💡 These fields will be inferred by the bracket component');
    } else {
      console.log('\n   ✅ All required fields present');
    }
    
    // 6. Sample match data
    console.log('\n6️⃣ Sample match data:');
    const sampleMatch = matches[0];
    console.log('   ', JSON.stringify(sampleMatch, null, 2));
    
    // 7. Check player data
    console.log('\n7️⃣ Testing player data fetch...');
    const { data: matchWithPlayers, error: playerError } = await supabase
      .from('matches')
      .select(`
        id,
        player1:users!player1_id(id, display_name, username),
        player2:users!player2_id(id, display_name, username)
      `)
      .eq('tournament_id', testTournament.id)
      .limit(1)
      .single();
    
    if (playerError) {
      console.log('   ⚠️ Error fetching player data:', playerError.message);
    } else {
      console.log('   ✅ Player data fetch successful');
      console.log('   Player 1:', matchWithPlayers.player1?.display_name || matchWithPlayers.player1?.username || 'TBD');
      console.log('   Player 2:', matchWithPlayers.player2?.display_name || matchWithPlayers.player2?.username || 'TBD');
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Connection: OK`);
    console.log(`✅ Tournaments: ${tournaments.length} found`);
    console.log(`✅ Matches: ${matches.length} found`);
    console.log(`✅ Rounds: ${Object.keys(rounds).length} rounds`);
    console.log(`✅ Ready for bracket visualization: ${matches.length > 0 ? 'YES' : 'NO'}`);
    console.log('='.repeat(60));
    
    console.log('\n🎯 Next steps:');
    console.log('   1. Open web app: http://localhost:5173');
    console.log(`   2. Navigate to tournament: /tournaments/${testTournament.id}`);
    console.log('   3. Click on "Bracket" tab to see visualization\n');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testBracketData();
