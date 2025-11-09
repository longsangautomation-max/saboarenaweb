import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTournamentDetails } from "@/hooks/useTournamentDetails";
import { useTournamentMatches } from "@/hooks/useTournamentMatches";
import { useTournamentParticipants } from "@/hooks/useTournamentParticipants";
import { formatCurrency, formatDate, getDisplayName } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TournamentRegistration from "@/components/TournamentRegistration";
import Navigation from "@/components/Navigation";
import { DE64BracketVisualization } from "@/components/DE64BracketVisualization";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Coins, 
  Clock, 
  Target,
  Award,
  ArrowLeft,
  Share2
} from "lucide-react";

const TournamentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  
  const { data: tournament, isLoading: tournamentLoading } = useTournamentDetails(id || "");
  const { data: matches, isLoading: matchesLoading } = useTournamentMatches(id || "");
  const { data: participants, isLoading: participantsLoading } = useTournamentParticipants(id || "");

  if (tournamentLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-24">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-12 w-96 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-96" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t("tournaments.notFound")}</h2>
          <p className="text-muted-foreground mb-4">{t("tournaments.notFoundDesc")}</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("common.backHome")}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "upcoming": return "default";
      case "ongoing": return "secondary";
      case "completed": return "outline";
      default: return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "text-blue-400";
      case "ongoing": return "text-green-400";
      case "completed": return "text-gold";
      default: return "text-muted-foreground";
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-16">{/* Add pt-16 for navigation spacing */}
      {/* Header */}
      <section className="py-8 bg-slate-900 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" asChild className="text-slate-400 hover:text-white">
              <Link to="/tournaments">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("common.backToTournaments")}
              </Link>
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              {t("common.share")}
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-6 mb-6">
              {tournament.club?.logo_url && (
                <img
                  src={tournament.club.logo_url}
                  alt={tournament.club.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-slate-600"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge 
                    variant={getStatusBadgeVariant(tournament.status)}
                    className={getStatusColor(tournament.status)}
                  >
                    {t(`tournaments.status.${tournament.status}`)}
                  </Badge>
                  {tournament.game_format && (
                    <Badge variant="outline" className="border-gold/30 text-gold">
                      {tournament.game_format}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {tournament.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gold" />
                    <span>{formatDate(tournament.start_date)}</span>
                  </div>
                  {tournament.club?.name && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gold" />
                      <span>{tournament.club.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold" />
                    <span>{tournament.current_participants}/{tournament.max_participants}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tournament.prize_pool && (
                <Card className="p-4 bg-slate-800/50 border-slate-700 text-center">
                  <Trophy className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">{formatCurrency(tournament.prize_pool)}</p>
                  <p className="text-sm text-slate-400">{t("tournaments.prizePool")}</p>
                </Card>
              )}
              {tournament.entry_fee && (
                <Card className="p-4 bg-slate-800/50 border-slate-700 text-center">
                  <Coins className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">{formatCurrency(tournament.entry_fee)}</p>
                  <p className="text-sm text-slate-400">{t("tournaments.entryFee")}</p>
                </Card>
              )}
              <Card className="p-4 bg-slate-800/50 border-slate-700 text-center">
                <Users className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-lg font-bold text-white">{tournament.current_participants}</p>
                <p className="text-sm text-slate-400">{t("tournaments.participants")}</p>
              </Card>
              <Card className="p-4 bg-slate-800/50 border-slate-700 text-center">
                <Target className="w-6 h-6 text-gold mx-auto mb-2" />
                <p className="text-lg font-bold text-white">{matches?.length || 0}</p>
                <p className="text-sm text-slate-400">{t("tournaments.totalMatches")}</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">{t("tournaments.overview")}</TabsTrigger>
                  <TabsTrigger value="bracket">Bảng đấu</TabsTrigger>
                  <TabsTrigger value="matches">Trận đấu</TabsTrigger>
                  <TabsTrigger value="participants">{t("tournaments.participants")}</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card className="p-6 bg-slate-800/50 border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">{t("tournaments.about")}</h3>
                    <div className="space-y-4 text-slate-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-400 mb-1">{t("tournaments.format")}</p>
                          <p className="font-semibold">{tournament.game_format || t("tournaments.standard")}</p>
                        </div>
                        {tournament.venue_address && (
                          <div>
                            <p className="text-sm text-slate-400 mb-1">{t("tournaments.venue")}</p>
                            <p className="font-semibold">{tournament.venue_address}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-slate-400 mb-1">{t("tournaments.startDate")}</p>
                          <p className="font-semibold">{formatDate(tournament.start_date)}</p>
                        </div>
                        {tournament.end_date && (
                          <div>
                            <p className="text-sm text-slate-400 mb-1">{t("tournaments.endDate")}</p>
                            <p className="font-semibold">{formatDate(tournament.end_date)}</p>
                          </div>
                        )}
                      </div>
                      
                      {tournament.description && (
                        <div>
                          <p className="text-sm text-slate-400 mb-2">{t("tournaments.description")}</p>
                          <p className="leading-relaxed">{tournament.description}</p>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Tournament Rules */}
                  <Card className="p-6 bg-slate-800/50 border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">{t("tournaments.rules")}</h3>
                    <div className="space-y-3 text-slate-300">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                        <p>{t("tournaments.rule1")}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                        <p>{t("tournaments.rule2")}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                        <p>{t("tournaments.rule3")}</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Bracket Tab - Sơ đồ bảng đấu */}
                <TabsContent value="bracket" className="space-y-6">
                  <Card className="p-0 bg-slate-800/50 border-slate-700 overflow-hidden">
                    <div className="p-4 border-b border-slate-700 bg-slate-900/50">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-gold" />
                        Sơ đồ bảng đấu
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Xem toàn bộ cấu trúc giải đấu với Winner Bracket, Loser Bracket và Grand Finals
                      </p>
                    </div>
                    <div className="h-[calc(100vh-300px)]">
                      {id ? (
                        <DE64BracketVisualization tournamentId={id} />
                      ) : (
                        <div className="text-center py-8 text-slate-400">
                          <Target className="w-12 h-12 mx-auto mb-4" />
                          <p>Chưa có bảng đấu</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>

                {/* Matches Tab - Danh sách trận đấu */}
                <TabsContent value="matches" className="space-y-6">
                  <Card className="p-6 bg-slate-800/50 border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-gold" />
                      Danh sách trận đấu
                    </h3>
                    {matchesLoading ? (
                      <div className="space-y-4">
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((id) => (
                          <Skeleton key={`match-skeleton-${id}`} className="h-16 w-full" />
                        ))}
                      </div>
                    ) : matches && matches.length > 0 ? (
                      <div className="space-y-4">
                        {matches.map((match, index) => (
                          <div 
                            key={match.id}
                            className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="text-sm font-bold text-gold">
                                  #{index + 1}
                                </div>
                                <div>
                                  <p className="font-semibold text-white">
                                    {match.player1?.display_name || match.player1?.username || t("tournaments.tbd")} 
                                    vs 
                                    {match.player2?.display_name || match.player2?.username || t("tournaments.tbd")}
                                  </p>
                                  <p className="text-sm text-slate-400">
                                    {match.match_date ? formatDate(match.match_date) : t("tournaments.scheduled")}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge 
                                  variant={match.status === "completed" ? "default" : "outline"}
                                  className={match.status === "completed" ? "bg-green-600" : ""}
                                >
                                  {t(`tournaments.matchStatus.${match.status}`)}
                                </Badge>
                                {match.winner_id && (
                                  <p className="text-sm text-gold mt-1">
                                    {t("tournaments.winner")}: {match.winner?.display_name || match.winner?.username}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-400">
                        <Clock className="w-12 h-12 mx-auto mb-4" />
                        <p>{t("tournaments.noMatches")}</p>
                      </div>
                    )}
                  </Card>
                </TabsContent>

                {/* Participants Tab */}
                <TabsContent value="participants" className="space-y-6">
                  <Card className="p-6 bg-slate-800/50 border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {t("tournaments.participantsList")} ({participants?.length || 0})
                    </h3>
                    {participantsLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 8 }, (_, i) => i + 1).map((id) => (
                          <Skeleton key={`participant-skeleton-${id}`} className="h-16 w-full" />
                        ))}
                      </div>
                    ) : participants && participants.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {participants.map((participant, index) => (
                          <div 
                            key={participant.id}
                            className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-gold/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/40 flex items-center justify-center text-gold font-bold">
                                #{index + 1}
                              </div>
                              <div>
                                <p className="font-semibold text-white">
                                  {getDisplayName(participant.display_name, participant.username)}
                                </p>
                                {participant.rank && (
                                  <p className="text-sm text-gold">{participant.rank}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-400">
                        <Users className="w-12 h-12 mx-auto mb-4" />
                        <p>{t("tournaments.noParticipants")}</p>
                      </div>
                    )}
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tournament Registration */}
              <TournamentRegistration tournament={tournament} />

              {/* Organizer */}
              {tournament.club && (
                <Card className="p-6 bg-slate-800/50 border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-4">{t("tournaments.organizer")}</h3>
                  <div className="flex items-center gap-3">
                    {tournament.club.logo_url ? (
                      <img
                        src={tournament.club.logo_url}
                        alt={tournament.club.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-gold" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-white">{tournament.club.name}</p>
                      {tournament.club.address && (
                        <p className="text-sm text-slate-400">{tournament.club.address}</p>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Quick Stats */}
              <Card className="p-6 bg-slate-800/50 border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">{t("tournaments.quickStats")}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">{t("tournaments.avgRating")}</span>
                    <span className="font-bold text-white">2400</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">{t("tournaments.topSeed")}</span>
                    <span className="font-bold text-gold">Master</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">{t("tournaments.totalPrize")}</span>
                    <span className="font-bold text-white">
                      {tournament.prize_pool ? formatCurrency(tournament.prize_pool) : "N/A"}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default TournamentDetails;