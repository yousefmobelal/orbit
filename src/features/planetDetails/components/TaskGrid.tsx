import { Loader } from "@/components/shared/Loader";
import type { Task as TaskType } from "@/types/Task";
import { Task } from "./Task";

interface TaskGridProps {
  activeTasks: TaskType[];
  tasksLoading: boolean;
  getDifficultyColors: (difficulty: string) => { from: string; to: string };
  getTopMarginClass: (index: number) => string;
  groupTasksIntoColumns: () => TaskType[][];
}

export function TaskGrid({
  activeTasks,
  tasksLoading,
  getDifficultyColors,
  getTopMarginClass,
  groupTasksIntoColumns,
}: TaskGridProps) {
  return (
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
              return <Task key={task._id} task={task} colors={colors} />;
            })}
          </div>
        ))
      ) : (
        <div className="col-span-5 text-2xl text-center text-white/60">
          No active tasks! Click the button below to add some and start
        </div>
      )}
    </div>
  );
}
