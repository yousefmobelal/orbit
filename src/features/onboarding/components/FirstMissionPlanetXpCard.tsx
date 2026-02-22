import { Planet } from "@/components/shared/Planet";
import { XpProgressBar } from "@/components/shared/XpProgressBar";
import { motion } from "framer-motion";

interface FirstMissionPlanetXpCardProps {
  showXP: boolean;
  xpProgress: number;
  planetName: string;
}

export const FirstMissionPlanetXpCard: React.FC<
  FirstMissionPlanetXpCardProps
> = ({ showXP, xpProgress, planetName }) => {
  const theme = { color: "#4DA3FF" };

  return (
    <motion.div
      className="bg-[#121826] rounded-2xl p-4 md:p-8 backdrop-blur-sm border border-white/10 mb-8 md:mb-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-3 md:gap-6 mb-6">
        <Planet fromColor={theme.color} toColor={theme.color} />

        <div className="flex-1 flex flex-col items-start">
          <h3
            className="text-xl md:text-2xl text-[#F9FAFB] mb-2"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
            }}
          >
            {planetName || "Planet Name"}
          </h3>
          <div className="px-2 py-0.5 w-fit rounded-full bg-[#22D3EE]/20 border border-[#22D3EE]/30">
            <span
              className="text-[#22D3EE] text-sm"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
              }}
            >
              Level 1
            </span>
          </div>
        </div>

        {showXP && (
          <motion.div
            className="px-2 py-1 md:px-4 md:py-2 rounded-full bg-[#22D3EE] text-white text-sm"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
            }}
            initial={{ scale: 0, y: -30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            +15 XP
          </motion.div>
        )}
      </div>

      <XpProgressBar xp={xpProgress} />
    </motion.div>
  );
};
