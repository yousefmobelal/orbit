import { ErrorState } from "@/components/shared/ErrorState";
import { HalfPlanet } from "@/components/shared/HalfPlanet";
import { Loader } from "@/components/shared/Loader";
import { planetApi } from "@/lib/api/client/planetApi";
import { taskApi } from "@/lib/api/client/taskApi";
import { queryKeys } from "@/lib/utils/queryKeys";
import { toast } from "@/lib/utils/toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task } from "./components/Task";
import { Menu } from "lucide-react";
import { TaskManagementPanel } from "./components/TaskManagementPanel";
import { EditTaskDialog } from "./components/TaskManagementPanel/EditTaskDialog";
import type { Task as TaskType } from "@/types/Task";
import type { TaskDifficulty } from "@/types/TaskDifficulty";
import type { RecurringPattern } from "@/types/RecurringPattern";
import { queryClient } from "@/lib/utils/queryClient";

export const PlanetDetails = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const id = useParams().id!;
  const {
    isLoading,
    isError,
    isSuccess,
    error,
    data: planet,
    refetch,
  } = useQuery({
    queryKey: queryKeys.planet(id),
    queryFn: () => planetApi.get(id),
  });

  const {
    data: tasks,
    isLoading: tasksLoading,
    isSuccess: tasksSucess,
  } = useQuery({
    queryKey: queryKeys.tasks(id),
    queryFn: () => taskApi.getByPlanetId(id),
    enabled: isSuccess,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: taskApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks(id) });
      toast.success("Task updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update task");
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: taskApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks(id) });
      toast.success("Task deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete task");
    },
  });

  const handleUpdateTask = (task: TaskType) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

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

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
  if (isSuccess && tasksSucess) {
    const activeTasks = tasks.filter((task) => !task.isCompleted);
    const getDifficultyColors = (difficulty: string) => {
      switch (difficulty.toUpperCase()) {
        case "EASY":
          return { from: "#6B7280", to: "#9CA3AF" };
        case "MEDIUM":
          return { from: "#F59E0B", to: "#FBBF24" };
        case "HARD":
          return { from: "#EF4444", to: "#F87171" };
        default:
          return { from: "#10B981", to: "#34D399" };
      }
    };
    const getTopMarginClass = (index: number) => {
      if (index === 0 || index === 4) {
        return "mt-[50px] md:mt-[200px]";
      } else if (index === 2) {
        return "mt-0";
      } else if (index === 1 || index === 3) {
        return "mt-[30px] md:mt-[60px]";
      } else {
        return "mt-0";
      }
    };

    const groupTasksIntoColumns = () => {
      const columns: TaskType[][] = [[], [], [], [], []];
      activeTasks.forEach((task, index) => {
        const columnIndex = index % 5;
        columns[columnIndex].push(task);
      });
      return columns;
    };

    return (
      <div className="relative h-screen overflow-hidden p-8">
        <HalfPlanet planet={planet} />

        <div className="grid grid-cols-5 gap-6 relative">
          {tasksLoading ? (
            <div className="col-span-5 flex justify-center">
              <Loader />
            </div>
          ) : activeTasks.length > 0 ? (
            groupTasksIntoColumns().map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={`flex flex-col gap-10 ${getTopMarginClass(columnIndex)}`}
              >
                {column.map((task) => {
                  const colors = getDifficultyColors(task.difficulty);
                  return (
                    <Task
                      key={task._id}
                      task={task}
                      colors={colors}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  );
                })}
              </div>
            ))
          ) : (
            <div className="col-span-5 text-2xl text-center text-white/60">
              No active tasks! Click the button below to add some and start
            </div>
          )}
        </div>
        <button
          onClick={() => setIsPanelOpen(true)}
          className="size-12 rounded-full group hover:border-[#22D3EE] bg-[#121826] flex justify-center items-center border border-gray-400 absolute bottom-5 right-5 cursor-pointer"
        >
          <Menu className="text-gray-400 group-hover:text-[#22D3EE]" />
        </button>

        <TaskManagementPanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          planetName={planet.title}
          planetColor={planet.theme.fromColor}
          planetId={planet._id}
          level={planet.level}
          xp={planet.xp}
          maxXp={100}
          streak={planet.streakCount}
          tasks={tasks}
          isMobile={
            typeof window !== "undefined" ? window.innerWidth < 768 : false
          }
        />

        {editingTask && (
          <EditTaskDialog
            task={editingTask}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onUpdate={handleUpdateTaskSubmit}
          />
        )}
      </div>
    );
  }
};
