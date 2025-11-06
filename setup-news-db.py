#!/usr/bin/env python3
"""
SABO Arena - Auto Setup News Database
Automatically creates news table and inserts sample data into Supabase
"""

import os
import requests
import json
from pathlib import Path

# Supabase configuration
SUPABASE_URL = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo"
# Using Transaction Pooler - aws-1 (port 6543) for DDL operations
DB_URL = "postgresql://postgres.mogjjvscxjwvhtpkrlqr:Acookingoil123@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"

def print_header():
    print("=" * 60)
    print("  SABO ARENA - Auto Setup News Database")
    print("=" * 60)
    print()

def print_step(step, message):
    print(f"[{step}] {message}")

def print_success(message):
    print(f"      ✓ {message}")

def print_info(message):
    print(f"      ℹ {message}")

def check_existing_table():
    """Check if news table already exists"""
    print_step("1/4", "Checking existing database...")
    
    headers = {
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
    }
    
    try:
        response = requests.get(
            f"{SUPABASE_URL}/rest/v1/news?select=id&limit=1",
            headers=headers
        )
        
        if response.status_code == 200:
            print_success("News table already exists!")
            
            # Get count
            count_response = requests.get(
                f"{SUPABASE_URL}/rest/v1/news?select=count",
                headers={**headers, "Prefer": "count=exact"}
            )
            
            if count_response.status_code == 200:
                count = count_response.headers.get('Content-Range', '').split('/')[-1]
                print_info(f"Found {count} articles in database")
            
            print()
            print("=" * 60)
            print("  ✓ Database is already set up!")
            print("=" * 60)
            print()
            print("You can now test:")
            print("  • Open http://localhost:8082")
            print("  • Scroll to 'Tin Tức Mới Nhất'")
            print("  • Click any article")
            print()
            return True
            
        return False
        
    except Exception as e:
        print_info(f"Table not found: {str(e)}")
        return False

def run_sql_via_psql():
    """Run SQL using psycopg2"""
    print_step("2/4", "Installing required packages...")
    
    os.system("pip install psycopg2-binary --quiet")
    print_success("Packages installed")
    
    print_step("3/4", "Connecting to PostgreSQL...")
    
    try:
        import psycopg2
        
        # Read SQL file
        sql_file = Path("supabase_news_schema.sql")
        if not sql_file.exists():
            print(f"      ✗ Error: {sql_file} not found!")
            return False
        
        sql_content = sql_file.read_text(encoding='utf-8')
        print_success("SQL file loaded")
        
        # Connect to database
        conn = psycopg2.connect(DB_URL)
        cursor = conn.cursor()
        print_success("Connected to database")
        
        print_step("4/4", "Executing SQL commands...")
        
        # Execute SQL
        cursor.execute(sql_content)
        conn.commit()
        
        print_success("News table created")
        print_success("Indexes created")
        print_success("Triggers configured")
        print_success("RLS policies applied")
        print_success("Sample data inserted (3 articles)")
        
        # Close connection
        cursor.close()
        conn.close()
        
        print()
        print("=" * 60)
        print("  ✓ Database setup completed successfully!")
        print("=" * 60)
        print()
        print("Next steps:")
        print("  1. Open http://localhost:8082")
        print("  2. Scroll to 'Tin Tức Mới Nhất' section")
        print("  3. Click any article to see the detail page")
        print()
        
        return True
        
    except Exception as e:
        print(f"      ✗ Error: {str(e)}")
        print()
        print("=" * 60)
        print("  ⚠ Alternative Setup Method")
        print("=" * 60)
        print()
        print("Please run SQL manually:")
        print("1. Open: https://supabase.com/dashboard/project/mogjjvscxjwvhtpkrlqr/sql")
        print("2. Click 'New Query'")
        print("3. Copy content from: supabase_news_schema.sql")
        print("4. Paste and click 'Run'")
        print()
        return False

def main():
    print_header()
    
    # Check if table exists
    if check_existing_table():
        return
    
    # Run SQL
    run_sql_via_psql()

if __name__ == "__main__":
    main()
