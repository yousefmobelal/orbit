import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PanelHeaderProps {
  planetName: string;
  level: number;
  xp: number;
  requiredXPForNextLevel: number;
  onClose: () => void;
}

export function PanelHeader({
  planetName,
  level,
  xp,
  requiredXPForNextLevel,
  onClose,
}: PanelHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        <div>
          <h2
            className="text-2xl text-[#F9FAFB]"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
            }}
          >
            {planetName}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="px-2 py-0.5 rounded-full bg-[#22D3EE]/20 border border-[#22D3EE]/30">
              <span
                className="text-[#22D3EE] text-xs"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                }}
              >
                Level {level}
              </span>
            </div>
            <span
              className="text-[#9CA3AF] text-xs"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {requiredXPForNextLevel > 0
                ? `${xp}/${requiredXPForNextLevel} XP`
                : `${xp} XP`}
            </span>
          </div>
        </div>
      </div>
      <Button onClick={onClose} variant="ghost" size="icon">
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
}
