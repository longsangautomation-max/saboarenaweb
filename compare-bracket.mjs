import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mogjjvscxjwvhtpkrlqr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ'
);

console.log('🔍 COMPARING BRACKET ADVANCEMENT LOGIC\n');

const { data: matches } = await supabase
  .from('matches')
  .select('*')
  .eq('tournament_id', 'bda71012-21b2-437a-9550-7424fee93834')
  .eq('bracket_group', 'A')
  .order('bracket_type')
  .order('round_number')
  .order('match_number');

console.log(`✅ Loaded ${matches.length} matches from Group A\n`);

// Focus on specific examples from screenshot
console.log('=== EXAMPLE 1: Match 11 (WB Round 2) ===');
const m11 = matches.find(m => m.match_number === 11);
if (m11) {
  console.log(`Match ${m11.match_number}: ${m11.bracket_type} Round ${m11.round_number}`);
  console.log(`Players should come from:`);
  
  // WB R2 Match 11: Should get winners from WB R1
  // Match 11 is 2nd match in R2, so gets from R1 matches 3 & 4
  const wbR1 = matches.filter(m => m.bracket_type === 'WB' && m.round_number === 1);
  wbR1.sort((a, b) => a.match_number - b.match_number);
  console.log(`  WB R1 matches (sorted):`, wbR1.map(m => `M${m.match_number}`).join(', '));
  
  // Match 11 should be 2nd in WB R2
  const wbR2 = matches.filter(m => m.bracket_type === 'WB' && m.round_number === 2);
  wbR2.sort((a, b) => a.match_number - b.match_number);
  const match11Idx = wbR2.findIndex(m => m.match_number === 11);
  console.log(`  Match 11 position in R2: ${match11Idx} (0-indexed)`);
  console.log(`  → Should get from R1 index ${match11Idx * 2} and ${match11Idx * 2 + 1}`);
  console.log(`  → That's M${wbR1[match11Idx * 2]?.match_number} and M${wbR1[match11Idx * 2 + 1]?.match_number}`);
}

console.log('\n=== EXAMPLE 2: Match 15 (LB-A Round 101) ===');
const m15 = matches.find(m => m.match_number === 15);
if (m15) {
  console.log(`Match ${m15.match_number}: ${m15.bracket_type} Round ${m15.round_number}`);
  
  // Check if this is LB-A R1 or later
  if (m15.round_number === 101 || m15.round_number === 1) {
    console.log(`This is LB-A R1 - gets losers from WB R1`);
    const wbR1 = matches.filter(m => m.bracket_type === 'WB' && m.round_number === 1);
    wbR1.sort((a, b) => a.match_number - b.match_number);
    
    const lbAR1 = matches.filter(m => m.bracket_type === 'LB-A' && m.round_number === m15.round_number);
    lbAR1.sort((a, b) => a.match_number - b.match_number);
    const match15Idx = lbAR1.findIndex(m => m.match_number === 15);
    console.log(`  Match 15 position in LB-A R1: ${match15Idx}`);
    console.log(`  → Should get LOSERS from WB R1 index ${match15Idx * 2} and ${match15Idx * 2 + 1}`);
    console.log(`  → That's L-M${wbR1[match15Idx * 2]?.match_number} and L-M${wbR1[match15Idx * 2 + 1]?.match_number}`);
  }
}

console.log('\n=== ALL WB MATCHES ===');
const wb = matches.filter(m => m.bracket_type === 'WB');
wb.forEach(m => {
  console.log(`M${m.match_number}: Round ${m.round_number}, Player1: ${m.player1_id ? 'has player' : 'TBD'}, Player2: ${m.player2_id ? 'has player' : 'TBD'}`);
});

console.log('\n=== ALL LB-A MATCHES ===');
const lbA = matches.filter(m => m.bracket_type === 'LB-A');
lbA.forEach(m => {
  console.log(`M${m.match_number}: Round ${m.round_number}, Player1: ${m.player1_id ? 'has player' : 'TBD'}, Player2: ${m.player2_id ? 'has player' : 'TBD'}`);
});
