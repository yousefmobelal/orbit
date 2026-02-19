import { motion } from "framer-motion";
export const OnBoardingLogin = () => {
  return (
    <motion.p
      className="mt-6 text-gray-400"
      style={{ fontFamily: "Inter, sans-serif" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
    >
      Already have an account?
      <button className="text-[#4DA3FF] hover:text-[#22D3EE] transition-colors underline ms-1">
        Log in
      </button>
    </motion.p>
  );
};
