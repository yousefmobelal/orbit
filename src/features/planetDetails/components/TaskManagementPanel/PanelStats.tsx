import { Sparkles } from "lucide-react";

interface PanelStatsProps {
  xpProgressPercent: number;
  streak: number;
  lastCompletedDate?: string | Date;
}

function formatDateDisplay(date?: string | Date) {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PanelStats({
  xpProgressPercent,
  streak,
  lastCompletedDate,
}: PanelStatsProps) {
  const clamped = Math.max(0, Math.min(1, xpProgressPercent));
  const xpPercentage = Math.round(clamped * 100);
  const lastCompleted = formatDateDisplay(lastCompletedDate);

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
          day{streak === 1 ? "" : "s"}
        </span>
        {lastCompleted && (
          <p
            className="text-[#6B7280] text-[11px] mt-1"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Last completed: {lastCompleted}
          </p>
        )}
      </div>
    </div>
  );
}
