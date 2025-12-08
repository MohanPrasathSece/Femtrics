import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import femtricsLogo from "/logo.png";
import { useTranslation } from "@/contexts/TranslationContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";

const navItems = [
  { key: "nav.home", path: "/" },
  { key: "nav.about", path: "/about" },
  { key: "nav.dashboard", path: "/dashboard" },
  { key: "nav.workshops", path: "/workshops" },
  { key: "nav.join", path: "/join" },
  { key: "nav.contact", path: "/contact" },
];

export const Header = () => {
  const { t, language, setLanguage } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
          isScrolled ? "py-1 md:py-2" : "py-2 md:py-3"
        } overflow-hidden`}
      >
        <div className={`${isScrolled ? "container-tight" : "container-tight"} px-2 sm:px-4 max-w-full overflow-hidden`}>
          <motion.nav
            layout
            className={`flex items-center justify-between transition-all duration-500 w-full overflow-hidden ${
              isScrolled
                ? "glass-morphism border border-border/30 text-foreground px-1 sm:px-2 py-1.5 shadow-lg backdrop-blur-md md:px-4 md:py-2 md:rounded-2xl md:mx-auto md:max-w-fit rounded-b-2xl md:rounded-b-3xl"
                : "bg-transparent md:bg-transparent"
            }`}
          >
            {/* Logo - Main Position */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center gap-2"
              >
                <img 
                  src={femtricsLogo} 
                  alt="Femtrics Logo" 
                  className="h-6 w-auto sm:h-7 md:h-10"
                />
                {!isScrolled && (
                  <span className="font-display text-base sm:text-lg md:text-xl font-semibold text-foreground hidden sm:block">
                    Fem<span className="text-primary">trics</span>
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors z-[60] flex-shrink-0"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.div
                className="relative w-5 h-4 sm:w-6 sm:h-5 flex flex-col justify-between items-center"
              >
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 6 : 0
                  }}
                  className="h-0.5 w-5 sm:w-6 bg-foreground transition-all duration-300"
                  style={{ originX: "center", originY: "center" }}
                />
                <motion.span
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1
                  }}
                  className="h-0.5 w-5 sm:w-6 bg-foreground transition-all duration-300"
                />
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -6 : 0
                  }}
                  className="h-0.5 w-5 sm:w-6 bg-foreground transition-all duration-300"
                  style={{ originX: "center", originY: "center" }}
                />
              </motion.div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center ${isScrolled ? "gap-2 mx-6" : "gap-2"}`}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : isScrolled
                        ? "text-foreground/80 hover:text-foreground hover:bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>

            {/* Desktop Language Toggle & CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle />
              <Button 
                asChild 
                variant={isScrolled ? "default" : "default"} 
                size="sm"
                className={`btn-shimmer ${
                  isScrolled 
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                    : ""
                }`}
              >
                <Link to="/join">{t("nav.getStarted")}</Link>
              </Button>
            </div>
          </motion.nav>
        </div>

        {/* Mobile Menu - Bottom Sheet Style */}
        <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} modal={true}>
          <DrawerContent id="mobile-menu" className="bg-[#FAF7F5] border-t-0 rounded-t-3xl pb-safe max-h-[85vh]">
            <DrawerHeader className="px-6 pt-6 pb-4">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-4 rounded-2xl text-base font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-primary/15 text-primary"
                        : "text-gray-700 hover:bg-white/60"
                    }`}
                  >
                    <span>{t(item.key)}</span>
                    <ChevronRight className={`w-5 h-5 transition-colors ${
                      location.pathname === item.path ? "text-primary" : "text-gray-400"
                    }`} />
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                <div className="flex justify-center">
                  <LanguageToggle />
                </div>
                <Button asChild variant="hero" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-semibold shadow-lg">
                  <Link to="/join" onClick={() => setMobileMenuOpen(false)}>
                    {t("nav.getStarted")}
                  </Link>
                </Button>
              </div>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </motion.header>
    </>
  );
};
