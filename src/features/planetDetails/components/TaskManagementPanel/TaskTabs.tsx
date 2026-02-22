import { Button } from "@/components/ui/button";

interface TaskTabsProps {
  activeTab: "active" | "completed";
  onTabChange: (tab: "active" | "completed") => void;
  activeCount: number;
  completedCount: number;
}

export function TaskTabs({
  activeTab,
  onTabChange,
  activeCount,
  completedCount,
}: TaskTabsProps) {
  return (
    <div className="flex gap-1 p-2 border-b border-white/10">
      <Button
        onClick={() => onTabChange("active")}
        variant={activeTab === "active" ? "tab-active" : "tab"}
        className="flex-1"
      >
        Active Tasks ({activeCount})
      </Button>
      <Button
        onClick={() => onTabChange("completed")}
        variant={activeTab === "completed" ? "tab-active" : "tab"}
        className="flex-1"
      >
        Completed ({completedCount})
      </Button>
    </div>
  );
}
