import type { User } from "@/types/User";
import { http } from "../http";

export const userApi = {
  getCurrentUser: async (): Promise<User> => http.get("/user/me"),
};
