import type { SignupRequest } from "@/types/api/SignupRequest";
import type { AuthResponse } from "@/types/AuthResponse";
import { http } from "../http";
import type { LoginRequest } from "@/types/api/LoginRequest";

export const authApi = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    return http.post("/auth/register", data);
  },
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return http.post("/auth/login", data);
  },
};
