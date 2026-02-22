import type { Theme } from "@/types/Theme";
import { http } from "../http";

export const themesApi = {
  getAll: async (): Promise<Theme[]> => http.get("/themes"),
};
