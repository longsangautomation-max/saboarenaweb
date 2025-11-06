import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-player.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional pool player in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 min-h-screen flex items-center pt-20">
        <div className="grid lg:grid-cols-2 gap-12 w-full">
          {/* Left Side - Headlines */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <p className="text-gold text-sm font-bold tracking-widest uppercase">
                Championship
              </p>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none">
                <span className="text-foreground">LEVEL PLAY</span>
                <br />
                <span className="text-gold">AWAITS YOU!</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Join the ultimate billiard championship platform. Compete with elite
                players, participate in prestigious tournaments, and master your game.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base font-bold">
                JOIN TOURNAMENT
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base font-bold">
                VIEW RANKINGS
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div>
                <p className="text-3xl md:text-4xl font-black text-gold">2.5K+</p>
                <p className="text-sm text-muted-foreground">Active Players</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-gold">150+</p>
                <p className="text-sm text-muted-foreground">Tournaments</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-gold">$500K</p>
                <p className="text-sm text-muted-foreground">Prize Pool</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex flex-col justify-center space-y-6"
          >
            {/* Tournament Card */}
            <Card className="p-6 border-2 border-gold bg-card/90 backdrop-blur-sm hover:shadow-hover hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-gold tracking-wider uppercase mb-2">
                    Upcoming Tournament
                  </p>
                  <h3 className="text-xl font-bold mb-2">
                    Pro League Finals 2024
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Registration closes in 5 days. 64 players competing for $50,000
                    grand prize.
                  </p>
                  <Button variant="outline" size="sm" className="font-bold">
                    JOIN NOW
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Video Card */}
            <Card className="p-6 border border-border bg-card/90 backdrop-blur-sm hover:shadow-hover hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="relative rounded-lg overflow-hidden mb-4 aspect-video bg-muted">
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-background fill-background ml-1" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-2">
                  Highlights
                </p>
                <h3 className="text-lg font-bold mb-2">Top Shots of the Week</h3>
                <p className="text-sm text-muted-foreground">
                  Watch the most incredible plays from this week's tournaments.
                </p>
              </div>
            </Card>

            {/* News Card */}
            <Card className="p-6 border border-border bg-card/90 backdrop-blur-sm hover:shadow-hover hover:scale-105 transition-all duration-300 cursor-pointer">
              <p className="text-xs font-bold text-gold tracking-wider uppercase mb-2">
                Latest News
              </p>
              <h3 className="text-lg font-bold mb-2">
                New Championship Rules Announced
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Tournament committee introduces updated scoring system for 2024 season.
              </p>
              <button className="text-sm font-bold text-gold hover:underline flex items-center">
                READ MORE
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
            Scroll to explore
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-border rounded-full flex justify-center p-2"
          >
            <div className="w-1 h-3 bg-gold rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
