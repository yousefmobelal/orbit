import type { User } from "@/types/User";
import { http } from "../http";

export interface UpdateProfileInput {
  name?: string;
  avatar?: File;
}

export const userApi = {
  getCurrentUser: async (): Promise<User> => http.get("/user/me"),

  updateProfile: async (data: UpdateProfileInput): Promise<User> => {
    // If there's an avatar, use FormData (multipart/form-data)
    if (data.avatar) {
      const formData = new FormData();

      if (data.name) {
        formData.append("name", data.name);
      }

      formData.append("avatar", data.avatar);

      return http.patch("/user/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    // If only updating name, send as JSON
    return http.patch("/user/me", {
      name: data.name,
    });
  },
};
