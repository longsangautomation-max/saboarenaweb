#!/usr/bin/env python3
"""
Check participants/registrations tables
"""
from supabase import create_client, Client

SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("=" * 80)
print("CHECKING TOURNAMENT PARTICIPANTS")
print("=" * 80)

# Check tournament_results table
print("\n1. Checking tournament_results table...")
try:
    results = supabase.table("tournament_results").select("*").limit(1).execute()
    if results.data:
        print("\n✅ tournament_results exists!")
        print("-" * 80)
        for key, value in results.data[0].items():
            print(f"  {key:25} = {value}")
        
        print("\n📋 Available columns:")
        for key in results.data[0].keys():
            print(f"  ✓ {key}")
except Exception as e:
    print(f"❌ Error: {e}")

# Try to get participants from matches
print("\n" + "=" * 80)
print("2. Getting participants from MATCHES table...")
print("=" * 80)

try:
    # Get unique players from matches for a tournament
    matches = supabase.table("matches")\
        .select("tournament_id, player1_id, player2_id")\
        .limit(10)\
        .execute()
    
    if matches.data:
        print(f"\n✅ Found {len(matches.data)} matches")
        
        # Extract unique player IDs
        player_ids = set()
        tournament_ids = set()
        for match in matches.data:
            tournament_ids.add(match.get('tournament_id'))
            if match.get('player1_id'):
                player_ids.add(match.get('player1_id'))
            if match.get('player2_id'):
                player_ids.add(match.get('player2_id'))
        
        print(f"📊 Tournaments: {len(tournament_ids)}")
        print(f"👥 Unique players: {len(player_ids)}")
        
        # Get user details for these players
        if player_ids:
            users = supabase.table("users")\
                .select("id, display_name, username, avatar_url, rank")\
                .in_("id", list(player_ids))\
                .limit(5)\
                .execute()
            
            if users.data:
                print(f"\n✅ Sample participants:")
                for user in users.data:
                    print(f"  - {user.get('display_name') or user.get('username')}")
except Exception as e:
    print(f"❌ Error: {e}")

print("\n" + "=" * 80)
