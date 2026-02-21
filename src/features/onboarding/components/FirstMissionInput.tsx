import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface FirstMissionInputProps {
  mission: string;
  setMission: (value: string) => void;
  handleAddMission: () => void;
  showXP: boolean;
}

export const FirstMissionInput: React.FC<FirstMissionInputProps> = ({
  mission,
  setMission,
  handleAddMission,
  showXP,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && mission.trim()) {
      handleAddMission();
    }
  };
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="relative">
        <input
          type="text"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add your first mission (e.g., Solve 2 LeetCode problems)"
          className="w-full px-6 py-4 pr-14 rounded-xl bg-[#121826] border border-white/10 text-[#F9FAFB] placeholder-[#9CA3AF] focus:border-[#4DA3FF] focus:outline-none transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
          disabled={showXP}
        />
        <button
          onClick={handleAddMission}
          disabled={!mission.trim() || showXP}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
            mission.trim() && !showXP
              ? "bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] hover:scale-110"
              : "bg-[#9CA3AF]/20 cursor-not-allowed"
          }`}
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>
    </motion.div>
  );
};
