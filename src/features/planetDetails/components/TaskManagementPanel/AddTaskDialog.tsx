import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { TaskDifficulty } from "@/types/TaskDifficulty";
import type { RecurringPattern } from "@/types/RecurringPattern";

interface AddTaskDialogProps {
  onAdd: (title: string, difficulty: TaskDifficulty, recurring: RecurringPattern) => void;
}

export function AddTaskDialog({ onAdd }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState<TaskDifficulty>("easy");
  const [recurring, setRecurring] = useState<RecurringPattern>("daily");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), difficulty, recurring);
      setTitle("");
      setDifficulty("easy");
      setRecurring("daily");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" className="w-full">
          <Plus className="w-5 h-5 mr-2" />
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for your planet. Set the title, difficulty, and recurrence pattern.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-6">
            {/* Title Input */}
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Solve 2 leetcode problems"
                className="col-span-3"
                autoFocus
              />
            </div>

            {/* Difficulty Selection * /}
            <div className="grid gap-3">
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

            {/* Recurring Pattern */}
            <div className="grid gap-3">
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient" disabled={!title.trim()}>
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
