import { motion } from "framer-motion";
export const Planet = () => {
  return (
    <motion.div
      className="mb-12 flex justify-center"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#4DA3FF] rounded-full blur-3xl opacity-40 scale-150" />

        {/* Planet */}
        <motion.div
          className="relative w-32 h-32 rounded-full bg-linear-to-br from-[#4DA3FF] via-[#8B5CF6] to-[#22D3EE]"
          animate={{
            boxShadow: [
              "0 0 40px rgba(77, 163, 255, 0.4)",
              "0 0 60px rgba(77, 163, 255, 0.6)",
              "0 0 40px rgba(77, 163, 255, 0.4)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Planet surface details */}
          <div className="absolute inset-0 rounded-full opacity-30">
            <div className="absolute top-6 left-8 w-8 h-8 bg-white/20 rounded-full blur-sm" />
            <div className="absolute bottom-8 right-6 w-12 h-12 bg-black/20 rounded-full blur-md" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
