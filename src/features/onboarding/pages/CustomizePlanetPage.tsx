import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Planet } from "@/components/shared/Planet";
import { Input } from "@/components/ui/input";
import { themesApi } from "@/lib/api/client/themeApi";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/shared/Loader";
import { toast } from "@/lib/utils/toast";
import { ErrorState } from "@/components/shared/ErrorState";
import type { Theme } from "@/types/Theme";
import { queryKeys } from "@/lib/utils/queryKeys";
import { useNavigate } from "react-router-dom";
import { Title } from "@/components/shared/Title";
import { Subtitle } from "@/components/shared/Subtitle";
import { useOnBoardingStore } from "@/store/onboarding-store";

export function CustomizePlanetPage() {
  const setPlanetData = useOnBoardingStore((s) => s.setFirstPlanetData);
  const navigate = useNavigate();
  const [planetName, setPlanetName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  function isValidName() {
    return planetName.length > 3;
  }

  const {
    data: themeColors,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.themes,
    queryFn: themesApi.getAll,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (themeColors && !selectedTheme) {
    setSelectedTheme(themeColors[0]);
  }

  if (isLoading || !selectedTheme) return <Loader />;

  if (error) return <ErrorState message={error.message} />;

  function onSubmit() {
    setPlanetData({
      name: planetName,
      theme: selectedTheme!._id,
    });
    navigate("/add-first-mission");
  }

  return (
    <>
      <Title>Customize Your Planet</Title>

      <Subtitle>Give your planet a name and choose its theme color.</Subtitle>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Planet
          fromColor={selectedTheme.fromColor}
          toColor={selectedTheme.toColor}
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
              {themeColors?.map((theme) => (
                <button
                  key={theme._id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`p-4 rounded-xl bg-[#121826] border transition-all ${
                    selectedTheme._id === theme._id
                      ? "border-2 scale-105"
                      : "border border-white/10 hover:border-white/20"
                  }`}
                  style={{
                    borderColor:
                      selectedTheme._id === theme._id
                        ? theme.fromColor
                        : undefined,
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      {selectedTheme._id === theme._id && (
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
              onClick={onSubmit}
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
