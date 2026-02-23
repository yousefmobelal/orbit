import type { RecurringPattern } from "../RecurringPattern";
import type { TaskDifficulty } from "../TaskDifficulty";

export interface UpdateTaskInput {
  taskId: string;
  title?: string;
  description?: string;
  difficulty?: TaskDifficulty;
  recurring?: RecurringPattern;
  isCompleted?: boolean;
  isArchived?: boolean;
  order?: number;
}
