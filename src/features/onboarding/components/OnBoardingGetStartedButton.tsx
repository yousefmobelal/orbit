import { motion } from "framer-motion";
export const OnBoardingGetStartedButton = () => {
  return (
    <motion.button
      //   onClick={}
      className="relative px-10 py-4 rounded-full overflow-hidden group"
      style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6]" />

      {/* Glow on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

      <span className="relative text-white text-lg">Get Started</span>
    </motion.button>
  );
};
