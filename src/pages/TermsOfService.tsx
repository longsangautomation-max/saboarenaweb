import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";

const TermsOfService = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("terms.title")}
          </h1>
          
          <p className="text-muted-foreground mb-12">
            {t("terms.lastUpdated")}: {language === "vi" ? "15 tháng 11, 2025" : "November 15, 2025"}
          </p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.intro.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.intro.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.acceptance.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.acceptance.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.account.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("terms.account.content")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t("terms.account.age")}</li>
                <li>{t("terms.account.accurate")}</li>
                <li>{t("terms.account.security")}</li>
                <li>{t("terms.account.responsibility")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.usage.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("terms.usage.intro")}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("terms.usage.permitted.title")}</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>{t("terms.usage.permitted.tournaments")}</li>
                    <li>{t("terms.usage.permitted.profile")}</li>
                    <li>{t("terms.usage.permitted.compete")}</li>
                    <li>{t("terms.usage.permitted.interact")}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("terms.usage.prohibited.title")}</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>{t("terms.usage.prohibited.cheat")}</li>
                    <li>{t("terms.usage.prohibited.harass")}</li>
                    <li>{t("terms.usage.prohibited.impersonate")}</li>
                    <li>{t("terms.usage.prohibited.hack")}</li>
                    <li>{t("terms.usage.prohibited.illegal")}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.tournaments.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("terms.tournaments.content")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t("terms.tournaments.rules")}</li>
                <li>{t("terms.tournaments.conduct")}</li>
                <li>{t("terms.tournaments.schedule")}</li>
                <li>{t("terms.tournaments.decisions")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.payment.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("terms.payment.content")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t("terms.payment.fees")}</li>
                <li>{t("terms.payment.refund")}</li>
                <li>{t("terms.payment.currency")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.intellectual.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.intellectual.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.liability.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("terms.liability.content")}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t("terms.liability.availability")}</li>
                <li>{t("terms.liability.accuracy")}</li>
                <li>{t("terms.liability.thirdParty")}</li>
                <li>{t("terms.liability.loss")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.termination.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.termination.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.changes.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.changes.content")}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.governing.title")}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("terms.governing.content")}
              </p>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-gold mb-4">{t("terms.contact.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("terms.contact.content")}
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

export default TermsOfService;
