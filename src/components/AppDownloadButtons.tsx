import { Button } from "@/components/ui/button";
import { Smartphone, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppDownloadButtonsProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  layout?: "horizontal" | "vertical" | "compact";
  showText?: boolean;
  showIcons?: boolean;
}

const AppDownloadButtons = ({ 
  variant = "default",
  size = "default", 
  className = "",
  layout = "horizontal",
  showText = true,
  showIcons = true
}: AppDownloadButtonsProps) => {
  const { t } = useLanguage();

  const handleAppStoreClick = () => {
    window.open('https://apps.apple.com/us/app/sabo-arena/id6753811170', '_blank');
  };

  const handleGooglePlayClick = () => {
    window.open('https://play.google.com/store/apps/details?id=com.saboarena', '_blank');
  };

  const layoutClasses = {
    horizontal: "flex flex-row gap-3",
    vertical: "flex flex-col gap-3", 
    compact: "flex flex-row gap-2"
  };

  const AppleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );

  const GooglePlayIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
    </svg>
  );

  const buttonContent = {
    appStore: (
      <div className="flex items-center gap-2">
        {showIcons && (
          <div className="w-6 h-6 text-foreground">
            <AppleIcon />
          </div>
        )}
        {showText && (
          <div className="text-left">
            <div className="text-xs opacity-75">{t("common.availableOn")}</div>
            <div className="text-sm font-semibold">App Store</div>
          </div>
        )}
      </div>
    ),
    googlePlay: (
      <div className="flex items-center gap-2">
        {showIcons && (
          <div className="w-6 h-6 text-foreground">
            <GooglePlayIcon />
          </div>
        )}
        {showText && (
          <div className="text-left">
            <div className="text-xs opacity-75">{t("common.getItOn")}</div>
            <div className="text-sm font-semibold">Google Play</div>
          </div>
        )}
      </div>
    )
  };

  // Compact version with just icons
  if (layout === "compact" && !showText) {
    return (
      <div className={`${layoutClasses[layout]} ${className}`}>
        <Button
          variant={variant}
          size="icon"
          onClick={handleAppStoreClick}
          title="Download on App Store"
          className="relative"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </Button>
        <Button
          variant={variant}
          size="icon"
          onClick={handleGooglePlayClick}
          title="Get it on Google Play"
          className="relative"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
          </svg>
        </Button>
      </div>
    );
  }

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      <Button
        variant={variant}
        size={size}
        onClick={handleAppStoreClick}
        className="min-w-0 flex-1"
      >
        {buttonContent.appStore}
      </Button>
      <Button
        variant={variant}
        size={size}
        onClick={handleGooglePlayClick}
        className="min-w-0 flex-1"
      >
        {buttonContent.googlePlay}
      </Button>
    </div>
  );
};

// Alternative floating call-to-action component
export const FloatingAppPromo = () => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold/80 rounded-lg flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-black" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm">{t("app.getTheApp")}</h4>
            <p className="text-xs text-muted-foreground">{t("app.betterExperience")}</p>
          </div>
        </div>
        <AppDownloadButtons
          variant="outline"
          size="sm"
          layout="vertical"
          className="w-full"
        />
      </div>
    </div>
  );
};

// Inline app promotion banner
export const AppPromoBanner = ({ className = "" }) => {
  const { t } = useLanguage();
  
  return (
    <div className={`bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-lg p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
            <Download className="w-5 h-5 text-gold" />
            <h3 className="text-xl font-bold">{t("app.downloadTitle")}</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            {t("app.downloadDescription")}
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 mb-4">
            <li>✓ {t("app.feature1")}</li>
            <li>✓ {t("app.feature2")}</li>
            <li>✓ {t("app.feature3")}</li>
          </ul>
        </div>
        <div className="lg:w-auto">
          <AppDownloadButtons
            variant="default"
            size="lg"
            layout="vertical"
            className="min-w-0"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadButtons;