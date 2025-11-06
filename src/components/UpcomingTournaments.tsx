import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUpcomingTournaments } from "@/hooks/useUpcomingTournaments";
import { formatCurrency, formatDate } from "@/lib/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AppDownloadButtons from "@/components/AppDownloadButtons";
import { useAppDownloadModal } from "@/hooks/useAppDownloadModal";
import { Calendar, MapPin, Users, Trophy, Coins } from "lucide-react";

const UpcomingTournaments = () => {
  const { t } = useLanguage();
  const { data: tournaments, isLoading, error } = useUpcomingTournaments(6);
  const { openModal } = useAppDownloadModal();

  const handleTournamentRegister = (tournamentId: string, tournamentName: string) => {
    // Show professional modal for app download
    openModal({
      title: t("tournaments.registerTitle") || "Đăng ký giải đấu",
      description: `${t("tournaments.registerDescription") || "Tải app SABO Arena để đăng ký tham gia"} "${tournamentName}"`
    });
  };

  const handleViewAllTournaments = () => {
    // Navigate to tournaments page or scroll to tournaments section
    const tournamentsSection = document.getElementById('tournaments');
    if (tournamentsSection) {
      tournamentsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert("Navigate to tournaments page - This would show all upcoming and past tournaments.");
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mb-8 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96 rounded-lg bg-slate-800" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !tournaments || tournaments.length === 0) {
    return (
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("tournaments.upcoming")}
          </h2>
          <p className="text-slate-400 text-lg">
            {t("tournaments.noUpcoming")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-gold/10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("tournaments.upcoming")}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t("tournaments.upcomingDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-gold/30 transition-all duration-300 group"
            >
              {/* Tournament Header */}
              <div className="flex items-start gap-4 mb-6">
                {tournament.club?.logo_url ? (
                  <img
                    src={tournament.club.logo_url}
                    alt={tournament.club.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-gold" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    {tournament.title}
                  </h3>
                  <p className="text-slate-400 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tournament.club?.name || tournament.venue_address}
                  </p>
                </div>
              </div>

              {/* Tournament Info */}
              <div className="space-y-4 mb-6">
                {/* Date */}
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span>{formatDate(tournament.start_date)}</span>
                </div>

                {/* Participants */}
                <div className="flex items-center gap-3 text-slate-300">
                  <Users className="w-5 h-5 text-gold" />
                  <span>
                    {tournament.current_participants}/{tournament.max_participants} {t("tournaments.participants")}
                  </span>
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gold rounded-full h-2 transition-all duration-300"
                      style={{ 
                        "--progress": `${Math.round((tournament.current_participants / tournament.max_participants) * 100)}%`,
                        width: "var(--progress)"
                      } as React.CSSProperties}
                    />
                  </div>
                </div>

                {/* Game Format */}
                {tournament.game_format && (
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-gold/30 text-gold">
                      {tournament.game_format}
                    </Badge>
                  </div>
                )}

                {/* Prize & Entry Fee */}
                <div className="grid grid-cols-2 gap-4">
                  {!!tournament.prize_pool && (
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <Trophy className="w-5 h-5 text-gold mx-auto mb-1" />
                      <p className="text-xs text-slate-400">{t("tournaments.prize")}</p>
                      <p className="text-gold font-bold">{formatCurrency(tournament.prize_pool)}</p>
                    </div>
                  )}
                  {!!tournament.entry_fee && (
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <Coins className="w-5 h-5 text-gold mx-auto mb-1" />
                      <p className="text-xs text-slate-400">{t("tournaments.entryFee")}</p>
                      <p className="text-white font-bold">{formatCurrency(tournament.entry_fee)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Register Button */}
              <Button 
                className="w-full bg-gold text-black hover:bg-gold/90 font-bold py-3"
                disabled={tournament.current_participants >= tournament.max_participants}
                onClick={() => handleTournamentRegister(tournament.id, tournament.title)}
              >
                {tournament.current_participants >= tournament.max_participants 
                  ? t("tournaments.full")
                  : t("tournaments.register")
                }
              </Button>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12 space-y-6"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300"
            onClick={handleViewAllTournaments}
          >
            {t("tournaments.viewAll")}
          </Button>
          
          {/* Mobile App CTA */}
          <div className="lg:hidden max-w-md mx-auto">
            <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-lg p-4">
              <p className="text-sm font-bold text-gold mb-1">{t("app.getTheApp")}</p>
              <p className="text-xs text-muted-foreground mb-3">{t("tournaments.mobileAppPromo")}</p>
              <AppDownloadButtons
                variant="outline"
                size="sm"
                layout="horizontal"
                className="w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingTournaments;