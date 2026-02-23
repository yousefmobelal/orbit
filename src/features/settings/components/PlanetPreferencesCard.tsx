import { motion } from "framer-motion";
import { useState } from "react";

export const PlanetPreferencesCard = () => {
  const [preferences, setPreferences] = useState({
    defaultTheme: "aurora-blue",
    enableAnimations: true,
    showTaskLabels: true,
    orbitSpeed: "normal",
  });

  const themes = [
    { id: "aurora-blue", name: "Aurora Blue", color: "#4DA3FF" },
    { id: "solar-gold", name: "Solar Gold", color: "#FBBF24" },
    { id: "crimson-nova", name: "Crimson Nova", color: "#EF4444" },
    { id: "emerald-pulse", name: "Emerald Pulse", color: "#10B981" },
    { id: "violet-drift", name: "Violet Drift", color: "#8B5CF6" },
    { id: "silver-orbit", name: "Silver Orbit", color: "#94A3B8" },
  ];

  const orbitSpeeds = ["slow", "normal", "fast"];

  const handleToggle = (key: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-[#121826] rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <h2
        className="text-xl font-semibold text-[#F9FAFB] mb-6"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Planet Preferences
      </h2>

      {/* Theme Selector */}
      <div className="mb-6">
        <label className="text-[#9CA3AF] text-sm mb-3 block">
          Default Planet Theme
        </label>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <motion.button
              key={theme.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setPreferences((prev) => ({ ...prev, defaultTheme: theme.id }))
              }
              className={`p-3 rounded-xl border transition-all duration-300 ${
                preferences.defaultTheme === theme.id
                  ? "border-white/40 bg-white/5"
                  : "border-white/10 bg-[#0B0F1A]"
              }`}
            >
              <div
                className="size-8 rounded-full mx-auto mb-2"
                style={{
                  backgroundColor: theme.color,
                  boxShadow: `0 0 20px ${theme.color}40`,
                }}
              />
              <p className="text-[#F9FAFB] text-xs text-center">{theme.name}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-4 mb-6">
        <ToggleItem
          label="Enable Animations"
          checked={preferences.enableAnimations}
          onChange={() => handleToggle("enableAnimations")}
        />
        <ToggleItem
          label="Show Task Labels"
          checked={preferences.showTaskLabels}
          onChange={() => handleToggle("showTaskLabels")}
        />
      </div>

      {/* Orbit Speed Selector */}
      <div>
        <label className="text-[#9CA3AF] text-sm mb-3 block">Orbit Speed</label>
        <div className="flex gap-2">
          {orbitSpeeds.map((speed) => (
            <motion.button
              key={speed}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setPreferences((prev) => ({ ...prev, orbitSpeed: speed }))
              }
              className={`flex-1 py-3 rounded-xl border transition-all duration-300 capitalize ${
                preferences.orbitSpeed === speed
                  ? "border-[#22D3EE] bg-[#22D3EE]/10 text-[#22D3EE]"
                  : "border-white/10 bg-[#0B0F1A] text-[#9CA3AF]"
              }`}
            >
              {speed}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface ToggleItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const ToggleItem = ({ label, checked, onChange }: ToggleItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0F1A] border border-white/5">
      <span className="text-[#F9FAFB]">{label}</span>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
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
