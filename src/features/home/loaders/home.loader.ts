import { planetApi } from "@/lib/api/client/planetApi";
import { userApi } from "@/lib/api/client/userApi";
import { queryClient } from "@/lib/utils/queryClient";
import { queryKeys } from "@/lib/utils/queryKeys";

export const homeLoader = async () => {
  Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.currentUser,
      queryFn: userApi.getCurrentUser,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.planets,
      queryFn: planetApi.getAll,
    }),
  ]);
  return null;
};
