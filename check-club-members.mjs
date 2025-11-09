import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mogjjvscxjwvhtpkrlqr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ'
);

// Get club members with user info
const { data, error } = await supabase
  .from('club_members')
  .select(`
    id,
    user_id,
    club_id,
    role,
    joined_at,
    users (
      id,
      username,
      full_name,
      display_name,
      avatar_url,
      rank
    )
  `)
  .limit(10);

if (error) {
  console.error('Error:', error);
} else {
  console.log('Club Members Data:');
  console.log(JSON.stringify(data, null, 2));
  console.log('\n--- Summary ---');
  for (const [idx, member] of data.entries()) {
    console.log(`\n${idx + 1}. User ID: ${member.user_id}`);
    console.log(`   Role: ${member.role}`);
    if (member.users) {
      console.log(`   Username: ${member.users.username || 'N/A'}`);
      console.log(`   Full Name: ${member.users.full_name || 'N/A'}`);
      console.log(`   Display Name: ${member.users.display_name || 'N/A'}`);
      console.log(`   Avatar URL: ${member.users.avatar_url || 'N/A'}`);
      console.log(`   Rank: ${member.users.rank || 'N/A'}`);
    } else {
      console.log('   ⚠️ No user data found!');
    }
  }
}
