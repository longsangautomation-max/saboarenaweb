import { createClient } from '@supabase/supabase-js';

const url = "https://mogjjvscxjwvhtpkrlqr.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ";

const supabase = createClient(url, anonKey);

console.log("=== TESTING WEB QUERY (ANON KEY) ===\n");

const { data: matches, error } = await supabase
  .from("matches")
  .select(`
    id,
    match_number,
    round_number,
    bracket_type,
    bracket_group,
    player1_id,
    player2_id,
    player1:users!player1_id(
      id,
      display_name,
      username,
      full_name
    ),
    player2:users!player2_id(
      id,
      display_name,
      username,
      full_name
    )
  `)
  .eq("tournament_id", "bda71012-21b2-437a-9550-7424fee93834")
  .eq("bracket_group", "A")
  .eq("bracket_type", "WB")
  .eq("round_number", 1)
  .order("match_number")
  .limit(3);

if (error) {
  console.error('❌ ERROR:', error);
  process.exit(1);
}

console.log(`✅ Found ${matches.length} matches\n`);

for (const m of matches) {
  console.log(`Match ${m.match_number}:`);
  console.log(`  Player1 ID: ${m.player1_id}`);
  console.log(`  Player1 Object:`, m.player1);
  console.log(`  Player2 ID: ${m.player2_id}`);
  console.log(`  Player2 Object:`, m.player2);
  console.log();
}
