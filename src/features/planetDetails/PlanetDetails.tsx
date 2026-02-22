import { ErrorState } from "@/components/shared/ErrorState";
import { HalfPlanet } from "@/components/shared/HalfPlanet";
import { Loader } from "@/components/shared/Loader";
import { planetApi } from "@/lib/api/client/planetApi";
import { taskApi } from "@/lib/api/client/taskApi";
import { queryKeys } from "@/lib/utils/queryKeys";
import { toast } from "@/lib/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Task } from "./components/Task";

export const PlanetDetails = () => {
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

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
  if (isSuccess && tasksSucess) {
    // Map difficulty to colors
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

    // Group tasks into 5 columns
    const groupTasksIntoColumns = () => {
      const columns: (typeof tasks)[] = [[], [], [], [], []];
      tasks.forEach((task, index) => {
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
          ) : tasks.length > 0 ? (
            groupTasksIntoColumns().map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={`flex flex-col gap-10 ${getTopMarginClass(columnIndex)}`}
              >
                {column.map((task) => {
                  const colors = getDifficultyColors(task.difficulty);
                  return <Task key={task._id} task={task} colors={colors} />;
                })}
              </div>
            ))
          ) : (
            <div className="col-span-5 text-center text-white/60">
              No tasks yet. Create your first task!
            </div>
          )}
        </div>
      </div>
    );
  }
};
