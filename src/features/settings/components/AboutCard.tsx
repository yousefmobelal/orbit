import { motion } from "framer-motion";
import {
  Info,
  Rocket,
  Target,
  Zap,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export const AboutCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-[#121826] rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-xl bg-linear-to-br from-[#FBBF24]/20 to-[#F97316]/20 flex items-center justify-center">
          <Info className="size-5 text-[#FBBF24]" />
        </div>
        <h2
          className="text-xl font-semibold text-[#F9FAFB]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          About Orbit
        </h2>
      </div>

      <div className="p-5 rounded-xl bg-[#0B0F1A] border border-white/5 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="size-12 rounded-xl bg-linear-to-br from-[#4DA3FF] to-[#8B5CF6] flex items-center justify-center shrink-0">
            <Rocket className="size-6 text-white" />
          </div>
          <div>
            <h3
              className="text-lg font-semibold text-[#F9FAFB] mb-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Transform Your Tasks into a Galaxy
            </h3>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              Orbit is a gamified task management app that turns your to-do list
              into an interactive space adventure. Create planets for different
              areas of your life, add missions that orbit around them, and watch
              your productivity galaxy grow.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <p className="text-[#9CA3AF] text-xs uppercase tracking-wide mb-2">
          Key Features
        </p>

        <FeatureItem
          icon={Target}
          title="Planet-Based Organization"
          description="Group your tasks into themed planets for better focus"
          color="#4DA3FF"
        />

        <FeatureItem
          icon={Zap}
          title="Gamification System"
          description="Earn XP, level up, and maintain streaks as you complete tasks"
          color="#22D3EE"
        />

        <FeatureItem
          icon={Trophy}
          title="Progress Tracking"
          description="Visualize your achievements and productivity journey"
          color="#FBBF24"
        />
      </div>

      <div className="pt-6 border-t border-white/10 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[#9CA3AF] text-sm">Version</span>
          <span
            className="text-[#F9FAFB] font-semibold"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            v1.0.0
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#9CA3AF] text-sm">Release Date</span>
          <span className="text-[#F9FAFB]">February 2026</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-center text-[#9CA3AF] text-sm">
          Made with <span className="text-[#EF4444]">❤️</span> for productive
          space explorers
        </p>
      </div>
    </motion.div>
  );
};

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const FeatureItem = ({
  icon: Icon,
  title,
  description,
  color,
}: FeatureItemProps) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0B0F1A]/50">
      <div
        className="size-8 rounded-lg flex items-center justify-center shrink-0"
        style={{
          backgroundColor: `${color}15`,
        }}
      >
        <Icon className="size-4" style={{ color }} />
      </div>
      <div className="flex-1">
        <p className="text-[#F9FAFB] font-medium text-sm mb-1">{title}</p>
        <p className="text-[#9CA3AF] text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
