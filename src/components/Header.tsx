import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import femtricsLogo from '/icon.png';
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
      {/* Mobile Header - Full width */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full md:hidden max-w-[100vw] overflow-x-hidden ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        <div className={`${isScrolled ? "container-tight" : "container-tight"} px-4 max-w-[100vw] overflow-x-hidden`}>
          <motion.nav
            layout
            className={`flex items-center justify-between transition-all duration-300 w-full max-w-[100vw] overflow-x-hidden ${
              isScrolled
                ? "glass-morphism text-foreground px-3 py-2 rounded-2xl mx-auto max-w-[95vw] sm:max-w-[90vw]"
                : "bg-transparent"
            }`}
          >
            {/* Mobile Menu Button - Now on left */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors z-[60] flex-shrink-0 mr-4 ${
                isScrolled 
                  ? "bg-white/30 hover:bg-white/50 backdrop-blur-sm" 
                  : "hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-center">
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>

            {/* Empty space on right */}
            <div className="w-8 h-8"></div>
          </motion.nav>
        </div>
      </motion.header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-pink-100 text-pink-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{t(item.key)}</span>
                    <ChevronRight className={`w-4 h-4 transition-colors ${
                      location.pathname === item.path ? "text-pink-600" : "text-gray-400"
                    }`} />
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Header - Only visible on desktop */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full hidden md:block ${
          isScrolled ? "py-1 md:py-2" : "py-2 md:py-3"
        } overflow-hidden`}
      >
        <div className={`${isScrolled ? "container-tight" : "container-tight"} px-1 max-w-full overflow-hidden`}>
          <motion.nav
            layout
            className={`flex items-center justify-between transition-all duration-300 w-full overflow-hidden ${
              isScrolled
                ? "glass-morphism text-foreground px-2 py-1.5 md:px-4 md:py-2 md:rounded-2xl mx-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl"
                : "bg-transparent"
            }`}
          >
            {/* Logo - Hidden on mobile */}
            <Link to="/" className="flex items-center gap-1.5 group flex-shrink-0 hidden md:flex">
              <div className="flex items-center gap-1.5">
                <img 
                  src={femtricsLogo} 
                  alt="Femtrics Logo" 
                  className={`transition-all duration-300 ${
                    isScrolled ? "h-6 w-auto sm:h-7 md:h-8" : "h-6 w-auto sm:h-7 md:h-10"
                  }`}
                />
                {!isScrolled && (
                  <span className="font-display text-base sm:text-lg md:text-xl font-semibold text-foreground hidden sm:block">
                    Fem<span className="text-primary">trics</span>
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Button - Hidden on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg transition-colors z-[60] flex-shrink-0 hidden ${
                isScrolled 
                  ? "bg-white/30 hover:bg-white/50 backdrop-blur-sm" 
                  : "hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-5 h-4 sm:w-6 sm:h-5 flex flex-col justify-between items-center">
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center ${
              isScrolled ? "gap-0.5 mx-2" : "gap-2"
            }`}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => {
                    if (location.pathname === item.path) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-lg ${
                    location.pathname === item.path
                      ? isScrolled
                        ? "bg-pink-100 text-pink-700 shadow-md border border-pink-200"
                        : "bg-pink-100 text-pink-700 shadow-md border border-pink-200"
                      : isScrolled
                        ? "text-foreground/80 hover:text-foreground hover:bg-white/30"
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
                className={`${
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
      </motion.header>
    </>
  );
};
