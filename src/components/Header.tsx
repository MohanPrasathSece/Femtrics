import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import femtricsLogo from "@/assets/femtrics-logo.png";
import { useTranslation } from "@/contexts/TranslationContext";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        <div className={`${isScrolled ? "container-tight" : "container-tight"}`}>
          <motion.nav
            layout
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? "glass-morphism border border-border/30 text-foreground rounded-3xl px-6 py-3 mx-auto max-w-fit shadow-xl backdrop-blur-md"
                : "bg-transparent"
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center gap-2"
              >
                <img 
                  src={femtricsLogo} 
                  alt="Femtrics Logo" 
                  className="h-10 w-auto"
                />
                {!isScrolled && (
                  <span className="font-display text-xl font-semibold text-foreground hidden sm:block">
                    Fem<span className="text-primary">trics</span>
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center ${isScrolled ? "gap-5 mx-6" : "gap-8"}`}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isScrolled 
                      ? location.pathname === item.path 
                        ? "text-primary" 
                        : "text-foreground/80 hover:text-foreground"
                      : location.pathname === item.path 
                        ? "text-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(item.key)}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
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

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </motion.nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-b border-border mt-2"
            >
              <div className="container-tight py-6 flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2 text-lg font-medium transition-colors ${
                        location.pathname === item.path
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Button asChild className="w-full mt-4">
                    <Link to="/join" onClick={() => setMobileMenuOpen(false)}>
                      {t("nav.getStarted")}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
