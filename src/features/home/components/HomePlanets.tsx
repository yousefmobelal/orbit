import { useEffect } from "react";

import { SpinningPlanet } from "@/components/shared/SpinningPlanet";
import { OrbitRing } from "@/components/shared/OrbitRing";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/utils/queryKeys";
import { planetApi } from "@/lib/api/client/planetApi";
import { toast } from "@/lib/utils/toast";
import { ErrorState } from "@/components/shared/ErrorState";
import { useNavigate } from "react-router-dom";

export const HomePlanets = () => {
  const navigate = useNavigate();
  const {
    data: planets,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.planets,
    queryFn: planetApi.getAll,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  if (error) return <ErrorState message={error.message} onRetry={refetch} />;
  const planetsRadius = [60, 95, 135, 180, 230, 285];
  const orbitDuration = [15, 20, 28, 38, 50, 65];
  const spinDuration = [8, 10, 12, 14, 16, 18];
  const startAngle = [0, 60, 120, 180, 240, 300];
  if (!isLoading && planets) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: planets.length }).map((_, i) => (
          <OrbitRing key={i} radius={planetsRadius[i]} opacity={0.1} />
        ))}

        {planets.map((planet, index) => (
          <SpinningPlanet
            onClick={() => navigate(`planet/${planet._id}`)}
            key={planet._id}
            fromColor={planet.theme.fromColor}
            toColor={planet.theme.toColor}
            size={12 + index * 2}
            orbitRadius={planetsRadius[index]}
            orbitDuration={orbitDuration[index]}
            spinDuration={spinDuration[index]}
            startAngle={startAngle[index]}
          />
        ))}
      </div>
    );
  }
};
