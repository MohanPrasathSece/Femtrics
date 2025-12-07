import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 60, scale: 0.95 };
      case "down":
        return { opacity: 0, y: -60, scale: 0.95 };
      case "left":
        return { opacity: 0, x: 60, scale: 0.95 };
      case "right":
        return { opacity: 0, x: -60, scale: 0.95 };
      case "none":
        return { opacity: 0, scale: 0.95 };
      default:
        return { opacity: 0, y: 60, scale: 0.95 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0, scale: 1 };
      case "left":
      case "right":
        return { opacity: 1, x: 0, scale: 1 };
      case "none":
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, y: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
