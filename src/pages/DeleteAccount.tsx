import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const DeleteAccount = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: t("deleteAccount.error"),
        description: t("deleteAccount.emailRequired"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate sending request
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      toast({
        title: t("deleteAccount.successTitle"),
        description: t("deleteAccount.successMessage"),
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              {t("deleteAccount.title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("deleteAccount.subtitle")}
            </p>
          </div>

          {!isSubmitted ? (
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <div className="space-y-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">
                  {t("deleteAccount.warning")}
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>{t("deleteAccount.dataDeleted1")}</li>
                  <li>{t("deleteAccount.dataDeleted2")}</li>
                  <li>{t("deleteAccount.dataDeleted3")}</li>
                  <li>{t("deleteAccount.dataDeleted4")}</li>
                </ul>
                <p className="text-destructive font-medium">
                  {t("deleteAccount.processingTime")}
                </p>
                <p className="text-destructive font-medium">
                  {t("deleteAccount.noRecovery")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("deleteAccount.emailLabel")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("deleteAccount.emailPlaceholder")}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">{t("deleteAccount.reasonLabel")}</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={t("deleteAccount.reasonPlaceholder")}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  variant="destructive"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("deleteAccount.submitting") : t("deleteAccount.submitButton")}
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4">
              <div className="text-6xl">✓</div>
              <h2 className="text-2xl font-bold text-foreground">
                {t("deleteAccount.confirmationTitle")}
              </h2>
              <p className="text-muted-foreground">
                {t("deleteAccount.confirmationMessage")}
              </p>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>{t("deleteAccount.contactLabel")}</p>
            <a
              href="mailto:support@saboarena.com"
              className="text-primary hover:underline font-medium"
            >
              support@saboarena.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeleteAccount;
