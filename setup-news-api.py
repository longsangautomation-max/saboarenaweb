#!/usr/bin/env python3
"""
SABO Arena - Create News Table via Supabase REST API
Uses Management API to execute SQL
"""

import requests
import json

# Supabase configuration
PROJECT_ID = "mogjjvscxjwvhtpkrlqr"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo"
SUPABASE_URL = f"https://{PROJECT_ID}.supabase.co"

print("=" * 70)
print("  SABO ARENA - Setup News Database")
print("=" * 70)
print()

# Check existing table
print("[1/3] Checking database...")
headers = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
}

response = requests.get(
    f"{SUPABASE_URL}/rest/v1/news?select=id&limit=1",
    headers=headers
)

if response.status_code == 200:
    print("      ✓ News table already exists!")
    print()
    print("=" * 70)
    print("  Database is ready! Open http://localhost:8082 to test")
    print("=" * 70)
else:
    print("      ℹ News table not found")
    print()
    print("=" * 70)
    print("  Manual Setup Required")
    print("=" * 70)
    print()
    print("Supabase không cho phép chạy SQL qua API.")
    print("Vui lòng thực hiện thủ công:")
    print()
    print("1. Mở trình duyệt tại:")
    print(f"   https://supabase.com/dashboard/project/{PROJECT_ID}/sql/new")
    print()
    print("2. Copy nội dung file: supabase_news_schema.sql")
    print()
    print("3. Paste vào SQL Editor và click 'Run'")
    print()
    print("4. Quay lại http://localhost:8082 để kiểm tra")
    print()
    
    # Open browser
    import webbrowser
    print("[2/3] Opening SQL Editor in browser...")
    webbrowser.open(f"https://supabase.com/dashboard/project/{PROJECT_ID}/sql/new")
    print("      ✓ Browser opened")
    print()
    
    # Show SQL file path
    print("[3/3] SQL file location:")
    import os
    sql_path = os.path.abspath("supabase_news_schema.sql")
    print(f"      {sql_path}")
    print()
    print("=" * 70)
