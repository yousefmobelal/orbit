import { Planet } from "@/components/shared/Planet";
import type { Task as TaskType } from "@/types/Task";
import React from "react";

export const Task: React.FC<{
  task: TaskType;
  colors: { from: string; to: string };
}> = ({ task, colors }) => {
  return (
    <div
      key={task._id}
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
  );
};
