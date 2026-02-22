import { motion } from "framer-motion";
import type React from "react";
export const Title: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.h2
      className="text-4xl md:text-5xl text-center mb-4 text-[#F9FAFB]"
      style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.h2>
  );
};
