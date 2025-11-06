import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { RankSystem } from "@/types/database";
import { getRankColor } from "@/lib/helpers";

interface PlayerCardProps {
  name: string;
  rank: number;
  image: string;
  winRate: number;
  tournaments: number;
  index: number;
  playerRank?: string | null;
  rankSystem?: RankSystem[];
}

const PlayerCard = ({ name, rank, image, winRate, tournaments, index, playerRank, rankSystem }: PlayerCardProps) => {
  const { t } = useLanguage();
  const rankColor = getRankColor(playerRank, rankSystem);
  const rankDisplay = t("common.language") === "vi" 
    ? rankSystem?.find(r => r.rank_code === playerRank)?.rank_name_vi || playerRank
    : playerRank;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <Card className="overflow-hidden border-2 border-border hover:border-gold transition-all duration-300 bg-card group cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={image}
            alt={`${name} - Rank #${rank}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Rank Badge */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gold flex items-center justify-center">
            <span className="text-xl font-black text-background">#{rank}</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl font-bold">{name}</h3>
              {playerRank && (
                <span 
                  className="px-2 py-1 rounded text-xs font-black uppercase"
                  style={{ 
                    backgroundColor: rankColor + '20',
                    color: rankColor,
                    border: `1px solid ${rankColor}`
                  }}
                >
                  {rankDisplay}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {t("players.professionalPlayer")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gold" />
              <div>
                <p className="text-lg font-bold text-gold">{winRate}%</p>
                <p className="text-xs text-muted-foreground">{t("players.winRate")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gold" />
              <div>
                <p className="text-lg font-bold text-gold">{tournaments}</p>
                <p className="text-xs text-muted-foreground">{t("players.tournaments")}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PlayerCard;
