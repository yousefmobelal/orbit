import type { CreatePlanetInput } from "@/types/api/CreatePlanetInput";
import { http } from "../http";
import type { Planet } from "@/types/Planet";
import type { Narrative } from "@/types/Narrative";

export const planetApi = {
  create: async (
    data: CreatePlanetInput,
  ): Promise<{ planet: Planet; narrative: Narrative }> => {
    return http.post("/planet", data);
  },
};
