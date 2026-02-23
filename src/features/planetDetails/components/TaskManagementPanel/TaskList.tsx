import type { Task } from "@/types/Task";
import type { TaskDifficulty } from "@/types/TaskDifficulty";
import type { RecurringPattern } from "@/types/RecurringPattern";
import { TaskItem } from "./TaskItem";
import { EmptyState } from "./EmptyState";
import { AddTaskDialog } from "./AddTaskDialog";

interface TaskListProps {
  activeTab: "active" | "completed";
  activeTasks: Task[];
  completedTasks: Task[];
  onAddTask: (
    title: string,
    difficulty: TaskDifficulty,
    recurring: RecurringPattern,
  ) => void;
  onUpdateTask: (task: Task) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({
  activeTab,
  activeTasks,
  completedTasks,
  onAddTask,
  onUpdateTask,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-3">
      {activeTab === "active" && (
        <>
          {activeTasks.length < 10 && <AddTaskDialog onAdd={onAddTask} />}

          {activeTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              isCompleted={false}
              onToggle={onToggleTask}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}

          {activeTasks.length === 0 && <EmptyState type="active" />}
        </>
      )}

      {activeTab === "completed" && (
        <>
          {completedTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              isCompleted={true}
              onToggle={onToggleTask}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          ))}

          {completedTasks.length === 0 && <EmptyState type="completed" />}
        </>
      )}
    </div>
  );
}
