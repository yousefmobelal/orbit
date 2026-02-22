import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Task } from "@/types/Task";
import type { TaskDifficulty } from "@/types/TaskDifficulty";
import type { RecurringPattern } from "@/types/RecurringPattern";
import {
  PanelHeader,
  PanelStats,
  TaskTabs,
  TaskList,
  PanelFooter,
} from "./TaskManagementPanel/index";

interface TaskManagementPanelProps {
  isOpen: boolean;
  onClose: () => void;
  planetName: string;
  planetColor: string;
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  tasks: Task[];
  onSave: (updatedTasks: Task[]) => void;
  isMobile?: boolean;
}

export function TaskManagementPanel({
  isOpen,
  onClose,
  planetName,
  level,
  xp,
  maxXp,
  streak,
  tasks: initialTasks,
  onSave,
  isMobile = false,
}: TaskManagementPanelProps) {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [tasks, setTasks] = useState(initialTasks);

  const activeTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  const handleToggleTask = (taskId: string) => {
    setTasks(
      tasks.map((t) =>
        t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t,
      ),
    );
  };

  const handleAddTask = (
    title: string,
    difficulty: TaskDifficulty,
    recurring: RecurringPattern,
  ) => {
    const newTask: Task = {
      _id: `temp-${Date.now()}`,
      userId: "",
      planetId: "",
      title,
      description: "",
      difficulty,
      isCompleted: false,
      recurring,
      order: tasks.length,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t._id !== taskId));
  };

  const handleSave = () => {
    onSave(tasks);
    onClose();
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
                  maxXp={maxXp}
                  onClose={onClose}
                />

                <PanelStats xp={xp} maxXp={maxXp} streak={streak} />
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
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />

              <PanelFooter onSave={handleSave} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
