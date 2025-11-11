#!/usr/bin/env python3
"""
Check matches table schema from Supabase
"""
import os
from supabase import create_client, Client

# Supabase credentials
SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ"

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("=" * 80)
print("CHECKING MATCHES TABLE SCHEMA")
print("=" * 80)

# Get a sample match to see all columns
response = supabase.table("matches").select("*").limit(1).execute()

if response.data and len(response.data) > 0:
    match = response.data[0]
    print("\n✅ Sample Match Data:")
    print("-" * 80)
    for key, value in match.items():
        print(f"  {key:25} = {value}")
    
    print("\n" + "=" * 80)
    print("AVAILABLE COLUMNS:")
    print("=" * 80)
    for key in match.keys():
        print(f"  ✓ {key}")
else:
    print("\n⚠️  No matches found in database")
    print("Let's check tournament_registrations instead...")
    
    # Check tournament_registrations
    reg_response = supabase.table("tournament_registrations").select("*").limit(1).execute()
    if reg_response.data and len(reg_response.data) > 0:
        print("\n✅ Sample Tournament Registration:")
        print("-" * 80)
        for key, value in reg_response.data[0].items():
            print(f"  {key:25} = {value}")

print("\n" + "=" * 80)
print("CHECKING PARTICIPANTS")
print("=" * 80)

# Get tournament_registrations with user details
try:
    participants = supabase.table("tournament_registrations")\
        .select("*, users(*)")\
        .eq("status", "approved")\
        .limit(3)\
        .execute()
    
    if participants.data:
        print(f"\n✅ Found {len(participants.data)} approved participants")
        for p in participants.data:
            print(f"\n  User: {p.get('users', {}).get('display_name', 'N/A')}")
            print(f"  Tournament ID: {p.get('tournament_id', 'N/A')}")
            print(f"  Status: {p.get('status', 'N/A')}")
    else:
        print("\n⚠️  No approved participants found")
except Exception as e:
    print(f"\n❌ Error fetching participants: {e}")

print("\n" + "=" * 80)
