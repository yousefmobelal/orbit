import type { CreateTaskInput } from "@/types/api/CreateTaskInput";
import { http } from "../http";

export const taskApi = {
  create: async (data: CreateTaskInput): Promise<{ taskId: string }> => {
    return http.post("/task", data);
  },
};
