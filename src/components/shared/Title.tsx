import { motion } from "framer-motion";
import type React from "react";
import { cn } from "@/lib/utils/cn";

interface TitleProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Title: React.FC<TitleProps> = ({
  children,
  size = "lg",
  className,
}) => {
  const sizeClasses = {
    xs: "text-xl md:text-2xl",
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-6xl",
  };

  return (
    <motion.h2
      className={cn(
        "text-center mb-4 text-[#F9FAFB]",
        sizeClasses[size],
        className,
      )}
      style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.h2>
  );
};
