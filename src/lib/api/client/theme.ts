import type { Theme } from "@/types/api/theme";
import { http } from "../http";

export const themesApi = {
  getAll: async (): Promise<Theme[]> => http.get("/themes"),
};
