import { planetApi } from "@/lib/api/client/planetApi";
import { queryClient } from "@/lib/utils/queryClient";
import { queryKeys } from "@/lib/utils/queryKeys";

export const planetDetailsLoader = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  return queryClient.prefetchQuery({
    queryKey: queryKeys.planet(id),
    queryFn: () => planetApi.get(id),
  });
};
