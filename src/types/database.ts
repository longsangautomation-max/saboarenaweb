export interface Player {
  id: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
  rank: string | null;
  ranking_points: number;
  total_wins: number;
  total_losses: number;
  total_tournaments: number;
  tournament_wins: number;
  elo_rating: number;
}

export interface RankSystem {
  id: string;
  rank_code: string;
  rank_name: string;
  rank_name_vi: string;
  elo_min: number;
  elo_max: number;
  color_hex: string;
}

export interface Tournament {
  id: string;
  title: string;
  status: string;
  start_date: string;
  end_date: string | null;
  max_participants: number;
  current_participants: number;
  prize_pool: number | null;
  entry_fee: number | null;
  game_format: string | null;
  venue_address: string | null;
  club_id: string | null;
  club?: Club;
}

export interface Club {
  id: string;
  name: string;
  logo_url: string | null;
  cover_image_url: string | null;
  address: string | null;
  phone: string | null;
  rating: number | null;
  total_tables: number | null;
}
