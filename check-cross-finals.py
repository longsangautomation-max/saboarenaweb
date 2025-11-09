from supabase import create_client

supabase = create_client(
    'https://mogjjvscxjwvhtpkrlqr.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ'
)

result = supabase.table('matches').select(
    'id, match_number, round_number, bracket_group, bracket_type'
).eq('tournament_id', 'bda71012-21b2-437a-9550-7424fee93834').order('match_number').execute()

cross = [m for m in result.data if m.get('bracket_group') not in ['A', 'B', 'C', 'D']]

print(f'\n=== CROSS FINALS MATCHES ({len(cross)}) ===')
for m in cross:
    print(f"M{m['match_number']}: Round {m['round_number']}, Group={m.get('bracket_group')}, Type={m.get('bracket_type')}")

# Count by round
rounds = {}
for m in cross:
    r = m['round_number']
    rounds[r] = rounds.get(r, 0) + 1

print(f'\n=== BY ROUND ===')
for r in sorted(rounds.keys()):
    print(f"Round {r}: {rounds[r]} matches")
