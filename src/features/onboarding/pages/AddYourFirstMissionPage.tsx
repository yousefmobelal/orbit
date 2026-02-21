import { useState } from "react";
import { motion } from "framer-motion";
import { FirstMissionPlanetXpCard } from "../components/FirstMissionPlanetXpCard";
import { FirstMissionInput } from "../components/FirstMissionInput";
import { FirstMissionEnterGalaxyButton } from "../components/FirstMissionEnterGalaxyButton";

export function AddYourFirstMissionPage() {
  const [showXP, setShowXP] = useState(false);
  const [xpProgress, setXpProgress] = useState(0);
  const [mission, setMission] = useState("");

  const handleAddMission = () => {
    if (mission.trim()) {
      // Show XP animation
      setShowXP(true);

      // Animate XP bar
      setTimeout(() => {
        setXpProgress(15);
      }, 500);
    }
  };

  return (
    <>
      <motion.h2
        className="text-4xl md:text-5xl text-center mb-4 text-[#F9FAFB]"
        style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Add Your First Mission
      </motion.h2>
      <motion.p
        className="text-center text-[#9CA3AF] text-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Start building momentum for {"planetName"}
      </motion.p>
      <FirstMissionPlanetXpCard showXP={showXP} xpProgress={xpProgress} />
      <FirstMissionInput
        mission={mission}
        setMission={setMission}
        handleAddMission={handleAddMission}
        showXP={showXP}
      />
      {showXP && <FirstMissionEnterGalaxyButton />}
    </>
  );
}
