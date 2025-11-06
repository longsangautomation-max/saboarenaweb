import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";

const PrivacyPolicy = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("privacy.title")}
          </h1>
          
          <p className="text-muted-foreground mb-12">
            {t("privacy.lastUpdated")}: {language === "vi" ? "15 tháng 11, 2025" : "November 15, 2025"}
          </p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.intro.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.intro.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.collection.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("privacy.collection.content")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t("privacy.collection.email")}</li>
                <li>{t("privacy.collection.name")}</li>
                <li>{t("privacy.collection.avatar")}</li>
                <li>{t("privacy.collection.gameData")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.usage.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("privacy.usage.content")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t("privacy.usage.tournaments")}</li>
                <li>{t("privacy.usage.profiles")}</li>
                <li>{t("privacy.usage.leaderboards")}</li>
                <li>{t("privacy.usage.communication")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.storage.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.storage.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.sharing.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.sharing.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.rights.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("privacy.rights.content")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t("privacy.rights.access")}</li>
                <li>{t("privacy.rights.correction")}</li>
                <li>{t("privacy.rights.deletion")}</li>
                <li>{t("privacy.rights.export")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.security.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.security.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.children.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.children.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.changes.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("privacy.changes.content")}
              </p>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-gold mb-4">{t("privacy.contact.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("privacy.contact.content")}
              </p>
              <p className="text-foreground font-semibold">
                Email: <a href="mailto:support@saboarena.com" className="text-primary hover:underline">support@saboarena.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
