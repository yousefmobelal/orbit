import { Title } from "@/components/shared/Title";
import { XpProgressBar } from "@/components/shared/XpProgressBar";
import type { User } from "@/types/User";
import { Flame } from "lucide-react";
import React from "react";

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

export const HomeHeader: React.FC<{ user?: User }> = ({ user }) => {
  const lastActive = formatDateDisplay(user?.lastActiveDate);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start">
      <div className="flex flex-col items-start justify-start">
        <div className="flex gap-5 justify-center items-center">
          <Title size="xs">{user?.name}'s Galaxy</Title>
          <div className="px-4 py-1 w-fit rounded-full bg-gray-800 border border-[#22D3EE]/30 max-md:hidden">
            <span
              className="text-[#22D3EE] text-md"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
              }}
            >
              Level {user?.globalLevel}
            </span>
          </div>
        </div>
        <div className="w-75">
          <XpProgressBar
            progressPercent={user?.xpProgressPercent ?? 0}
            currentXP={user?.globalXP ?? 0}
            requiredXPForNextLevel={user?.requiredXPForNextLevel ?? 0}
            xpToNextLevel={user?.xpToNextLevel ?? 0}
          />
        </div>
      </div>

      <div className="max-md:hidden text-right">
        <p className="text-md text-gray-400 font-bold">Current streak</p>
        <div className="flex items-center justify-end mt-1 gap-2">
          <Flame className="text-orange-600" />
          <span className="text-orange-600 text-3xl font-bold">
            {user?.globalStreak ?? 0}
          </span>
          <span className="text-gray-400 font-bold text-md ms-1">
            day{(user?.globalStreak ?? 0) === 1 ? "" : "s"}
          </span>
        </div>
        {lastActive && (
          <p className="text-xs text-gray-400 mt-1">
            Last active: {lastActive}
          </p>
        )}
      </div>
    </div>
  );
};
