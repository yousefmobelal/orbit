import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskActionsMenu } from "./TaskActionsMenu";
import type { Task } from "@/types/Task";

interface TaskItemProps {
  task: Task;
  isCompleted: boolean;
  onToggle: (taskId: string) => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({
  task,
  isCompleted,
  onToggle,
  onUpdate,
  onDelete,
}: TaskItemProps) {
  return (
    <motion.div
      className="group flex items-center gap-3 p-4 rounded-xl bg-[#0B0F1A] border border-white/5 hover:border-white/10 transition-all"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {!isCompleted && (
        <button
          onClick={() => onToggle(task._id)}
          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
            isCompleted
              ? "bg-[#22D3EE]"
              : "border-2 border-[#9CA3AF] hover:border-[#4DA3FF]"
          }`}
        >
          {isCompleted && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      )}
      <span
        className={`flex-1 ${
          isCompleted ? "text-[#9CA3AF] line-through" : "text-[#F9FAFB]"
        }`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {task.title}
      </span>

      <TaskActionsMenu
        task={task}
        onUpdate={onUpdate}
        onDelete={onDelete}
        align="end"
      >
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="w-4 h-4 text-[#9CA3AF]" />
        </Button>
      </TaskActionsMenu>
    </motion.div>
  );
}
