import os
from supabase import create_client

# Supabase credentials
url = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ"

supabase = create_client(url, key)

print("=== QUERYING SABO DE64 MATCHES ===\n")

# Query matches with advancement fields
response = supabase.table('matches').select('match_number, round_number, bracket_type, bracket_group, player1_id, player2_id, winner_advances_to, loser_advances_to').eq('tournament_id', 'bda71012-21b2-437a-9550-7424fee93834').eq('bracket_group', 'A').order('bracket_type').order('round_number').order('match_number').execute()

matches = response.data
print(f"Found {len(matches)} matches in Group A\n")

# Group by bracket type
wb = [m for m in matches if m['bracket_type'] == 'WB']
lbA = [m for m in matches if m['bracket_type'] == 'LB-A']
lbB = [m for m in matches if m['bracket_type'] == 'LB-B']

print(f"=== WINNER BRACKET (WB): {len(wb)} matches ===")
for m in wb:
    p1 = m.get('player1_id') or 'TBD'
    p2 = m.get('player2_id') or 'TBD'
    print(f"Match {m['match_number']:2d} | Round {m['round_number']} | Has P1: {bool(p1 != 'TBD')} | Has P2: {bool(p2 != 'TBD')} | Winner→{m['winner_advances_to']} | Loser→{m['loser_advances_to']}")

print(f"\n=== LOSER BRACKET A (LB-A): {len(lbA)} matches ===")
for m in lbA:
    p1 = m.get('player1_id') or 'TBD'
    p2 = m.get('player2_id') or 'TBD'
    print(f"Match {m['match_number']:2d} | Round {m['round_number']} | Has P1: {bool(p1 != 'TBD')} | Has P2: {bool(p2 != 'TBD')} | Winner→{m['winner_advances_to']} | Loser→{m['loser_advances_to']}")

print(f"\n=== LOSER BRACKET B (LB-B): {len(lbB)} matches ===")
for m in lbB:
    p1 = m.get('player1_id') or 'TBD'
    p2 = m.get('player2_id') or 'TBD'
    print(f"Match {m['match_number']:2d} | Round {m['round_number']} | Has P1: {bool(p1 != 'TBD')} | Has P2: {bool(p2 != 'TBD')} | Winner→{m['winner_advances_to']} | Loser→{m['loser_advances_to']}")

# Analyze round structure
print("\n=== ROUND STRUCTURE ===")
wb_rounds = sorted(set(m['round_number'] for m in wb))
lbA_rounds = sorted(set(m['round_number'] for m in lbA))
lbB_rounds = sorted(set(m['round_number'] for m in lbB))

print(f"WB Rounds: {wb_rounds}")
print(f"LB-A Rounds: {lbA_rounds}")
print(f"LB-B Rounds: {lbB_rounds}")

# Count by round
print("\n=== MATCHES PER ROUND ===")
print("WB:")
for r in wb_rounds:
    count = len([m for m in wb if m['round_number'] == r])
    print(f"  Round {r}: {count} matches")
    
print("LB-A:")
for r in lbA_rounds:
    count = len([m for m in lbA if m['round_number'] == r])
    print(f"  Round {r}: {count} matches")
    
print("LB-B:")
for r in lbB_rounds:
    count = len([m for m in lbB if m['round_number'] == r])
    print(f"  Round {r}: {count} matches")
