import { createClient } from '@supabase/supabase-js';

const url = "https://mogjjvscxjwvhtpkrlqr.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ";

const supabase = createClient(url, key);

console.log("=== CHECKING ROUND 1 MATCHES ===\n");

const { data: matches, error } = await supabase
  .from('matches')
  .select(`
    match_number,
    round_number,
    bracket_type,
    player1_id,
    player2_id,
    users_player1:player1_id(username, full_name),
    users_player2:player2_id(username, full_name)
  `)
  .eq('tournament_id', 'bda71012-21b2-437a-9550-7424fee93834')
  .eq('bracket_group', 'A')
  .eq('bracket_type', 'WB')
  .eq('round_number', 1)
  .order('match_number');

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log(`Found ${matches.length} matches in WB Round 1\n`);

matches.forEach(m => {
  const p1 = m.users_player1 
    ? (m.users_player1.full_name || m.users_player1.username)
    : 'NULL';
  const p2 = m.users_player2
    ? (m.users_player2.full_name || m.users_player2.username)
    : 'NULL';
  
  console.log(`Match ${m.match_number}:`);
  console.log(`  Player 1 ID: ${m.player1_id} → ${p1}`);
  console.log(`  Player 2 ID: ${m.player2_id} → ${p2}`);
  console.log();
});
