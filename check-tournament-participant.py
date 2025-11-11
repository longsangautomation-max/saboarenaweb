#!/usr/bin/env python3
"""
Check tournament_participant table
"""
from supabase import create_client, Client

SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("=" * 80)
print("CHECKING tournament_participants TABLE")
print("=" * 80)

try:
    # Check tournament_participants (plural)
    result = supabase.table("tournament_participants").select("*").limit(1).execute()
    
    if result.data and len(result.data) > 0:
        print("\n✅ tournament_participant table exists!")
        print("-" * 80)
        print("Sample data:")
        for key, value in result.data[0].items():
            print(f"  {key:25} = {value}")
        
        print("\n" + "=" * 80)
        print("AVAILABLE COLUMNS:")
        print("=" * 80)
        for key in result.data[0].keys():
            print(f"  ✓ {key}")
        
        # Get with user join
        print("\n" + "=" * 80)
        print("TESTING JOIN WITH USERS:")
        print("=" * 80)
        
        participants = supabase.table("tournament_participants")\
            .select("*, users(*)")\
            .limit(5)\
            .execute()
        
        if participants.data:
            print(f"\n✅ Found {len(participants.data)} participants with user data:")
            for p in participants.data:
                user = p.get('users', {})
                print(f"\n  Tournament: {p.get('tournament_id', 'N/A')[:8]}...")
                print(f"  User: {user.get('display_name') or user.get('username') or 'N/A'}")
                print(f"  Rank: {user.get('rank', 'N/A')}")
                print(f"  Status: {p.get('status', 'N/A')}")
                
    else:
        print("\n⚠️  tournament_participant table is empty")
        
except Exception as e:
    print(f"\n❌ Error: {e}")

print("\n" + "=" * 80)
