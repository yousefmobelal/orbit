import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Dumbbell,
  BookOpen,
  GraduationCap,
  Heart,
  Palette,
} from "lucide-react";
import { GoalCard } from "../components/GoalCard";

const categories = [
  {
    id: "coding",
    name: "Coding",
    icon: Code2,
    gradient: "from-[#4DA3FF] to-[#22D3EE]",
    glow: "rgba(77, 163, 255, 0.5)",
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: Dumbbell,
    gradient: "from-[#F97316] to-[#FBBF24]",
    glow: "rgba(249, 115, 22, 0.5)",
  },
  {
    id: "reading",
    name: "Reading",
    icon: BookOpen,
    gradient: "from-[#8B5CF6] to-[#EC4899]",
    glow: "rgba(139, 92, 246, 0.5)",
  },
  {
    id: "learning",
    name: "Learning",
    icon: GraduationCap,
    gradient: "from-[#10B981] to-[#22D3EE]",
    glow: "rgba(16, 185, 129, 0.5)",
  },
  {
    id: "health",
    name: "Health",
    icon: Heart,
    gradient: "from-[#EF4444] to-[#F97316]",
    glow: "rgba(239, 68, 68, 0.5)",
  },
  {
    id: "creative",
    name: "Creative",
    icon: Palette,
    gradient: "from-[#FBBF24] to-[#10B981]",
    glow: "rgba(251, 191, 36, 0.5)",
  },
];

export function ChooseFirstGoal() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {};

  return (
    <div className="relative z-10 w-full max-w-4xl">
      <motion.h2
        className="text-4xl md:text-5xl text-center mb-4 text-[#F9FAFB]"
        style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        What are you building first?
      </motion.h2>

      <motion.p
        className="text-center text-[#9CA3AF] text-lg mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Choose a category for your first planet
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {categories.map((category, index) => {
          const isSelected = selected === category.id;

          return (
            <GoalCard
              key={category.id}
              category={category}
              isSelected={isSelected}
              setSelected={setSelected}
              index={index}
            />
          );
        })}
      </div>

      <div className="text-center">
        <motion.button
          onClick={handleContinue}
          disabled={!selected}
          className={` px-10 py-4 rounded-full bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] text-white text-lg  transition-all ${
            selected ? "" : "opacity-50 cursor-not-allowed"
          }`}
          style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
          whileHover={selected ? { scale: 1.05 } : {}}
          whileTap={selected ? { scale: 0.95 } : {}}
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}
