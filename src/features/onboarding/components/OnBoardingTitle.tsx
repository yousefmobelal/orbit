import { motion } from "framer-motion";
export const OnBoardingTitle = () => {
  return (
    <motion.h1
      className="text-5xl md:text-6xl mb-6 text-[#F9FAFB] mt-8"
      style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      Build your universe.
      <br />
      One task at a time.
    </motion.h1>
  );
};
