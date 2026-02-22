import React from "react";
import { motion } from "framer-motion";

export const XpProgressBar: React.FC<{ xp: number }> = ({ xp }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[#9CA3AF]">XP Progress</span>
        <span
          className="text-[#22D3EE]"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
          }}
        >
          {xp} / 100
        </span>
      </div>
      <div className="h-3 bg-[#0B0F1A] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-[#22D3EE] to-[#4DA3FF]"
          initial={{ width: 0 }}
          animate={{ width: `${xp}%` }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)",
          }}
        />
      </div>
    </div>
  );
};
