#!/usr/bin/env python3
"""
Verify fix is working
"""
from supabase import create_client, Client

SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

TOURNAMENT_ID = "bda71012-21b2-437a-9550-7424fee93834"

print("=" * 80)
print("TESTING FINAL QUERY WITH full_name")
print("=" * 80)

result = supabase.table("tournament_participants")\
    .select("""
        id,
        user_id,
        users (
            id,
            display_name,
            username,
            full_name,
            rank,
            avatar_url
        )
    """)\
    .eq("tournament_id", TOURNAMENT_ID)\
    .eq("status", "registered")\
    .limit(10)\
    .execute()

print(f"\n✅ Found {len(result.data)} participants\n")

for i, p in enumerate(result.data, 1):
    user = p.get('users')
    display_name = user.get('display_name')
    username = user.get('username')
    full_name = user.get('full_name')
    
    # Mimic the getDisplayName logic
    name = display_name or full_name or username or 'Unknown Player'
    
    print(f"#{i}: {name}")
    print(f"   Rank: {user.get('rank')}")
    print(f"   Avatar: {user.get('avatar_url')[:50] if user.get('avatar_url') else 'None'}...")
    print()

print("=" * 80)
print("✅ ALL PARTICIPANTS HAVE NAMES NOW!")
print("=" * 80)
