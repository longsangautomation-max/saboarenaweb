from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("VITE_SUPABASE_URL")
key = os.getenv("VITE_SUPABASE_ANON_KEY")
supabase = create_client(url, key)

tournament_id = "bda71012-21b2-437a-9550-7424fee93834"

# Query matches to check bracket types
response = supabase.table("matches").select("""
    id,
    match_number,
    round_number,
    bracket_type,
    is_final,
    is_third_place,
    status
""").eq("tournament_id", tournament_id).execute()

print(f"\n✅ Total matches: {len(response.data)}")

# Count by bracket type
wb_count = len([m for m in response.data if m.get("bracket_type") and "WB" in m["bracket_type"]])
lb_count = len([m for m in response.data if m.get("bracket_type") and "LB" in m["bracket_type"]])
finals_count = len([m for m in response.data if m.get("is_final") or m.get("is_third_place")])

print(f"\n📊 Bracket distribution:")
print(f"  - Winner Bracket (WB): {wb_count} matches")
print(f"  - Loser Bracket (LB): {lb_count} matches")
print(f"  - Finals: {finals_count} matches")

# Show finals details
finals = [m for m in response.data if m.get("is_final") or m.get("is_third_place")]
if finals:
    print(f"\n🏆 Finals matches:")
    for f in finals:
        match_type = "Grand Final" if f.get("is_final") else "3rd Place"
        print(f"  - Match #{f.get('match_number')}: {match_type} ({f.get('bracket_type')}, Round {f.get('round_number')})")
else:
    print("\n⚠️  No finals matches found (is_final or is_third_place)")

# Show sample bracket types
print(f"\n🔍 Sample bracket types:")
bracket_types = set(m.get("bracket_type") for m in response.data if m.get("bracket_type"))
for bt in sorted(bracket_types):
    count = len([m for m in response.data if m.get("bracket_type") == bt])
    print(f"  - {bt}: {count} matches")
