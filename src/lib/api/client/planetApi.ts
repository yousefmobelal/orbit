import type { CreatePlanetInput } from "@/types/api/CreatePlanetInput";
import { http } from "../http";
import type { Planet } from "@/types/Planet";
import type { Narrative } from "@/types/Narrative";

export const planetApi = {
  getAll: async (): Promise<Planet[]> => {
    return http.get("/planet");
  },
  get: async (id: string): Promise<Planet> => {
    return http.get(`/planet/${id}`);
  },
  create: async (
    data: CreatePlanetInput,
  ): Promise<{ planet: Planet; narrative: Narrative }> => {
    return http.post("/planet", data);
  },
};
