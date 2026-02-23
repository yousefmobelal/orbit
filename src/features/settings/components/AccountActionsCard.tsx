import { motion } from "framer-motion";
import { LogOut, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountActionsCard = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logging out...");
    navigate("/auth/login");
  };

  const handleDeleteAccount = () => {
    // TODO: Implement delete account logic
    console.log("Deleting account...");
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
      <h2
        className="text-xl font-semibold text-[#F9FAFB] mb-6"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Account
      </h2>

      <div className="space-y-3">
        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full p-4 rounded-xl bg-[#0B0F1A] border border-white/5 hover:border-[#22D3EE]/30 transition-all duration-300 flex items-center gap-4 text-left group"
        >
          <div className="size-12 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center shrink-0 group-hover:bg-[#22D3EE]/20 transition-colors duration-300">
            <LogOut className="size-5 text-[#22D3EE]" />
          </div>
          <div className="flex-1">
            <p className="text-[#F9FAFB] font-medium mb-1">Logout</p>
            <p className="text-[#9CA3AF] text-sm">Sign out of your account</p>
          </div>
        </motion.button>

        {/* Delete Account */}
        {!showDeleteConfirm ? (
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 hover:border-[#EF4444]/50 transition-all duration-300 flex items-center gap-4 text-left group"
          >
            <div className="size-12 rounded-xl bg-[#EF4444]/10 flex items-center justify-center shrink-0 group-hover:bg-[#EF4444]/20 transition-colors duration-300">
              <Trash2 className="size-5 text-[#EF4444]" />
            </div>
            <div className="flex-1">
              <p className="text-[#EF4444] font-medium mb-1">Delete Account</p>
              <p className="text-[#EF4444]/70 text-sm">
                Permanently delete your account
              </p>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30"
          >
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="size-5 text-[#EF4444] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#F9FAFB] font-medium mb-2">
                  Are you absolutely sure?
                </p>
                <p className="text-[#9CA3AF] text-sm">
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteAccount}
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
