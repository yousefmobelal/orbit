import { motion } from "framer-motion";
export const OnBoardingTitle = () => {
  return (
    <div>
      <motion.h1
        className="text-3xl md:text-6xl mb-6 text-[#F9FAFB] mt-8"
        style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Build your universe.
        <br />
        One task at a time.
      </motion.h1>
      <motion.p
        className="text-md md:text-xl text-[#9CA3AF] mb-12 leading-relaxed"
        style={{ fontFamily: "Inter, sans-serif" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Turn daily goals into planets. Grow them. Level them up. Protect your
        streak.
      </motion.p>
    </div>
  );
};
