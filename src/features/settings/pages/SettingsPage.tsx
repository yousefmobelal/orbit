import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/lib/api/client/userApi";
import { queryKeys } from "@/lib/utils/queryKeys";
import { Loader } from "@/components/shared/Loader";
import { SettingsHeader } from "../components/SettingsHeader";
import { ProfileCard } from "../components/ProfileCard";
import { ProgressStatsCard } from "../components/ProgressStatsCard";
import { AboutCard } from "../components/AboutCard";
import { AccountActionsCard } from "../components/AccountActionsCard";

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
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        <SettingsHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileCard user={user} />
          <AccountActionsCard />
        </div>

        <ProgressStatsCard
          user={user}
          completedTasksCount={0}
          planetsCreated={0}
        />

        <AboutCard />

        <div className="h-12" />
      </div>
    </div>
  );
};
