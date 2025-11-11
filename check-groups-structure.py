from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("VITE_SUPABASE_URL")
key = os.getenv("VITE_SUPABASE_ANON_KEY")
supabase = create_client(url, key)

tournament_id = "bda71012-21b2-437a-9550-7424fee93834"

# Query để xem group_id và bracket_type
response = supabase.table("matches").select("bracket_type, group_id").eq("tournament_id", tournament_id).execute()

# Tạo set các combination
combinations = set()
for m in response.data:
    bt = m.get("bracket_type")
    gid = m.get("group_id")
    if bt:
        combinations.add((bt, gid))

# In ra theo groups
print("\n📋 Cấu trúc bảng đấu:")
print("=" * 50)

groups = {}
for bt, gid in sorted(combinations):
    if gid not in groups:
        groups[gid] = []
    groups[gid].append(bt)

for gid in sorted(groups.keys(), key=lambda x: str(x) if x else ""):
    bracket_types = sorted(groups[gid])
    print(f"\n{'🔵' if gid else '🏆'} Group {gid if gid else 'None'}:")
    for bt in bracket_types:
        count = len([m for m in response.data if m.get("bracket_type") == bt and m.get("group_id") == gid])
        print(f"  - {bt}: {count} matches")

# Tổng kết
print(f"\n📊 Tổng số matches: {len(response.data)}")
print(f"📊 Số groups: {len([g for g in groups.keys() if g])}")
