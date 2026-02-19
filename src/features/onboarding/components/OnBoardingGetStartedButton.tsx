import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const OnBoardingGetStartedButton = () => {
  const navigate = useNavigate();
  return (
    <motion.button
      onClick={() => navigate("/how-it-works")}
      className="px-10 py-4 rounded-full bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] text-white text-lg"
      style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      whileHover={{ scale: 1.09 }}
      whileTap={{ scale: 0.95 }}
    >
      Get Started
    </motion.button>
  );
};
