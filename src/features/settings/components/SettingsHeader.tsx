import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const SettingsHeader = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-8"
    >
      <h1
        className="text-4xl md:text-5xl font-bold text-[#F9FAFB]"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Settings
      </h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="size-12 rounded-full bg-[#121826] border border-white/10 flex items-center justify-center hover:border-[#22D3EE] transition-colors duration-300"
      >
        <X className="text-gray-400 hover:text-[#22D3EE] transition-colors duration-300" />
      </motion.button>
    </motion.div>
  );
};
