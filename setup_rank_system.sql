-- SABO Arena Rank System Setup
-- Tạo rank system data cho database

-- Insert rank definitions vào rank_system table
INSERT INTO rank_system (rank_code, rank_name, rank_name_vi, elo_min, elo_max, rank_color, rank_order, created_at) VALUES

-- King Ranks (Elite)
('K+', 'Grand Master', 'Đại Cao Thủ', 1800, 9999, '#FFD700', 1, NOW()),
('K', 'King', 'Vua', 1600, 1799, '#FFA500', 2, NOW()),

-- High Skill Ranks  
('I+', 'Master', 'Cao Thủ', 1400, 1599, '#C0C0C0', 3, NOW()),
('I', 'Expert', 'Chuyên Gia', 1200, 1399, '#CD7F32', 4, NOW()),

-- Intermediate Ranks
('H+', 'Advanced', 'Thành Thạo', 1000, 1199, '#4169E1', 5, NOW()),
('H', 'Skilled', 'Có Kỹ Năng', 800, 999, '#32CD32', 6, NOW()),

-- Learning Ranks
('M+', 'Improving', 'Đang Tiến Bộ', 600, 799, '#FFB6C1', 7, NOW()),
('M', 'Developing', 'Phát Triển', 400, 599, '#DDA0DD', 8, NOW()),

-- Beginner Ranks
('L+', 'Learner', 'Người Học', 200, 399, '#F0E68C', 9, NOW()),
('L', 'Novice', 'Tân Binh', 100, 199, '#98FB98', 10, NOW()),
('B', 'Beginner', 'Mới Bắt Đầu', 0, 99, '#D3D3D3', 11, NOW());

-- Update existing players to have proper ranks based on ELO
UPDATE users SET 
  rank = CASE 
    WHEN elo_rating >= 1800 THEN 'K+'
    WHEN elo_rating >= 1600 THEN 'K' 
    WHEN elo_rating >= 1400 THEN 'I+'
    WHEN elo_rating >= 1200 THEN 'I'
    WHEN elo_rating >= 1000 THEN 'H+'
    WHEN elo_rating >= 800 THEN 'H'
    WHEN elo_rating >= 600 THEN 'M+'
    WHEN elo_rating >= 400 THEN 'M'
    WHEN elo_rating >= 200 THEN 'L+'
    WHEN elo_rating >= 100 THEN 'L'
    ELSE 'B'
  END
WHERE role = 'player' AND elo_rating IS NOT NULL;

-- Create function to auto-update rank when ELO changes
CREATE OR REPLACE FUNCTION update_player_rank()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.elo_rating IS NOT NULL AND NEW.role = 'player' THEN
    NEW.rank = CASE 
      WHEN NEW.elo_rating >= 1800 THEN 'K+'
      WHEN NEW.elo_rating >= 1600 THEN 'K'
      WHEN NEW.elo_rating >= 1400 THEN 'I+'
      WHEN NEW.elo_rating >= 1200 THEN 'I'
      WHEN NEW.elo_rating >= 1000 THEN 'H+'
      WHEN NEW.elo_rating >= 800 THEN 'H'
      WHEN NEW.elo_rating >= 600 THEN 'M+'
      WHEN NEW.elo_rating >= 400 THEN 'M'
      WHEN NEW.elo_rating >= 200 THEN 'L+'
      WHEN NEW.elo_rating >= 100 THEN 'L'
      ELSE 'B'
    END;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update ranks
DROP TRIGGER IF EXISTS trigger_update_player_rank ON users;
CREATE TRIGGER trigger_update_player_rank
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_player_rank();

-- Verify the setup
SELECT 'Rank system setup completed!' as status;