import { motion } from "framer-motion";
import type { GoalCategory } from "../types/GoalCategory";
import type { Dispatch, SetStateAction } from "react";

export const GoalCard: React.FC<{
  category: GoalCategory;
  isSelected: boolean;
  setSelected: Dispatch<SetStateAction<string | null>>;
  index: number;
}> = ({ category, isSelected, setSelected, index }) => {
  return (
    <motion.button
      key={category.id}
      onClick={() => setSelected(category.id)}
      className={`relative group p-5 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
        isSelected
          ? "bg-[#121826] border-2"
          : "bg-[#121826] border border-white/10 hover:border-white/20"
      }`}
      style={{
        borderColor: isSelected ? category.glow : undefined,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isSelected && (
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-30"
          style={{ backgroundColor: category.glow }}
        />
      )}

      <div className="relative">
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-lg opacity-50"
              style={{ backgroundColor: category.glow }}
            />

            <div
              className={`relative size-15 rounded-full bg-linear-to-br ${category.gradient} flex items-center justify-center`}
            >
              <category.icon className="size-8 text-white" />
            </div>
          </div>
        </div>

        <h3
          className="text-xl text-center text-[#F9FAFB]"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
          }}
        >
          {category.name}
        </h3>

        {isSelected && (
          <motion.div
            className="mt-4 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`w-6 h-6 rounded-full bg-linear-to-br ${category.gradient} flex items-center justify-center`}
            >
              <svg
                className="w-4 h-4 text-white"
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
            </div>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};
