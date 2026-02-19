import { motion } from "framer-motion";

export const ThirdSlide = () => {
  return (
    <div className="bg-[#121826] rounded-2xl p-8 w-80 backdrop-blur-sm border border-white/10 mx-auto">
      <motion.div
        className="text-7xl mb-4 inline-block"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🔥
      </motion.div>

      <p
        className="text-6xl text-[#F97316] mb-2"
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        5
      </p>

      <p
        className="text-xl text-[#F97316] mb-6"
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 600,
          letterSpacing: "0.05em",
        }}
      >
        DAY STREAK
      </p>

      <div className="flex justify-center gap-2">
        {Array.from({ length: 7 }, (_, i) => {
          return (
            <motion.div
              key={i}
              className={`w-8 h-8 rounded-lg ${
                i < 5
                  ? "bg-[#F97316] shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                  : "bg-[#0B0F1A] border border-white/10"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
            />
          );
        })}
      </div>
    </div>
  );
};
