import { motion } from "framer-motion";
import { useState } from "react";
import { Bell } from "lucide-react";

export const NotificationsCard = () => {
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    reminderTime: "09:00",
    streakReminder: true,
    taskCompletionCelebration: true,
  });

  const handleToggle = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-[#121826] rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-xl bg-linear-to-br from-[#4DA3FF]/20 to-[#8B5CF6]/20 flex items-center justify-center">
          <Bell className="size-5 text-[#4DA3FF]" />
        </div>
        <h2
          className="text-xl font-semibold text-[#F9FAFB]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Notifications
        </h2>
      </div>

      <div className="space-y-4">
        <ToggleItem
          label="Daily Reminder"
          description="Get reminded to complete your tasks"
          checked={notifications.dailyReminder}
          onChange={() => handleToggle("dailyReminder")}
        />

        {notifications.dailyReminder && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-4 pl-4 border-l-2 border-[#4DA3FF]/30"
          >
            <label className="text-[#9CA3AF] text-sm mb-2 block">
              Reminder Time
            </label>
            <input
              type="time"
              value={notifications.reminderTime}
              onChange={(e) =>
                setNotifications((prev) => ({
                  ...prev,
                  reminderTime: e.target.value,
                }))
              }
              className="w-full px-4 py-3 bg-[#0B0F1A] border border-white/10 rounded-xl text-[#F9FAFB] focus:border-[#22D3EE] focus:outline-none transition-colors duration-300"
            />
          </motion.div>
        )}

        <ToggleItem
          label="Streak Reminder"
          description="Don't break your streak!"
          checked={notifications.streakReminder}
          onChange={() => handleToggle("streakReminder")}
        />

        <ToggleItem
          label="Task Completion Celebration"
          description="Celebrate when you complete tasks"
          checked={notifications.taskCompletionCelebration}
          onChange={() => handleToggle("taskCompletionCelebration")}
        />
      </div>
    </motion.div>
  );
};

interface ToggleItemProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}

const ToggleItem = ({
  label,
  description,
  checked,
  onChange,
}: ToggleItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0F1A] border border-white/5 hover:border-white/10 transition-colors duration-300">
      <div className="flex-1">
        <p className="text-[#F9FAFB] font-medium mb-1">{label}</p>
        {description && <p className="text-[#9CA3AF] text-sm">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 ml-4 ${
          checked
            ? "bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6]"
            : "bg-[#374151]"
        }`}
      >
        <motion.div
          className="absolute top-1 size-4 bg-white rounded-full"
          animate={{ x: checked ? 26 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
};
