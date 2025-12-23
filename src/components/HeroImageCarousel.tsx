import { motion } from "framer-motion";
import workshopsHero from "@/assets/workshops-hero.png";

export const HeroImageCarousel = () => {
  return (
    <motion.img
      src={workshopsHero}
      alt="Women entrepreneurs using analytics"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="w-full h-full object-cover"
    />
  );
};
