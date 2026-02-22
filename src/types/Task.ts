import type { RecurringPattern } from "./RecurringPattern";
import type { TaskDifficulty } from "./TaskDifficulty";

export interface Task {
  _id: string;
  userId: string;
  planetId: string;
  title: string;
  description?: string;
  difficulty: TaskDifficulty;
  isCompleted: boolean;
  completedAt?: Date;
  lastCompletedDate?: Date;
  recurring: RecurringPattern;
  order: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
