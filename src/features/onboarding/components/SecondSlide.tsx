import { Planet } from "@/components/shared/Planet";
import { motion } from "framer-motion";

export const SecondSlide = () => {
  return (
    <div className="bg-[#121826] rounded-2xl p-6 w-80 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <Planet fromColor="#10B981" toColor="#3B82F6" />

        <h3
          className="text-[#F9FAFB]"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
          }}
        >
          Fitness Journey
        </h3>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0B0F1A]/50">
          <div className="w-5 h-5 rounded border-2 border-[#9CA3AF]" />
          <span className="text-[#9CA3AF]">Run 5km</span>
        </div>

        <motion.div
          className="flex justify-between items-center gap-3 p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/30 overflow-hidden"
          initial={{ backgroundColor: "rgba(11, 15, 26, 0.5)" }}
          animate={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="w-5 h-5 rounded bg-[#10B981] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <span className="text-[#F9FAFB]">50 push-ups</span>

          <motion.div
            className="px-3 py-1 rounded-full bg-[#22D3EE] text-white text-sm"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
            }}
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            +15 XP
          </motion.div>
        </motion.div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0B0F1A]/50">
          <div className="w-5 h-5 rounded border-2 border-[#9CA3AF]" />
          <span className="text-[#9CA3AF]">Yoga session</span>
        </div>
      </div>
    </div>
  );
};
