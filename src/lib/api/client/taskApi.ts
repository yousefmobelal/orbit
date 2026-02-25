import type { CreateTaskInput } from "@/types/api/CreateTaskInput";
import type { UpdateTaskInput } from "@/types/api/UpdateTaskInput";
import type { Task } from "@/types/Task";
import { http } from "../http";

export const taskApi = {
  create: async (data: CreateTaskInput): Promise<{ taskId: string }> => {
    return http.post("/task", data);
  },
  getByPlanetId: async (planetId: string): Promise<Task[]> => {
    return http.get(`/task/planet/${planetId}`);
  },
  getActiveTasksByPlanetId: async (planetId: string): Promise<Task[]> => {
    return http.get(`/task/planet/${planetId}/active`);
  },
  update: async (data: UpdateTaskInput): Promise<Task> => {
    const { taskId, ...updateData } = data;
    return http.patch(`/task/${taskId}`, updateData);
  },
  completeTask: async (taskId: string): Promise<Task> => {
    return http.post(`/task/${taskId}/complete`);
  },
  delete: async (taskId: string): Promise<void> => {
    return http.delete(`/task/${taskId}`);
  },
};
