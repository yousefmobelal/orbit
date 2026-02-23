import { Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/types/Task";
import type { ReactNode } from "react";

interface TaskActionsMenuProps {
  task: Task;
  onUpdate?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  children: ReactNode;
  align?: "center" | "end" | "start";
}

export function TaskActionsMenu({
  task,
  onUpdate,
  onDelete,
  children,
  align = "center",
}: TaskActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-40">
        {onUpdate && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(task);
            }}
            className="cursor-pointer text-sm text-white"
          >
            <Pencil className="w-3 h-3 mr-2" />
            Edit Task
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task._id);
            }}
            className="cursor-pointer text-[#EF4444] focus:text-[#EF4444] text-sm"
          >
            <Trash2 className="w-3 h-3 mr-2" />
            Delete Task
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
