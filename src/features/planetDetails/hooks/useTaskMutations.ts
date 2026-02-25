import { useMutation } from "@tanstack/react-query";
import { taskApi } from "@/lib/api/client/taskApi";
import { queryClient } from "@/lib/utils/queryClient";
import { queryKeys } from "@/lib/utils/queryKeys";
import { toast } from "@/lib/utils/toast";
import type { TaskDifficulty } from "@/types/TaskDifficulty";
import type { RecurringPattern } from "@/types/RecurringPattern";

export function useTaskMutations(planetId: string) {
  const updateTaskMutation = useMutation({
    mutationFn: taskApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks(planetId) });
      toast.success("Task updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update task");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks(planetId) });
      toast.success("Task deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete task");
    },
  });

  const handleUpdateTaskSubmit = (
    taskId: string,
    title: string,
    difficulty: TaskDifficulty,
    recurring: RecurringPattern,
  ) => {
    updateTaskMutation.mutate({
      taskId,
      title,
      difficulty,
      recurring,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  return {
    updateTaskMutation,
    deleteTaskMutation,
    handleUpdateTaskSubmit,
    handleDeleteTask,
  };
}
