import { Planet } from "@/components/shared/Planet";
import type { Task as TaskType } from "@/types/Task";
import React from "react";
import { TaskActionsMenu } from "./TaskManagementPanel/TaskActionsMenu";

export const Task: React.FC<{
  task: TaskType;
  colors: { from: string; to: string };
  onUpdate?: (task: TaskType) => void;
  onDelete?: (taskId: string) => void;
}> = ({ task, colors, onUpdate, onDelete }) => {
  return (
    <TaskActionsMenu
      task={task}
      onUpdate={onUpdate}
      onDelete={onDelete}
      align="center"
    >
      <div
        className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform"
        title={task.title}
      >
        <Planet
          fromColor={colors.from}
          toColor={colors.to}
          size={task.isCompleted ? 6 : 8}
        />

        <span className="text-white text-xs text-center line-clamp-2">
          {task.title}
        </span>
      </div>
    </TaskActionsMenu>
  );
};
