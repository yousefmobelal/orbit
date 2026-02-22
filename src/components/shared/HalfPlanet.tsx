import type { Planet } from "@/types/Planet";
import { motion } from "framer-motion";

export const HalfPlanet: React.FC<{ planet: Planet }> = ({ planet }) => {
  const fromColor = planet.theme.fromColor;
  const toColor = planet.theme.toColor;
  return (
    <motion.div
      className="max-md:h-1/2 max-md:aspect-2/1 md:w-full md:aspect-2/1 rounded-t-full bg-blue-500 absolute left-1/2 -translate-x-1/2 max-md:bottom-0 md:-bottom-1/2"
      style={{
        background: `linear-gradient(to bottom right, ${fromColor},${toColor})`,
      }}
      animate={{
        boxShadow: [
          `0 0 40px ${fromColor}`,
          `0 0 60px ${toColor}`,
          `0 0 40px ${fromColor}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};
