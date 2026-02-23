import { motion } from "framer-motion";
import { useState } from "react";
import { Stars } from "lucide-react";

export const GalaxyCustomizationCard = () => {
  const [customization, setCustomization] = useState({
    starDensity: 50,
    planetGlowIntensity: 70,
    galaxyVisualStyle: "realistic",
  });

  const visualStyles = [
    {
      id: "realistic",
      name: "Realistic",
      description: "Photorealistic space visuals",
    },
    {
      id: "stylized",
      name: "Stylized",
      description: "Artistic, painted look",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean and simple",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-[#121826] rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-xl bg-linear-to-br from-[#22D3EE]/20 to-[#10B981]/20 flex items-center justify-center">
          <Stars className="size-5 text-[#22D3EE]" />
        </div>
        <h2
          className="text-xl font-semibold text-[#F9FAFB]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Galaxy Customization
        </h2>
      </div>

      <div className="space-y-6">
        {/* Star Density Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-[#9CA3AF] text-sm">Star Density</label>
            <span className="text-[#22D3EE] font-medium">
              {customization.starDensity}%
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={customization.starDensity}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  starDensity: parseInt(e.target.value),
                }))
              }
              className="w-full h-2 bg-[#0B0F1A] rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #22D3EE 0%, #22D3EE ${customization.starDensity}%, #0B0F1A ${customization.starDensity}%, #0B0F1A 100%)`,
              }}
            />
          </div>
        </div>

        {/* Planet Glow Intensity Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-[#9CA3AF] text-sm">
              Planet Glow Intensity
            </label>
            <span className="text-[#8B5CF6] font-medium">
              {customization.planetGlowIntensity}%
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={customization.planetGlowIntensity}
              onChange={(e) =>
                setCustomization((prev) => ({
                  ...prev,
                  planetGlowIntensity: parseInt(e.target.value),
                }))
              }
              className="w-full h-2 bg-[#0B0F1A] rounded-full appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${customization.planetGlowIntensity}%, #0B0F1A ${customization.planetGlowIntensity}%, #0B0F1A 100%)`,
              }}
            />
          </div>
        </div>

        {/* Visual Style Selector */}
        <div>
          <label className="text-[#9CA3AF] text-sm mb-3 block">
            Galaxy Visual Style
          </label>
          <div className="space-y-3">
            {visualStyles.map((style) => (
              <motion.button
                key={style.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setCustomization((prev) => ({
                    ...prev,
                    galaxyVisualStyle: style.id,
                  }))
                }
                className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                  customization.galaxyVisualStyle === style.id
                    ? "border-[#22D3EE] bg-[#22D3EE]/10"
                    : "border-white/10 bg-[#0B0F1A]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#F9FAFB] font-medium mb-1">
                      {style.name}
                    </p>
                    <p className="text-[#9CA3AF] text-sm">
                      {style.description}
                    </p>
                  </div>
                  <div
                    className={`size-5 rounded-full border-2 flex items-center justify-center ${
                      customization.galaxyVisualStyle === style.id
                        ? "border-[#22D3EE]"
                        : "border-white/30"
                    }`}
                  >
                    {customization.galaxyVisualStyle === style.id && (
                      <div className="size-3 rounded-full bg-[#22D3EE]" />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4DA3FF, #8B5CF6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(77, 163, 255, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4DA3FF, #8B5CF6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(77, 163, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
};
