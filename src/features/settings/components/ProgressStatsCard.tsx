import { motion } from "framer-motion";
import { Trophy, Flame, Target, Globe } from "lucide-react";
import type { User } from "@/types/User";
import { XpProgressBar } from "@/components/shared/XpProgressBar";

interface ProgressStatsCardProps {
  user?: User;
  completedTasksCount?: number;
  planetsCreated?: number;
}

export const ProgressStatsCard = ({
  user,
  completedTasksCount = 0,
  planetsCreated = 0,
}: ProgressStatsCardProps) => {
  const stats = [
    {
      icon: Trophy,
      label: "Global Level",
      value: user?.globalLevel || 0,
      color: "#22D3EE",
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: `${user?.globalStreak || 0} days`,
      color: "#F97316",
    },
    {
      icon: Target,
      label: "Tasks Completed",
      value: completedTasksCount,
      color: "#10B981",
    },
    {
      icon: Globe,
      label: "Planets Created",
      value: planetsCreated,
      color: "#8B5CF6",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#121826] rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <h2
        className="text-xl font-semibold text-[#F9FAFB] mb-6"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Progress & Stats
      </h2>

      <div className="mb-6">
        <XpProgressBar xp={user?.globalXP || 0} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="bg-[#0B0F1A] rounded-2xl p-4 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="size-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${stat.color}15`,
                  }}
                >
                  <Icon className="size-5" style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-[#9CA3AF] text-sm mb-1">{stat.label}</p>
              <p
                className="text-2xl font-bold"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  color: stat.color,
                }}
              >
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
