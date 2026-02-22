import type { CreateTaskInput } from "@/types/api/CreateTaskInput";
import type { Task } from "@/types/Task";
import { http } from "../http";

export const taskApi = {
  create: async (data: CreateTaskInput): Promise<{ taskId: string }> => {
    return http.post("/task", data);
  },
  getByPlanetId: async (planetId: string): Promise<Task[]> => {
    return http.get(`/task/planet/${planetId}`);
  },
};
