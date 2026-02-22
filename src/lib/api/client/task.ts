import type { CreateTaskInput } from "@/types/api/CreateTaskInpu";
import { http } from "../http";

export const taskApi = {
  create: async (data: CreateTaskInput): Promise<{ taskId: string }> => {
    return http.post("/tasks", data);
  },
};
