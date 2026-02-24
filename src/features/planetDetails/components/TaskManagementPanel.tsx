import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@/types/Task";
import type { TaskDifficulty } from "@/types/TaskDifficulty";
import type { RecurringPattern } from "@/types/RecurringPattern";
import { taskApi } from "@/lib/api/client/taskApi";
import { queryKeys } from "@/lib/utils/queryKeys";
import { toast } from "@/lib/utils/toast";
import {
  PanelHeader,
  PanelStats,
  TaskTabs,
  TaskList,
  EditTaskDialog,
} from "./TaskManagementPanel/index";

interface TaskManagementPanelProps {
  isOpen: boolean;
  onClose: () => void;
  planetName: string;
  planetColor: string;
  planetId: string;
  level: number;
  xp: number;
  requiredXPForNextLevel: number;
  xpToNextLevel: number;
  xpProgressPercent: number;
  streak: number;
  lastCompletedDate?: string | Date;
  tasks: Task[];
  isMobile?: boolean;
}

export function TaskManagementPanel({
  isOpen,
  onClose,
  planetName,
  planetId,
  level,
  xp,
  requiredXPForNextLevel,
  xpProgressPercent,
  streak,
  lastCompletedDate,
  tasks,
  isMobile = false,
}: TaskManagementPanelProps) {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const activeTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks(planetId) });
      toast.success("Task created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create task");
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: taskApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks(planetId),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update task");
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: taskApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks(planetId),
      });
      toast.success("Task deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete task");
    },
  });

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    // Prevent uncompleting if already 10 active tasks
    if (task.isCompleted && activeTasks.length >= 10) {
      toast.error(
        "You can't have more than 10 active tasks. Complete or delete a task first.",
      );
      return;
    }

    updateTaskMutation.mutate({
      taskId,
      isCompleted: !task.isCompleted,
    });
  };

  const handleAddTask = (
    title: string,
    difficulty: TaskDifficulty,
    recurring: RecurringPattern,
  ) => {
    createTaskMutation.mutate({
      planetId,
      title,
      difficulty,
      recurring,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  const handleUpdateTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTaskSubmit = (
    taskId: string,
    title: string,
    difficulty: TaskDifficulty,
    recurring: RecurringPattern,
  ) => {
    updateTaskMutation.mutate(
      {
        taskId,
        title,
        difficulty,
        recurring,
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully!");
        },
      },
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={`fixed z-50 bg-[#121826] border-l border-white/10 ${
              isMobile
                ? "bottom-0 left-0 right-0 rounded-t-3xl max-h-[80vh]"
                : "top-0 right-0 bottom-0 w-120"
            }`}
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: "100%" } : { x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-white/10">
                <PanelHeader
                  planetName={planetName}
                  level={level}
                  xp={xp}
                  requiredXPForNextLevel={requiredXPForNextLevel}
                  onClose={onClose}
                />

                <PanelStats
                  xpProgressPercent={xpProgressPercent}
                  streak={streak}
                  lastCompletedDate={lastCompletedDate}
                />
              </div>

              <TaskTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                activeCount={activeTasks.length}
                completedCount={completedTasks.length}
              />

              <TaskList
                activeTab={activeTab}
                activeTasks={activeTasks}
                completedTasks={completedTasks}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </motion.div>

          {editingTask && (
            <EditTaskDialog
              task={editingTask}
              open={isEditDialogOpen}
              onOpenChange={setIsEditDialogOpen}
              onUpdate={handleUpdateTaskSubmit}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
