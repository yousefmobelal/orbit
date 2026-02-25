import { createContext, useContext, useState } from "react";
import type { Task } from "@/types/Task";

interface DialogStateContextProps {
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DialogStateContext = createContext<
  DialogStateContextProps | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useDialogState() {
  const ctx = useContext(DialogStateContext);
  if (!ctx)
    throw new Error("useDialogState must be used within a DialogStateProvider");
  return ctx;
}

export function DialogStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const value = {
    editingTask,
    setEditingTask,
    isEditDialogOpen,
    setIsEditDialogOpen,
  };

  return (
    <DialogStateContext.Provider value={value}>
      {children}
    </DialogStateContext.Provider>
  );
}
