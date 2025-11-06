import { useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t("nav.home"), href: "#" },
    { label: t("nav.tournaments"), href: "#tournaments" },
    { label: t("nav.rankings"), href: "#rankings" },
    { label: t("nav.players"), href: "#players" },
    { label: t("nav.clubs"), href: "#clubs" },
    { label: t("nav.news"), href: "#news" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-muted-foreground hover:text-gold transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Logo */}
            <div className="text-2xl font-black tracking-tight">
              <span className="text-foreground">SABO</span>{" "}
              <span className="text-gold">ARENA</span>
            </div>

            {/* Language Switcher & CTA */}
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Languages className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 text-xs font-bold text-gold">
                      {language.toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border z-[100]">
                  <DropdownMenuItem
                    onClick={() => setLanguage("vi")}
                    className={`cursor-pointer ${
                      language === "vi" ? "bg-muted text-gold font-bold" : ""
                    }`}
                  >
                    <span className="mr-2">🇻🇳</span>
                    Tiếng Việt
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className={`cursor-pointer ${
                      language === "en" ? "bg-muted text-gold font-bold" : ""
                    }`}
                  >
                    <span className="mr-2">🇬🇧</span>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="default" className="hidden lg:inline-flex">
                {t("nav.download")}
              </Button>
            </div>
            <div className="lg:hidden w-10" /> {/* Spacer for mobile */}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-16 left-0 bottom-0 w-80 bg-card border-r border-border z-40 lg:hidden overflow-y-auto"
          >
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-semibold text-foreground hover:text-gold transition-colors py-3 border-b border-border"
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wider">
                  {language === "vi" ? "Ngôn ngữ" : "Language"}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant={language === "vi" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setLanguage("vi")}
                  >
                    🇻🇳 Tiếng Việt
                  </Button>
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setLanguage("en")}
                  >
                    🇬🇧 English
                  </Button>
                </div>
              </div>
              
              <Button className="w-full mt-6">{t("nav.download")}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
