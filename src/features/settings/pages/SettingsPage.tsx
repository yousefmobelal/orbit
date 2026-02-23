import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/lib/api/client/userApi";
import { queryKeys } from "@/lib/utils/queryKeys";
import { Loader } from "@/components/shared/Loader";
import { SettingsHeader } from "../components/SettingsHeader";
import { ProfileCard } from "../components/ProfileCard";
import { ProgressStatsCard } from "../components/ProgressStatsCard";
import { NotificationsCard } from "../components/NotificationsCard";
import { AboutCard } from "../components/AboutCard";
import { AccountActionsCard } from "../components/AccountActionsCard";

// Generate stars outside of component to avoid calling Math.random during render
const generateStars = () =>
  [...Array(50)].map((_, i) => {
    const width = Math.random() * 3 + 1;
    const height = Math.random() * 3 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.7 + 0.3;
    const opacity1 = Math.random() * 0.7 + 0.3;
    const opacity2 = Math.random() * 0.3;
    const opacity3 = Math.random() * 0.7 + 0.3;
    const duration = Math.random() * 3 + 2;

    return {
      id: i,
      width,
      height,
      top,
      left,
      opacity,
      animationOpacity: [opacity1, opacity2, opacity3],
      duration,
    };
  });

const stars = generateStars();

export const SettingsPage = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: userApi.getCurrentUser,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-linear-to-b from-[#0B0F1A] to-[#030617]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0B0F1A] to-[#030617] relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              width: star.width,
              height: star.height,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: star.animationOpacity,
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <SettingsHeader />

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ProfileCard user={user} />
            <ProgressStatsCard
              user={user}
              completedTasksCount={0}
              planetsCreated={0}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <NotificationsCard />
            <AccountActionsCard />
          </div>
        </div>

        <AboutCard />
        {/* Bottom Spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
};
