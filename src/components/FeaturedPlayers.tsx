import { motion } from "framer-motion";
import PlayerCard from "./PlayerCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTopPlayers } from "@/hooks/useTopPlayers";
import { useRankSystem } from "@/hooks/useRankSystem";
import { calculateWinRate, getDisplayName, getRankColor } from "@/lib/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import featuredPlayer from "@/assets/featured-player-1.jpg";

const FeaturedPlayers = () => {
  const { t } = useLanguage();
  const { data: players, isLoading, error } = useTopPlayers(10);
  const { data: rankSystem } = useRankSystem();

  if (isLoading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-96 w-full mb-16 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-96 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !players || players.length === 0) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-lg">
            {t("players.noPlayers") || "No players found"}
          </p>
        </div>
      </section>
    );
  }

  const featuredPlayer = players[0];
  const featuredPlayerWinRate = calculateWinRate(featuredPlayer.total_wins, featuredPlayer.total_losses);
  const featuredPlayerName = getDisplayName(featuredPlayer.display_name, featuredPlayer.username);
  const featuredPlayerColor = getRankColor(featuredPlayer.rank, rankSystem);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, hsl(36 100% 50%) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <span className="text-gold font-bold">{t("players.breadcrumb")}</span>
          <span>\</span>
          <span>{t("players.topPlayers")}</span>
        </motion.div>

        {/* Featured Player Spotlight */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
              {/* Player Image */}
              <div className="relative aspect-square lg:aspect-auto">
                <img
                  src={featuredPlayer.avatar_url || "/placeholder.svg"}
                  alt={`${featuredPlayerName} - ${t("players.reigningChampion")}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50" />
              </div>

              {/* Player Info */}
              <div className="flex flex-col justify-center p-8 lg:p-12 bg-card/50 backdrop-blur-sm">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-sm font-bold text-gold tracking-widest uppercase">
                      {t("players.reigningChampion")}
                    </p>
                    {featuredPlayer.rank && (
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-black uppercase"
                        style={{ 
                          backgroundColor: featuredPlayerColor + '20',
                          color: featuredPlayerColor,
                          border: `2px solid ${featuredPlayerColor}`
                        }}
                      >
                        {t("common.language") === "vi" 
                          ? rankSystem?.find(r => r.rank_code === featuredPlayer.rank)?.rank_name_vi || featuredPlayer.rank
                          : featuredPlayer.rank
                        }
                      </span>
                    )}
                  </div>
                  <div className="flex items-end gap-4 mb-4">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black">
                      {featuredPlayerName}
                    </h2>
                  </div>
                  <div className="inline-block">
                    <div className="text-8xl md:text-9xl font-black text-gold opacity-20">
                      #1
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t("players.championDesc")}
                </p>

                <div className="grid grid-cols-3 gap-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-3xl font-black text-gold">{featuredPlayer.tournament_wins || 0}</p>
                    <p className="text-sm text-muted-foreground">{t("players.tournamentWins")}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gold">{featuredPlayerWinRate}%</p>
                    <p className="text-sm text-muted-foreground">{t("players.winRate")}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gold">{featuredPlayer.total_tournaments}</p>
                    <p className="text-sm text-muted-foreground">{t("players.championships")}</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button 
                    className="text-sm font-bold text-gold hover:underline uppercase tracking-wider"
                    onClick={() => {
                      // Navigate to player profile page
                      alert(`View profile for ${featuredPlayer?.display_name || 'Player'} - This would navigate to a detailed player profile page.`);
                    }}
                  >
                    {t("players.viewProfile")}
                  </button>
                  <button 
                    className="text-sm font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
                    onClick={() => {
                      // Navigate to player highlights
                      alert(`Watch highlights for ${featuredPlayer?.display_name || 'Player'} - This would open a video gallery of their best plays.`);
                    }}
                  >
                    {t("players.watchHighlights")}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Players Carousel */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {t("players.topRanked")} <span className="text-gold">{t("players.topRankedFull")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("players.eliteAthletes")}
            </p>
          </motion.div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!pb-12"
          >
            {players.slice(0, 10).map((player, index) => {
              const winRate = calculateWinRate(player.total_wins, player.total_losses);
              const displayName = getDisplayName(player.display_name, player.username);
              
              return (
                <SwiperSlide key={player.id}>
                  <PlayerCard 
                    name={displayName}
                    rank={index + 1}
                    image={player.avatar_url || "/placeholder.svg"}
                    winRate={winRate}
                    tournaments={player.total_tournaments}
                    index={index}
                    playerRank={player.rank}
                    rankSystem={rankSystem}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlayers;
