import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Volume2 } from "lucide-react";

export const ExperienceCard = () => {
  const [experience, setExperience] = useState({
    theme: "dark",
    reduceAnimations: false,
    soundEffects: true,
    backgroundMusic: false,
  });

  const handleToggle = (key: string) => {
    setExperience((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const themes = [
    { id: "dark", name: "Dark", gradient: "from-[#0B0F1A] to-[#121826]" },
    {
      id: "midnight",
      name: "Midnight",
      gradient: "from-[#030617] to-[#0F172A]",
    },
    { id: "nebula", name: "Nebula", gradient: "from-[#1E1B4B] to-[#312E81]" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-[#121826] rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-xl bg-linear-to-br from-[#8B5CF6]/20 to-[#22D3EE]/20 flex items-center justify-center">
          <Sparkles className="size-5 text-[#8B5CF6]" />
        </div>
        <h2
          className="text-xl font-semibold text-[#F9FAFB]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Experience
        </h2>
      </div>

      {/* Theme Selector */}
      <div className="mb-6">
        <label className="text-[#9CA3AF] text-sm mb-3 block">UI Theme</label>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <motion.button
              key={theme.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setExperience((prev) => ({ ...prev, theme: theme.id }))
              }
              className={`p-4 rounded-xl border transition-all duration-300 ${
                experience.theme === theme.id
                  ? "border-[#8B5CF6] bg-white/5"
                  : "border-white/10 bg-[#0B0F1A]"
              }`}
            >
              <div
                className={`h-12 rounded-lg bg-linear-to-br ${theme.gradient} mb-2`}
              />
              <p className="text-[#F9FAFB] text-sm text-center">{theme.name}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-4">
        <ToggleItem
          label="Reduce Animations"
          description="Minimize motion for better performance"
          checked={experience.reduceAnimations}
          onChange={() => handleToggle("reduceAnimations")}
        />

        <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0B0F1A] border border-white/5">
          <Volume2 className="size-5 text-[#22D3EE]" />
          <div className="flex-1">
            <p className="text-[#F9FAFB] font-medium">Audio</p>
          </div>
        </div>

        <div className="ml-4 space-y-4">
          <ToggleItem
            label="Sound Effects"
            description="Play sounds on interactions"
            checked={experience.soundEffects}
            onChange={() => handleToggle("soundEffects")}
          />
          <ToggleItem
            label="Background Music"
            description="Ambient space music"
            checked={experience.backgroundMusic}
            onChange={() => handleToggle("backgroundMusic")}
          />
        </div>
      </div>
    </motion.div>
  );
};

interface ToggleItemProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}

const ToggleItem = ({
  label,
  description,
  checked,
  onChange,
}: ToggleItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0F1A] border border-white/5 hover:border-white/10 transition-colors duration-300">
      <div className="flex-1">
        <p className="text-[#F9FAFB] font-medium mb-1">{label}</p>
        {description && <p className="text-[#9CA3AF] text-sm">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 ml-4 ${
          checked
            ? "bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6]"
            : "bg-[#374151]"
        }`}
      >
        <motion.div
          className="absolute top-1 size-4 bg-white rounded-full"
          animate={{ x: checked ? 26 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
};
