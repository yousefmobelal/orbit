import type { SignupData } from "@/types/api/SignupData";
import type { AuthResponse } from "@/types/api/AuthResponse";
import { http } from "../http";

export const authApi = {
  signup: async (data: SignupData): Promise<AuthResponse> => {
    return http.post("/auth/signup", data);
  },
};
