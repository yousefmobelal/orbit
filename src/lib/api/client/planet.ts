import type { CreatePlanetInput } from "@/types/api/CreatePlanetInput";
import { http } from "../http";
import type { PlanetResponse } from "@/types/Planet";

export const planetApi = {
  create: async (data: CreatePlanetInput): Promise<PlanetResponse> => {
    return http.post("/planets", data);
  },
};
