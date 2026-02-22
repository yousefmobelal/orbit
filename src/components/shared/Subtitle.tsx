import { motion } from "framer-motion";
import React from "react";

export const Subtitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.p
      className="text-center text-[#9CA3AF] text-lg mb-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {children}
    </motion.p>
  );
};
