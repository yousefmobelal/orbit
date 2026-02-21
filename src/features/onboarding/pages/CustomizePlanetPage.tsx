import { useState } from "react";
import { motion } from "framer-motion";
import { Planet } from "@/components/shared/Planet";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const themeColors = [
  {
    id: "aurora-blue",
    name: "Aurora Blue",
    fromColor: "#4DA3FF",
    toColor: "#22D3EE",
  },
  {
    id: "solar-gold",
    name: "Solar Gold",
    fromColor: "#FBBF24",
    toColor: "#F59E0B",
  },
  {
    id: "crimson-nova",
    name: "Crimson Nova",
    fromColor: "#EF4444",
    toColor: "#F97316",
  },
  {
    id: "emerald-pulse",
    name: "Emerald Pulse",
    fromColor: "#10B981",
    toColor: "#22D3EE",
  },
  {
    id: "violet-drift",
    name: "Violet Drift",
    fromColor: "#8B5CF6",
    toColor: "#EC4899",
  },
  {
    id: "silver-orbit",
    name: "Silver Orbit",
    fromColor: "#94A3B8",
    toColor: "#64748B",
  },
];

export function CustomizePlanetPage() {
  const navigate = useNavigate();
  const [planetName, setPlanetName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(themeColors[0]);
  function isValidName() {
    return planetName.length > 0;
  }

  return (
    <>
      <motion.h2
        className="text-4xl md:text-5xl text-center mb-4 text-[#F9FAFB]"
        style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Customize Your Planet
      </motion.h2>

      <motion.p
        className="text-center text-[#9CA3AF] text-lg mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Make it uniquely yours
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Planet
          fromColor={selectedTheme.fromColor}
          toColor={selectedTheme.toColor}
          viaColor={selectedTheme.fromColor}
          size={48}
        />

        <div className="space-y-4 text-start">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Input
              type="text"
              label="Planet Name"
              value={planetName}
              onChange={(e) => setPlanetName(e.target.value)}
              placeholder="Enter planet name..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label
              className="block mb-3 text-[#F9FAFB]"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              Theme Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              {themeColors.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-4 rounded-xl bg-[#121826] border transition-all ${
                    selectedTheme.id === theme.id
                      ? "border-2 scale-105"
                      : "border border-white/10 hover:border-white/20"
                  }`}
                  style={{
                    borderColor:
                      selectedTheme.id === theme.id
                        ? theme.fromColor
                        : undefined,
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      {selectedTheme.id === theme.id && (
                        <div
                          className="absolute inset-0 rounded-full blur-md opacity-50"
                          style={{ backgroundColor: theme.fromColor }}
                        />
                      )}
                      <div
                        className={`relative w-10 h-10 rounded-full bg-linear-to-br from-${theme.fromColor} to-${theme.toColor}`}
                        style={{
                          background: `linear-gradient(to bottom right, ${theme.fromColor},  ${theme.toColor})`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-[#9CA3AF]">
                      {theme.name.split(" ")[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => navigate("/add-first-mission")}
              disabled={!isValidName()}
              className={`w-full py-4 rounded-full bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] text-white text-lg  transition-all ${
                isValidName() ? "" : "opacity-50 cursor-not-allowed"
              }`}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
              }}
            >
              Launch Planet
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
