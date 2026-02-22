import { Title } from "@/components/shared/Title";
import { XpProgressBar } from "@/components/shared/XpProgressBar";
import type { User } from "@/types/User";
import { Flame } from "lucide-react";
import React from "react";

export const HomeHeader: React.FC<{ user?: User }> = ({ user }) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col items-start justify-start">
        <div className="flex gap-5 justify-center items-center">
          <Title size="sm">{user?.name}'s Galaxy</Title>
          <div className="px-4 py-1 w-fit rounded-full bg-gray-800 border border-[#22D3EE]/30">
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
          <XpProgressBar xp={user?.globalXP || 0} />
        </div>
      </div>

      <div>
        <p className="text-md text-gray-400 font-bold">Current Streak</p>
        <div className="flex items-center mt-1">
          <Flame className="text-orange-600" />
          <span className="text-orange-600 text-3xl font-bold">
            {user?.globalStreak || 0}
          </span>
          <span className="text-gray-400 font-bold text-md ms-2">days</span>
        </div>
      </div>
    </div>
  );
};
