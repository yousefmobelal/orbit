import { motion } from "framer-motion";

export const OnBoardingSubtitle = () => {
  return (
    <motion.p
      className="text-lg md:text-xl text-[#9CA3AF] mb-12 leading-relaxed"
      style={{ fontFamily: "Inter, sans-serif" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      Turn daily goals into planets. Grow them. Level them up. Protect your
      streak.
    </motion.p>
  );
};
