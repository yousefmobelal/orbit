import { ErrorState } from "@/components/shared/ErrorState";
import { HalfPlanet } from "@/components/shared/HalfPlanet";
import { Loader } from "@/components/shared/Loader";
import { planetApi } from "@/lib/api/client/planetApi";
import { taskApi } from "@/lib/api/client/taskApi";
import { queryKeys } from "@/lib/utils/queryKeys";
import { toast } from "@/lib/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { useTaskMutations } from "./hooks/useTaskMutations";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "lucide-react";
import { TaskManagementPanel } from "./components/TaskManagementPanel";
import { EditTaskDialog } from "./components/TaskManagementPanel/EditTaskDialog";
import type { Task as TaskType } from "@/types/Task";
import { TaskGrid } from "./components/TaskGrid";
import { TaskActionsContext } from "./context/TaskActionsContext";
import {
  RECURRING_INTERVALS_MS,
  TASK_DIFFICULTY_COLORS,
} from "@/lib/utils/constants";
import { DialogStateProvider } from "./context/DialogStateContext";

export const PlanetDetailsPage = () => {
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
    isSuccess: tasksSuccess,
  } = useQuery({
    queryKey: queryKeys.tasks(id),
    queryFn: () => taskApi.getByPlanetId(id),
    enabled: isSuccess,
  });

  const activeTasks = useMemo(() => {
    if (!tasks) return [];
    const activeTasks: TaskType[] = [];
    const now = new Date();

    for (const task of tasks) {
      //
      if (task.recurring === "none") {
        if (!task.isCompleted) {
          activeTasks.push(task);
        }
        continue;
      }

      if (!task.lastCompletedDate) {
        activeTasks.push(task);
        continue;
      }

      const lastCompleted = new Date(task.lastCompletedDate);
      const diff = now.getTime() - lastCompleted.getTime();

      switch (task.recurring) {
        case "daily":
          if (diff >= RECURRING_INTERVALS_MS.daily) {
            activeTasks.push(task);
          }
          break;

        case "weekly":
          if (diff >= RECURRING_INTERVALS_MS.weekly) {
            activeTasks.push(task);
          }
          break;

        case "monthly":
          if (diff >= RECURRING_INTERVALS_MS.monthly) {
            activeTasks.push(task);
          }
          break;
      }
    }
    return activeTasks;
  }, [tasks]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  const { handleUpdateTaskSubmit, handleDeleteTask } = useTaskMutations(id);
  const handleUpdateTask = (task: TaskType) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const taskActionsContextValue = {
    handleUpdateTask,
    handleDeleteTask,
    handleUpdateTaskSubmit,
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  if (isSuccess && tasksSuccess) {
    const getDifficultyColors = (difficulty: string) => {
      switch (difficulty.toUpperCase()) {
        case "EASY":
          return TASK_DIFFICULTY_COLORS.EASY;
        case "MEDIUM":
          return TASK_DIFFICULTY_COLORS.MEDIUM;
        case "HARD":
          return TASK_DIFFICULTY_COLORS.HARD;
        default:
          return TASK_DIFFICULTY_COLORS.DEFAULT;
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
      <DialogStateProvider>
        <TaskActionsContext.Provider value={taskActionsContextValue}>
          <div className="relative h-screen overflow-hidden p-8">
            <HalfPlanet planet={planet} />

            <TaskGrid
              activeTasks={activeTasks}
              tasksLoading={tasksLoading}
              getDifficultyColors={getDifficultyColors}
              getTopMarginClass={getTopMarginClass}
              groupTasksIntoColumns={groupTasksIntoColumns}
            />
            <button
              onClick={() => setIsPanelOpen(true)}
              className="size-12 rounded-full group hover:border-[#22D3EE] bg-[#121826] flex justify-center items-center border border-gray-400 absolute bottom-5 right-5 cursor-pointer"
            >
              <Menu className="text-gray-400 group-hover:text-[#22D3EE]" />
            </button>

            <TaskManagementPanel
              isOpen={isPanelOpen}
              onClose={() => setIsPanelOpen(false)}
              planet={planet}
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
        </TaskActionsContext.Provider>
      </DialogStateProvider>
    );
  }
};
