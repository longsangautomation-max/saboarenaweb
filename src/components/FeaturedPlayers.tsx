import { motion } from "framer-motion";
import PlayerCard from "./PlayerCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import featuredPlayer from "@/assets/featured-player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";
import player5 from "@/assets/player-5.jpg";

const FeaturedPlayers = () => {
  const players = [
    {
      name: "Marcus Chen",
      rank: 1,
      image: featuredPlayer,
      winRate: 94,
      tournaments: 127,
    },
    {
      name: "Alex Rodriguez",
      rank: 2,
      image: player2,
      winRate: 91,
      tournaments: 105,
    },
    {
      name: "Sarah Mitchell",
      rank: 3,
      image: player3,
      winRate: 89,
      tournaments: 98,
    },
    {
      name: "James Park",
      rank: 4,
      image: player4,
      winRate: 87,
      tournaments: 112,
    },
    {
      name: "David Kim",
      rank: 5,
      image: player5,
      winRate: 85,
      tournaments: 89,
    },
  ];

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
          <span className="text-gold font-bold">SABO ARENA</span>
          <span>\</span>
          <span>TOP PLAYERS</span>
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
                  src={featuredPlayer}
                  alt="Marcus Chen - Reigning Champion"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50" />
              </div>

              {/* Player Info */}
              <div className="flex flex-col justify-center p-8 lg:p-12 bg-card/50 backdrop-blur-sm">
                <div className="mb-6">
                  <p className="text-sm font-bold text-gold tracking-widest uppercase mb-4">
                    Reigning Champion
                  </p>
                  <div className="flex items-end gap-4 mb-4">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black">
                      Marcus Chen
                    </h2>
                  </div>
                  <div className="inline-block">
                    <div className="text-8xl md:text-9xl font-black text-gold opacity-20">
                      #1
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Undefeated champion with 500+ tournament wins. Known for precision
                  shots and strategic mastery. Currently holding the world record for
                  consecutive wins.
                </p>

                <div className="grid grid-cols-3 gap-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-3xl font-black text-gold">500+</p>
                    <p className="text-sm text-muted-foreground">Tournament Wins</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gold">94%</p>
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-gold">127</p>
                    <p className="text-sm text-muted-foreground">Championships</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button className="text-sm font-bold text-gold hover:underline uppercase tracking-wider">
                    View Full Profile →
                  </button>
                  <button className="text-sm font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">
                    Watch Highlights →
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
              TOP <span className="text-gold">RANKED</span> PLAYERS
            </h2>
            <p className="text-muted-foreground text-lg">
              Meet the elite athletes dominating the championship circuit
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
            {players.map((player, index) => (
              <SwiperSlide key={player.rank}>
                <PlayerCard {...player} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlayers;
