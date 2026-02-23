import { motion } from "framer-motion";
import { Download, Archive, RotateCcw, AlertTriangle } from "lucide-react";
import { useState } from "react";

export const DataSafetyCard = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const actions = [
    {
      icon: Download,
      label: "Export Data",
      description: "Download all your data as JSON",
      color: "#22D3EE",
      onClick: () => console.log("Export data"),
    },
    {
      icon: Archive,
      label: "Archive Planets",
      description: "Archive completed planets",
      color: "#8B5CF6",
      onClick: () => console.log("Archive planets"),
    },
    {
      icon: RotateCcw,
      label: "Reset Completed Tasks",
      description: "Clear all completed tasks history",
      color: "#FBBF24",
      onClick: () => console.log("Reset tasks"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-[#121826] rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-xl bg-linear-to-br from-[#10B981]/20 to-[#22D3EE]/20 flex items-center justify-center">
          <Download className="size-5 text-[#10B981]" />
        </div>
        <h2
          className="text-xl font-semibold text-[#F9FAFB]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Data & Safety
        </h2>
      </div>

      <div className="space-y-3 mb-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              className="w-full p-4 rounded-xl bg-[#0B0F1A] border border-white/5 hover:border-white/10 transition-all duration-300 flex items-center gap-4 text-left"
            >
              <div
                className="size-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${action.color}15`,
                }}
              >
                <Icon className="size-5" style={{ color: action.color }} />
              </div>
              <div className="flex-1">
                <p className="text-[#F9FAFB] font-medium mb-1">
                  {action.label}
                </p>
                <p className="text-[#9CA3AF] text-sm">{action.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Danger Zone */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="size-5 text-[#EF4444]" />
          <h3
            className="text-lg font-semibold text-[#EF4444]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Danger Zone
          </h3>
        </div>

        {!showDeleteConfirm ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 hover:border-[#EF4444]/50 transition-all duration-300 text-left"
          >
            <p className="text-[#EF4444] font-medium mb-1">Delete Account</p>
            <p className="text-[#EF4444]/70 text-sm">
              Permanently delete your account and all data
            </p>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30"
          >
            <p className="text-[#F9FAFB] font-medium mb-3">
              Are you absolutely sure?
            </p>
            <p className="text-[#9CA3AF] text-sm mb-4">
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => console.log("Delete account")}
                className="flex-1 px-4 py-2.5 bg-[#EF4444] text-white rounded-xl font-medium hover:bg-[#DC2626] transition-colors duration-300"
              >
                Yes, Delete
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-[#121826] border border-white/10 text-[#F9FAFB] rounded-xl font-medium hover:border-white/20 transition-colors duration-300"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
