import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mogjjvscxjwvhtpkrlqr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ'
);

console.log('=== QUERYING MATCHES FOR SABO DE64 ===\n');

const { data: matches, error } = await supabase
  .from('matches')
  .select('match_number, round_number, bracket_type, bracket_group, player1_id, player2_id, player1_name, player2_name')
  .eq('tournament_id', 'bda71012-21b2-437a-9550-7424fee93834')
  .eq('bracket_group', 'A')
  .order('bracket_type')
  .order('round_number')
  .order('match_number');

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log(`Found ${matches.length} matches in Group A\n`);

// Group by bracket type
const wb = matches.filter(m => m.bracket_type === 'WB');
const lbA = matches.filter(m => m.bracket_type === 'LB-A');
const lbB = matches.filter(m => m.bracket_type === 'LB-B');

console.log('=== WINNER BRACKET (WB) ===');
console.log(`Total: ${wb.length} matches\n`);
for (const m of wb) {
  const p1 = m.player1_name || m.player1_id || 'TBD';
  const p2 = m.player2_name || m.player2_id || 'TBD';
  console.log(`Match ${m.match_number} | Round ${m.round_number} | ${p1} vs ${p2}`);
}

console.log('\n=== LOSER BRACKET A (LB-A) ===');
console.log(`Total: ${lbA.length} matches\n`);
for (const m of lbA) {
  const p1 = m.player1_name || m.player1_id || 'TBD';
  const p2 = m.player2_name || m.player2_id || 'TBD';
  console.log(`Match ${m.match_number} | Round ${m.round_number} | ${p1} vs ${p2}`);
}

console.log('\n=== LOSER BRACKET B (LB-B) ===');
console.log(`Total: ${lbB.length} matches\n`);
for (const m of lbB) {
  const p1 = m.player1_name || m.player1_id || 'TBD';
  const p2 = m.player2_name || m.player2_id || 'TBD';
  console.log(`Match ${m.match_number} | Round ${m.round_number} | ${p1} vs ${p2}`);
}

// Analyze round structure
console.log('\n=== ROUND STRUCTURE ANALYSIS ===');
console.log('WB Rounds:', [...new Set(wb.map(m => m.round_number))].sort());
console.log('LB-A Rounds:', [...new Set(lbA.map(m => m.round_number))].sort());
console.log('LB-B Rounds:', [...new Set(lbB.map(m => m.round_number))].sort());
