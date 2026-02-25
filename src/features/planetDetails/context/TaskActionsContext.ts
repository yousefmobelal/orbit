import { createContext, useContext } from "react";
import type { Task as TaskType } from "@/types/Task";
import type { TaskDifficulty } from "@/types/TaskDifficulty";
import type { RecurringPattern } from "@/types/RecurringPattern";

interface TaskActionsContextProps {
  handleUpdateTask: (task: TaskType) => void;
  handleDeleteTask: (taskId: string) => void;
  handleUpdateTaskSubmit: (
    taskId: string,
    title: string,
    difficulty: TaskDifficulty,
    recurring: RecurringPattern,
  ) => void;
}

export const TaskActionsContext = createContext<
  TaskActionsContextProps | undefined
>(undefined);

export function useTaskActions() {
  const ctx = useContext(TaskActionsContext);
  if (!ctx)
    throw new Error("useTaskActions must be used within a TaskActionsProvider");
  return ctx;
}
