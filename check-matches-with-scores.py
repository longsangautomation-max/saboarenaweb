from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("VITE_SUPABASE_URL")
key = os.getenv("VITE_SUPABASE_ANON_KEY")
supabase = create_client(url, key)

tournament_id = "bda71012-21b2-437a-9550-7424fee93834"

# Query matches với full data
response = supabase.table("matches").select("""
    id,
    match_number,
    round_number,
    bracket_type,
    status,
    player1_score,
    player2_score,
    player1_id,
    player2_id,
    winner_id,
    player1:users!player1_id(
        id,
        display_name,
        username,
        full_name,
        avatar_url
    ),
    player2:users!player2_id(
        id,
        display_name,
        username,
        full_name,
        avatar_url
    ),
    winner:users!winner_id(
        id,
        display_name,
        username,
        full_name,
        avatar_url
    )
""").eq("tournament_id", tournament_id).limit(10).execute()

print(f"\n✅ Total matches found: {len(response.data)}")
print("\n🔍 First 10 matches with details:\n")

for idx, match in enumerate(response.data, 1):
    player1_name = "TBD"
    player2_name = "TBD"
    winner_name = "None"
    
    if match.get("player1"):
        p1 = match["player1"]
        player1_name = p1.get("full_name") or p1.get("display_name") or p1.get("username") or "TBD"
    
    if match.get("player2"):
        p2 = match["player2"]
        player2_name = p2.get("full_name") or p2.get("display_name") or p2.get("username") or "TBD"
    
    if match.get("winner"):
        w = match["winner"]
        winner_name = w.get("full_name") or w.get("display_name") or w.get("username") or "None"
    
    print(f"Match #{match.get('match_number', 'N/A')} - Round {match.get('round_number', 'N/A')}")
    print(f"  Type: {match.get('bracket_type', 'N/A')}")
    print(f"  Status: {match.get('status', 'N/A')}")
    print(f"  Player 1: {player1_name} (Score: {match.get('player1_score', 'N/A')})")
    print(f"  Player 2: {player2_name} (Score: {match.get('player2_score', 'N/A')})")
    print(f"  Winner: {winner_name}")
    print(f"  Has avatars: P1={bool(match.get('player1', {}).get('avatar_url'))}, P2={bool(match.get('player2', {}).get('avatar_url'))}")
    print()
