import { useEffect, useState } from "react";
import { Planet } from "@/components/shared/Planet";
import { Input } from "@/components/ui/input";
import { themesApi } from "@/lib/api/client/themeApi";
import { planetApi } from "@/lib/api/client/planetApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "@/components/shared/Loader";
import { toast } from "@/lib/utils/toast";
import { ErrorState } from "@/components/shared/ErrorState";
import type { Theme } from "@/types/Theme";
import { queryKeys } from "@/lib/utils/queryKeys";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AddPlanetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPlanetDialog({ open, onOpenChange }: AddPlanetDialogProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [planetName, setPlanetName] = useState("");
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  const isValidName = planetName.trim().length > 3;

  const {
    data: themeColors,
    isLoading: themesLoading,
    error: themesError,
  } = useQuery({
    queryKey: queryKeys.themes,
    queryFn: themesApi.getAll,
    staleTime: 1000 * 60 * 5,
    enabled: open,
  });

  const selectedTheme: Theme | null =
    themeColors && themeColors.length > 0
      ? (themeColors.find((t) => t._id === selectedThemeId) ?? themeColors[0])
      : null;

  const createPlanetMutation = useMutation({
    mutationFn: (data: { title: string; theme: string }) =>
      planetApi.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.planets });
      setPlanetName("");
      setSelectedThemeId(null);
      onOpenChange(false);
      navigate(`/app/planet/${data.planet._id}`);
      toast.success("Planet created!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (themesError) {
      toast.error(themesError.message);
    }
  }, [themesError]);

  function handleSubmit() {
    if (!isValidName || !selectedTheme) return;
    createPlanetMutation.mutate({
      title: planetName.trim(),
      theme: selectedTheme._id,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-md:w-[95%] min-w-fit max-h-[90vh] overflow-y-auto bg-[#0F172A] border border-white/10">
        <DialogHeader>
          <DialogTitle
            className="text-[#F9FAFB]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Add New Planet
          </DialogTitle>
          <DialogDescription className="text-[#9CA3AF]">
            Give your planet a name and choose its theme color.
          </DialogDescription>
        </DialogHeader>

        {themesLoading || !selectedTheme ? (
          <div className="py-8 flex justify-center">
            <Loader />
          </div>
        ) : themesError ? (
          <ErrorState message={themesError.message} />
        ) : (
          <div className="grid md:grid-cols-2 gap-12 items-center pt-2">
            <div className="flex justify-center">
              <Planet
                fromColor={selectedTheme.fromColor}
                toColor={selectedTheme.toColor}
                size={48}
              />
            </div>

            <div className="space-y-4 text-start">
              <div>
                <Input
                  type="text"
                  label="Planet Name"
                  value={planetName}
                  onChange={(e) => setPlanetName(e.target.value)}
                  placeholder="Enter planet name..."
                />
              </div>

              <div>
                <label
                  className="block mb-3 text-[#F9FAFB]"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  Theme Color
                </label>
                <div className="grid grid-cols-3 gap-y-3 gap-x-5">
                  {themeColors?.map((theme) => {
                    const isSelected = selectedTheme?._id === theme._id;
                    return (
                      <button
                        key={theme._id}
                        type="button"
                        onClick={() => setSelectedThemeId(theme._id)}
                        className={`w-25 aspect-square p-4 rounded-xl bg-[#121826] border transition-all ${
                          isSelected
                            ? "border-2 scale-105"
                            : "border border-white/10 hover:border-white/20"
                        }`}
                        style={{
                          borderColor: isSelected ? theme.fromColor : undefined,
                        }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative">
                            {isSelected && (
                              <div
                                className="absolute inset-0 rounded-full blur-md opacity-50"
                                style={{ backgroundColor: theme.fromColor }}
                              />
                            )}
                            <div
                              className="relative w-10 h-10 rounded-full"
                              style={{
                                background: `linear-gradient(to bottom right, ${theme.fromColor}, ${theme.toColor})`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-[#9CA3AF]">
                            {theme.name.split(" ")[0]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isValidName || createPlanetMutation.isPending}
                className={`w-full py-4 rounded-full bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] text-white text-lg transition-all ${
                  isValidName && !createPlanetMutation.isPending
                    ? ""
                    : "opacity-50 cursor-not-allowed"
                }`}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                }}
              >
                {createPlanetMutation.isPending ? "Creating..." : "Add Planet"}
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
