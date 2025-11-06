#!/usr/bin/env python3
"""
Fix RLS Policy for AI News Generation
Chạy script này để cho phép AI insert news vào database
"""

import os
from supabase import create_client, Client

# Config
SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo"

print("🔧 Fixing RLS Policy for AI News Generation...")
print("=" * 60)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# SQL để fix RLS
sql_commands = [
    """
    DROP POLICY IF EXISTS "Authenticated users can insert news" ON public.news;
    """,
    """
    CREATE POLICY "Anyone can insert news" 
    ON public.news 
    FOR INSERT 
    TO public 
    WITH CHECK (true);
    """
]

try:
    for i, sql in enumerate(sql_commands, 1):
        print(f"\n{i}. Executing SQL...")
        result = supabase.rpc('exec_sql', {'query': sql}).execute()
        print(f"   ✅ Done")
    
    print("\n" + "=" * 60)
    print("✅ RLS POLICY FIXED!")
    print("=" * 60)
    print("\nNow you can run: node test-ai-news-flow.mjs")
    
except Exception as e:
    print(f"\n❌ Failed: {e}")
    print("\n⚠️  You need to run SQL manually in Supabase Dashboard:")
    print("\n1. Go to: https://supabase.com/dashboard/project/mogjjvscxjwvhtpkrlqr/sql")
    print("2. Run this SQL:")
    print("\n" + "-" * 60)
    for sql in sql_commands:
        print(sql)
    print("-" * 60)
