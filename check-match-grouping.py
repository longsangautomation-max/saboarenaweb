from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("VITE_SUPABASE_URL")
key = os.getenv("VITE_SUPABASE_ANON_KEY")
supabase = create_client(url, key)

tournament_id = "bda71012-21b2-437a-9550-7424fee93834"

# Lấy sample WB matches để xem có field nào phân biệt groups
response = supabase.table("matches").select("*").eq("tournament_id", tournament_id).eq("bracket_type", "WB").limit(10).execute()

print("\n🔍 Sample WB matches để tìm field phân biệt groups:")
print("=" * 60)

for idx, m in enumerate(response.data[:5], 1):
    print(f"\nMatch #{idx}:")
    print(f"  match_number: {m.get('match_number')}")
    print(f"  round_number: {m.get('round_number')}")
    print(f"  bracket_type: {m.get('bracket_type')}")
    print(f"  group_id: {m.get('group_id')}")
    print(f"  pool_id: {m.get('pool_id')}")
    print(f"  table_number: {m.get('table_number')}")
    
    # Xem player IDs để tìm pattern
    p1_id = m.get('player1_id', '')
    p2_id = m.get('player2_id', '')
    if p1_id:
        print(f"  player1_id: {p1_id[:8]}...")
    if p2_id:
        print(f"  player2_id: {p2_id[:8]}...")

# Kiểm tra xem có thể suy ra group từ match_number không
print(f"\n\n📊 Phân tích match_number của WB:")
wb_matches = response.data
match_numbers = sorted([m.get('match_number') for m in wb_matches if m.get('match_number')])
print(f"Match numbers (first 10): {match_numbers}")
print(f"\n💡 Nếu DE64 có 4 bảng, mỗi bảng 16 người:")
print(f"  - Bảng A: match 1-15")
print(f"  - Bảng B: match 16-30")
print(f"  - Bảng C: match 31-45")
print(f"  - Bảng D: match 46-60")
