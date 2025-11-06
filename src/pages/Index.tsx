import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedPlayers from "@/components/FeaturedPlayers";
import UpcomingTournaments from "@/components/UpcomingTournaments";
import News from "@/components/News";
import Footer from "@/components/Footer";
import { PremiumStoreButtons } from "@/components/PremiumStoreButtons";
import AppDownloadModal from "@/components/AppDownloadModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <div id="players">
          <FeaturedPlayers />
        </div>
        <div id="tournaments">
          <UpcomingTournaments />
        </div>
        <div id="news">
          <News />
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Download className="w-6 h-6 text-gold" />
              <h3 className="text-2xl font-bold">{t("app.downloadTitle")}</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t("app.downloadDescription")}
            </p>
            <ul className="text-sm text-muted-foreground space-y-2 mb-6 max-w-md mx-auto">
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> {t("app.feature1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> {t("app.feature2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span> {t("app.feature3")}
              </li>
            </ul>
            <PremiumStoreButtons
              size="lg"
              layout="horizontal"
              className="justify-center max-w-md mx-auto"
            />
          </div>
        </div>
      </main>
      <Footer />
      <AppDownloadModal />
    </div>
  );
};

export default Index;
