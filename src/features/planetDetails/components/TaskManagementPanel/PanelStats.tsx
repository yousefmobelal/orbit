import { Sparkles } from "lucide-react";

interface PanelStatsProps {
  xp: number;
  maxXp: number;
  streak: number;
}

export function PanelStats({ xp, maxXp, streak }: PanelStatsProps) {
  const xpPercentage = Math.round((xp / maxXp) * 100);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-[#22D3EE]" />
          <span
            className="text-[#9CA3AF] text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            XP Progress
          </span>
        </div>
        <div className="h-1.5 bg-[#121826] rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-linear-to-r from-[#22D3EE] to-[#4DA3FF]"
            style={{
              width: `${xpPercentage}%`,
              boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)",
            }}
          />
        </div>
        <span
          className="text-[#22D3EE] text-sm"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
          }}
        >
          {xpPercentage}%
        </span>
      </div>

      <div className="p-3 rounded-xl bg-[#0B0F1A] border border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-[#F97316]">🔥</div>
          <span
            className="text-[#9CA3AF] text-xs"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Streak
          </span>
        </div>
        <span
          className="text-[#F97316] text-2xl"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
          }}
        >
          {streak}
        </span>
        <span
          className="text-[#9CA3AF] text-xs ml-1"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          days
        </span>
      </div>
    </div>
  );
}
