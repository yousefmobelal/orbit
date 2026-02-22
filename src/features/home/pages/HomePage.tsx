import { ErrorState } from "@/components/shared/ErrorState";
import { Loader } from "@/components/shared/Loader";
import { userApi } from "@/lib/api/client/userApi";
import { queryKeys } from "@/lib/utils/queryKeys";
import { toast } from "@/lib/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { HomeHeader } from "../components/HomeHeader";
import { SettingsButton } from "../components/SettingsButton";
import { HomePlanets } from "../components/HomePlanets";

export const HomePage = () => {
  const {
    data: user,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: userApi.getCurrentUser,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="relative h-screen pt-8 px-2 md:px-5 lg:px-8">
      <HomeHeader user={user} />
      <SettingsButton />

      <HomePlanets />
    </div>
  );
};
