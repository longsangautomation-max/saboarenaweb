import { createContext, useContext, useState, ReactNode } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  vi: {
    // Navigation
    "nav.home": "TRANG CHỦ",
    "nav.tournaments": "GIẢI ĐẤU",
    "nav.rankings": "BXH",
    "nav.players": "CƠ THỦ",
    "nav.clubs": "CÂU LẠC BỘ",
    "nav.news": "TIN TỨC",
    "nav.download": "TẢI ỨNG DỤNG",

    // Hero Section
    "hero.championship": "Giải Đấu",
    "hero.title1": "ĐẲNG CẤP",
    "hero.title2": "CHUYÊN NGHIỆP",
    "hero.title3": "CHỜ BẠN!",
    "hero.description": "Tham gia nền tảng giải đấu bi-a đẳng cấp. Thi đấu với những tay cơ xuất sắc, tham gia các giải đấu uy tín và nâng cao kỹ năng của bạn.",
    "hero.joinTournament": "THAM GIA GIẢI ĐẤU",
    "hero.viewRankings": "XEM BẢNG XẾP HẠNG",
    "hero.activePlayers": "Người Chơi",
    "hero.tournaments": "Giải Đấu",
    "hero.prizePool": "Giải Thưởng",
    "hero.scrollExplore": "Cuộn để khám phá",

    // Hero Cards
    "hero.upcomingTournament": "Giải Đấu Sắp Diễn Ra",
    "hero.proLeagueFinals": "Chung Kết Pro League 2024",
    "hero.tournamentDesc": "Đăng ký đóng trong 5 ngày. 64 người chơi tranh tài giải thưởng 50,000 USD.",
    "hero.joinNow": "ĐĂNG KÝ NGAY",
    "hero.highlights": "Điểm Nổi Bật",
    "hero.topShots": "Những Cú Đánh Đỉnh Cao Tuần Này",
    "hero.topShotsDesc": "Xem những pha bóng đỉnh cao nhất từ giải đấu tuần này.",
    "hero.latestNews": "Tin Mới Nhất",
    "hero.championshipRules": "Công Bố Quy Định Giải Đấu Mới",
    "hero.rulesDesc": "Ban tổ chức giải đấu giới thiệu hệ thống tính điểm cập nhật cho mùa giải 2024.",
    "hero.readMore": "ĐỌC THÊM",

    // Featured Players
    "players.breadcrumb": "SABO ARENA",
    "players.topPlayers": "CƠ THỦ HÀNG ĐẦU",
    "players.reigningChampion": "Nhà Vô Địch Đương Nhiệm",
    "players.championDesc": "Nhà vô địch bất bại với hơn 500 chiến thắng giải đấu. Nổi tiếng với những cú đánh chính xác và chiến thuật bậc thầy. Hiện đang giữ kỷ lục thế giới về số trận thắng liên tiếp.",
    "players.tournamentWins": "Chiến Thắng",
    "players.winRate": "Tỷ Lệ Thắng",
    "players.championships": "Chức Vô Địch",
    "players.viewProfile": "Xem Hồ Sơ Đầy Đủ →",
    "players.watchHighlights": "Xem Điểm Nổi Bật →",
    "players.topRanked": "XẾP HẠNG",
    "players.topRankedFull": "CƠ THỦ",
    "players.eliteAthletes": "Gặp gỡ những cơ thủ xuất sắc thống trị đấu trường giải đấu",
    "players.professionalPlayer": "Cơ Thủ Chuyên Nghiệp",
    "players.tournaments": "Giải Đấu",
  },
  en: {
    // Navigation
    "nav.home": "HOME",
    "nav.tournaments": "TOURNAMENTS",
    "nav.rankings": "RANKINGS",
    "nav.players": "PLAYERS",
    "nav.clubs": "CLUBS",
    "nav.news": "NEWS",
    "nav.download": "DOWNLOAD APP",

    // Hero Section
    "hero.championship": "Championship",
    "hero.title1": "LEVEL PLAY",
    "hero.title2": "AWAITS",
    "hero.title3": "YOU!",
    "hero.description": "Join the ultimate billiard championship platform. Compete with elite players, participate in prestigious tournaments, and master your game.",
    "hero.joinTournament": "JOIN TOURNAMENT",
    "hero.viewRankings": "VIEW RANKINGS",
    "hero.activePlayers": "Active Players",
    "hero.tournaments": "Tournaments",
    "hero.prizePool": "Prize Pool",
    "hero.scrollExplore": "Scroll to explore",

    // Hero Cards
    "hero.upcomingTournament": "Upcoming Tournament",
    "hero.proLeagueFinals": "Pro League Finals 2024",
    "hero.tournamentDesc": "Registration closes in 5 days. 64 players competing for $50,000 grand prize.",
    "hero.joinNow": "JOIN NOW",
    "hero.highlights": "Highlights",
    "hero.topShots": "Top Shots of the Week",
    "hero.topShotsDesc": "Watch the most incredible plays from this week's tournaments.",
    "hero.latestNews": "Latest News",
    "hero.championshipRules": "New Championship Rules Announced",
    "hero.rulesDesc": "Tournament committee introduces updated scoring system for 2024 season.",
    "hero.readMore": "READ MORE",

    // Featured Players
    "players.breadcrumb": "SABO ARENA",
    "players.topPlayers": "TOP PLAYERS",
    "players.reigningChampion": "Reigning Champion",
    "players.championDesc": "Undefeated champion with 500+ tournament wins. Known for precision shots and strategic mastery. Currently holding the world record for consecutive wins.",
    "players.tournamentWins": "Tournament Wins",
    "players.winRate": "Win Rate",
    "players.championships": "Championships",
    "players.viewProfile": "View Full Profile →",
    "players.watchHighlights": "Watch Highlights →",
    "players.topRanked": "TOP RANKED",
    "players.topRankedFull": "PLAYERS",
    "players.eliteAthletes": "Meet the elite athletes dominating the championship circuit",
    "players.professionalPlayer": "Professional Player",
    "players.tournaments": "Tournaments",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("vi"); // Vietnamese as default

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.vi] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
