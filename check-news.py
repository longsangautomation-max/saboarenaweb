#!/usr/bin/env python3
"""Check news articles in database"""

import requests
import json

SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo"

headers = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
}

print("🔍 Checking news articles in database...\n")

response = requests.get(
    f"{SUPABASE_URL}/rest/v1/news?select=*&order=created_at.desc&limit=10",
    headers=headers
)

if response.status_code == 200:
    news = response.json()
    print(f"✅ Found {len(news)} news articles:\n")
    
    for i, article in enumerate(news, 1):
        print(f"{i}. {article['title']}")
        print(f"   Created: {article['created_at']}")
        print(f"   Status: {article['status']}")
        print(f"   Published: {article.get('published_at', 'Not published')}")
        print(f"   Slug: /news/{article['slug']}")
        print(f"   Views: {article.get('views', 0)}")
        print(f"   Featured: {article.get('is_featured', False)}")
        print()
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)
