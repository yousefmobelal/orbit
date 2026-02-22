import type { RecurringPattern } from "../RecurringPattern";
import type { TaskDifficulty } from "../TaskDifficulty";

export interface CreateTaskInput {
  planetId: string;
  title: string;
  description?: string;
  difficulty: TaskDifficulty;
  recurring?: RecurringPattern;
}
