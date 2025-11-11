#!/usr/bin/env python3
"""
Debug user join issue
"""
from supabase import create_client, Client

SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

TOURNAMENT_ID = "bda71012-21b2-437a-9550-7424fee93834"

print("=" * 80)
print("DEBUGGING USER JOIN")
print("=" * 80)

# Get one participant to check structure
print("\n1. Get raw participant data...")
p1 = supabase.table("tournament_participants")\
    .select("*")\
    .eq("tournament_id", TOURNAMENT_ID)\
    .limit(1)\
    .execute()

if p1.data:
    print("\n✅ Raw participant:")
    for key, value in p1.data[0].items():
        print(f"  {key:25} = {value}")
    
    user_id = p1.data[0].get('user_id')
    print(f"\n2. Checking user with ID: {user_id}")
    
    # Get user directly
    user = supabase.table("users")\
        .select("*")\
        .eq("id", user_id)\
        .limit(1)\
        .execute()
    
    if user.data:
        print("\n✅ User exists in users table:")
        for key, value in user.data[0].items():
            print(f"  {key:25} = {value}")
    else:
        print("\n❌ User NOT found in users table!")
        print("   This means user_id in tournament_participants doesn't match users table")

print("\n" + "=" * 80)
print("3. Testing different join syntaxes...")
print("=" * 80)

# Try different join syntax
print("\n3a. Using users(*) syntax:")
try:
    result = supabase.table("tournament_participants")\
        .select("id, user_id, users(*)")\
        .eq("tournament_id", TOURNAMENT_ID)\
        .limit(1)\
        .execute()
    
    print(f"✅ Success! Data: {result.data}")
except Exception as e:
    print(f"❌ Error: {e}")

# Try using user_id as foreign key
print("\n3b. Using users!user_id(*) syntax:")
try:
    result = supabase.table("tournament_participants")\
        .select("id, user_id, users!user_id(*)")\
        .eq("tournament_id", TOURNAMENT_ID)\
        .limit(1)\
        .execute()
    
    print(f"✅ Success! Data: {result.data}")
except Exception as e:
    print(f"❌ Error: {e}")

# Try with inner join
print("\n3c. Using inner join with users!inner syntax:")
try:
    result = supabase.table("tournament_participants")\
        .select("id, user_id, users!inner(*)")\
        .eq("tournament_id", TOURNAMENT_ID)\
        .limit(1)\
        .execute()
    
    print(f"✅ Success! Data: {result.data}")
except Exception as e:
    print(f"❌ Error: {e}")

print("\n" + "=" * 80)
