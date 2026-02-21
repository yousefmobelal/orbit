import { motion } from "framer-motion";

export const FirstMissionEnterGalaxyButton = () => {
  return (
    <div className="flex  justify-center items-center mt-10">
      <motion.button
        //   onClick={() => navigate("/how-it-works")}
        className="px-10 py-4 rounded-full bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] text-white text-lg"
        style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Enter My Galaxy 🌌{" "}
      </motion.button>
    </div>
  );
};
