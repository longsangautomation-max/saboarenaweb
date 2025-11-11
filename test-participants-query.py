#!/usr/bin/env python3
"""
Test exact query for tournament participants
"""
from supabase import create_client, Client

SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Use the actual tournament ID from the screenshot URL
TOURNAMENT_ID = "bda71012-21b2-437a-9550-7424fee93834"

print("=" * 80)
print(f"TESTING PARTICIPANTS FOR TOURNAMENT: {TOURNAMENT_ID}")
print("=" * 80)

# Test the exact query from the hook
print("\n1. Query tournament_participants with users join...")
try:
    result = supabase.table("tournament_participants")\
        .select("""
            id,
            user_id,
            status,
            registered_at,
            seed_number,
            users (
                id,
                display_name,
                username,
                avatar_url,
                rank,
                elo_rating,
                total_wins,
                total_losses,
                tournament_wins
            )
        """)\
        .eq("tournament_id", TOURNAMENT_ID)\
        .in_("status", ["confirmed", "checked_in"])\
        .execute()
    
    print(f"\n✅ Query successful!")
    print(f"📊 Found {len(result.data)} participants")
    
    if result.data:
        print("\n" + "=" * 80)
        print("PARTICIPANT DETAILS:")
        print("=" * 80)
        for i, p in enumerate(result.data, 1):
            print(f"\n#{i}:")
            print(f"  Participant ID: {p.get('id')}")
            print(f"  User ID: {p.get('user_id')}")
            print(f"  Status: {p.get('status')}")
            print(f"  Seed: {p.get('seed_number')}")
            
            user = p.get('users')
            if user:
                print(f"  User Data:")
                print(f"    - Display Name: {user.get('display_name')}")
                print(f"    - Username: {user.get('username')}")
                print(f"    - Rank: {user.get('rank')}")
                print(f"    - ELO: {user.get('elo_rating')}")
            else:
                print(f"  ⚠️  No user data!")
    else:
        print("\n⚠️  No participants found with status 'confirmed' or 'checked_in'")
        
        # Try without status filter
        print("\n2. Trying without status filter...")
        result2 = supabase.table("tournament_participants")\
            .select("*")\
            .eq("tournament_id", TOURNAMENT_ID)\
            .execute()
        
        print(f"📊 Total participants (all statuses): {len(result2.data)}")
        if result2.data:
            statuses = set(p.get('status') for p in result2.data)
            print(f"   Available statuses: {statuses}")
            
except Exception as e:
    print(f"\n❌ Error: {e}")

print("\n" + "=" * 80)
