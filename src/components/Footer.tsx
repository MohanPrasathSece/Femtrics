import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="relative mt-20 w-full">
      <div className="bg-black text-white rounded-t-[2.5rem] px-4 md:px-6 py-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Branding */}
            <div className="flex flex-col">
              <motion.h3 
                className="text-xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Fem<span className="text-primary">trics</span>
              </motion.h3>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                {t("footer.tagline")}
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-white" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="text-white" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold text-white mb-3">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2">
                {[
                  { key: "nav.about", path: "/about" },
                  { key: "nav.workshops", path: "/workshops" },
                  { key: "nav.dashboard", path: "/dashboard" },
                  { key: "nav.join", path: "/join" },
                ].map((link) => (
                  <li key={link.path}>
                    <a href={link.path} className="text-white/70 hover:text-primary text-sm transition-colors duration-200">
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base font-semibold text-white mb-3">{t("footer.contact")}</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{t("footer.location")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-white/70 text-sm">info@femtrics.in</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-white/70 text-sm">+91 XXX XXX XXXX</span>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-base font-semibold text-white mb-3">{t("footer.resources")}</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-primary text-sm transition-colors duration-200">
                    {t("footer.caseStudies")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-primary text-sm transition-colors duration-200">
                    {t("footer.blog")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-primary text-sm transition-colors duration-200">
                    {t("footer.faq")}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-primary text-sm transition-colors duration-200">
                    {t("footer.support")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/60 text-xs text-center">
              {t("footer.copyright")} | All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
