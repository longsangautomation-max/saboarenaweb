import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedPlayers from "@/components/FeaturedPlayers";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedPlayers />
      </main>
    </div>
  );
};

export default Index;
