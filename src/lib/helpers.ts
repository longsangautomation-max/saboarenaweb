import type { RankSystem } from "@/types/database";

export const calculateWinRate = (wins: number, losses: number): number => {
  const total = wins + losses;
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

export const getRankColor = (rank: string | null, rankSystem?: RankSystem[]): string => {
  if (!rank || !rankSystem) return '#FFD700';
  const rankData = rankSystem.find(r => r.rank_code === rank);
  return rankData?.color_hex || '#FFD700';
};

export const getDisplayName = (displayName: string | null, username: string | null): string => {
  return displayName || username || 'Unknown Player';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
};
