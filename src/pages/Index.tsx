import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedPlayers from "@/components/FeaturedPlayers";
import UpcomingTournaments from "@/components/UpcomingTournaments";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedPlayers />
        <UpcomingTournaments />
      </main>
    </div>
  );
};

export default Index;
