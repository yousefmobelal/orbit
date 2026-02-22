import { themesApi } from "@/lib/api/client/theme";
import { queryClient } from "@/lib/utils/queryClient";
import { queryKeys } from "@/lib/utils/queryKeys";

export function themesLoader() {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.themes,
    queryFn: () => themesApi.getAll(),
    staleTime: 1000 * 60 * 5,
  });
}
