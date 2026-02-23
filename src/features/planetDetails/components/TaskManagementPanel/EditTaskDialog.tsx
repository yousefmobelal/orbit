import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types/Task";
import type { TaskDifficulty } from "@/types/TaskDifficulty";
import type { RecurringPattern } from "@/types/RecurringPattern";

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (
    taskId: string,
    title: string,
    difficulty: TaskDifficulty,
    recurring: RecurringPattern,
  ) => void;
}

export function EditTaskDialog({
  task,
  open,
  onOpenChange,
  onUpdate,
}: EditTaskDialogProps) {
  const [title, setTitle] = useState(task.title);
  const [difficulty, setDifficulty] = useState<TaskDifficulty>(task.difficulty);
  const [recurring, setRecurring] = useState<RecurringPattern>(task.recurring);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task && title.trim()) {
      onUpdate(task._id, title.trim(), difficulty, recurring);
      onOpenChange(false);
    }
  };

  return (
    <Dialog key={task._id} open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update your task details. Change the title, difficulty, or
              recurrence pattern.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <Input
                id="edit-title"
                label="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Solve 2 leetcode problems"
                className="col-span-3"
                autoFocus
              />
            </div>

            <div className="grid">
              <Label>Difficulty</Label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDifficulty("easy")}
                  className={`p-3 rounded-xl border transition-all ${
                    difficulty === "easy"
                      ? "bg-[#10B981]/20 border-[#10B981] text-[#10B981]"
                      : "bg-[#0B0F1A] border-white/10 text-[#9CA3AF] hover:border-white/20"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  Easy
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty("medium")}
                  className={`p-3 rounded-xl border transition-all ${
                    difficulty === "medium"
                      ? "bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B]"
                      : "bg-[#0B0F1A] border-white/10 text-[#9CA3AF] hover:border-white/20"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setDifficulty("hard")}
                  className={`p-3 rounded-xl border transition-all ${
                    difficulty === "hard"
                      ? "bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444]"
                      : "bg-[#0B0F1A] border-white/10 text-[#9CA3AF] hover:border-white/20"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  Hard
                </button>
              </div>
            </div>

            <div className="grid">
              <Label>Recurrence</Label>
              <div className="grid grid-cols-2 gap-3">
                {["none", "daily", "weekly", "monthly"].map((pattern) => (
                  <button
                    key={pattern}
                    type="button"
                    onClick={() => setRecurring(pattern as RecurringPattern)}
                    className={`p-3 rounded-xl border transition-all capitalize ${
                      recurring === pattern
                        ? "bg-[#4DA3FF]/20 border-[#4DA3FF] text-[#4DA3FF]"
                        : "bg-[#0B0F1A] border-white/10 text-[#9CA3AF] hover:border-white/20"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient" disabled={!title.trim()}>
              Update Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
