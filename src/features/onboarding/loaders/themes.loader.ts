import { themesApi } from "@/lib/api/client/themeApi";
import { queryClient } from "@/lib/utils/queryClient";
import { queryKeys } from "@/lib/utils/queryKeys";

export function themesLoader() {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.themes,
    queryFn: () => themesApi.getAll(),
  });
}
