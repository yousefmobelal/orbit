import React from "react";
import { motion } from "framer-motion";

interface XpProgressBarProps {
  /** Progress in range 0–1 (preferred). Falls back to currentXP/requiredXPForNextLevel if omitted. */
  progressPercent?: number | null;
  currentXP?: number | null;
  requiredXPForNextLevel?: number | null;
  xpToNextLevel?: number | null;
}

export const XpProgressBar: React.FC<XpProgressBarProps> = ({
  progressPercent,
  currentXP,
  requiredXPForNextLevel,
  xpToNextLevel,
}) => {
  const safeRequired = requiredXPForNextLevel ?? 0;
  let clamped = progressPercent ?? null;

  if (clamped == null && safeRequired > 0 && currentXP != null) {
    clamped = currentXP / safeRequired;
  }

  if (clamped == null || Number.isNaN(clamped)) {
    clamped = 0;
  }

  clamped = Math.max(0, Math.min(1, clamped));
  const percentage = Math.round(clamped * 100);

  const showRatio =
    safeRequired > 0 && currentXP != null && currentXP >= 0 && !Number.isNaN(currentXP);
  const showToNext =
    !showRatio &&
    safeRequired > 0 &&
    xpToNextLevel != null &&
    xpToNextLevel >= 0 &&
    !Number.isNaN(xpToNextLevel);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[#9CA3AF]">XP Progress</span>
        {showRatio && (
          <span
            className="text-[#22D3EE]"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
            }}
          >
            {currentXP} / {safeRequired} XP
          </span>
        )}
        {!showRatio && showToNext && (
          <span
            className="text-[#22D3EE]"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
            }}
          >
            {xpToNextLevel} XP to next level
          </span>
        )}
      </div>
      <div className="h-3 bg-[#0B0F1A] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-[#22D3EE] to-[#4DA3FF]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)",
          }}
        />
      </div>
    </div>
  );
};
