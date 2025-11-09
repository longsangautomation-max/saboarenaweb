import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mogjjvscxjwvhtpkrlqr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ'
);

const { data } = await supabase
  .from('matches')
  .select('match_number, round_number, bracket_type, winner_advances_to, loser_advances_to')
  .eq('tournament_id', 'bda71012-21b2-437a-9550-7424fee93834')
  .eq('bracket_group', 'A')
  .order('bracket_type')
  .order('round_number')
  .order('match_number');

console.log('=== GROUP A ADVANCEMENT MAP ===\n');

data.forEach(m => {
  console.log(`Match ${m.match_number} [${m.bracket_type}] Round ${m.round_number}`);
  console.log(`  Winner → ${m.winner_advances_to || 'END'}`);
  console.log(`  Loser  → ${m.loser_advances_to || 'END'}`);
  console.log('');
});

// Show Match 15 specifically
console.log('\n=== MATCH 15 DETAILS ===');
const m15 = data.find(m => m.match_number === 15);
if (m15) {
  console.log(`Match 15: ${m15.bracket_type} Round ${m15.round_number}`);
  console.log(`  Winner → ${m15.winner_advances_to}`);
  console.log(`  Loser  → ${m15.loser_advances_to}`);
  
  // Find which matches feed INTO Match 15
  console.log('\n  Fed by:');
  data.forEach(m => {
    if (m.winner_advances_to === 15) {
      console.log(`    - Winner of Match ${m.match_number} [${m.bracket_type}]`);
    }
    if (m.loser_advances_to === 15) {
      console.log(`    - Loser of Match ${m.match_number} [${m.bracket_type}]`);
    }
  });
}
