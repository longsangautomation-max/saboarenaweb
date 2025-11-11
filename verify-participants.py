#!/usr/bin/env python3
"""
Test with correct status
"""
from supabase import create_client, Client

SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

TOURNAMENT_ID = "bda71012-21b2-437a-9550-7424fee93834"

print("=" * 80)
print(f"TESTING WITH STATUS = 'registered'")
print("=" * 80)

result = supabase.table("tournament_participants")\
    .select("""
        id,
        user_id,
        status,
        users (
            id,
            display_name,
            username,
            rank
        )
    """)\
    .eq("tournament_id", TOURNAMENT_ID)\
    .eq("status", "registered")\
    .limit(5)\
    .execute()

print(f"\n✅ Found {len(result.data)} participants")

for i, p in enumerate(result.data, 1):
    user = p.get('users')
    print(f"\n#{i}: {user.get('display_name') or user.get('username') or 'Unknown'}")
    print(f"   Rank: {user.get('rank')}")
    print(f"   Status: {p.get('status')}")

print("\n" + "=" * 80)
