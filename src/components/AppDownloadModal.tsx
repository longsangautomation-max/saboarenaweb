import { Smartphone, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PremiumStoreButtons } from "./PremiumStoreButtons";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDownloadModal } from "@/contexts/AppDownloadModalContext";

const AppDownloadModal = () => {
  const { t } = useLanguage();
  const { isOpen, closeModal, modalConfig } = useAppDownloadModal();
  
  console.log('AppDownloadModal render - isOpen:', isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gold to-gold/80 rounded-2xl flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-black" />
          </div>
          <DialogTitle className="text-xl font-bold">
            {modalConfig?.title || t("app.downloadTitle")}
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            {modalConfig?.description || t("app.downloadDescription")}
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Features List */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold text-sm">✓</span>
              </div>
              <span className="text-sm text-foreground">{t("app.feature1")}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold text-sm">✓</span>
              </div>
              <span className="text-sm text-foreground">{t("app.feature2")}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center">
                <span className="text-gold text-sm">✓</span>
              </div>
              <span className="text-sm text-foreground">{t("app.feature3")}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.8/5 (2,000+ reviews)</span>
          </div>

          {/* Download Buttons */}
          <div className="pt-2">
            <PremiumStoreButtons
              size="lg"
              layout="horizontal"
              className="w-full"
            />
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={closeModal}
            className="w-full mt-4"
          >
            {t("common.cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppDownloadModal;