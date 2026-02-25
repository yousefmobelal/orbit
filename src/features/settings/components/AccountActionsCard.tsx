import { motion } from "framer-motion";
import { LogOut, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { userApi } from "@/lib/api/client/userApi";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { storage } from "@/lib/utils/storage";
import { storageKeys } from "@/lib/utils/storageKeys";
import { toast } from "@/lib/utils/toast";

export const AccountActionsCard = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    storage.remove(storageKeys.ACCESS_TOKEN);
    storage.remove(storageKeys.REFRESH_TOKEN);

    queryClient.clear();

    toast.success("Logged out successfully");

    navigate("/auth/login");
  };

  const handleDeleteAccount = async () => {
    setDeleteError(null);
    setDeleteLoading(true);
    try {
      await userApi.deleteAccount({ password, confirmation });

      storage.remove(storageKeys.ACCESS_TOKEN);
      storage.remove(storageKeys.REFRESH_TOKEN);

      queryClient.clear();
      toast.success("Account deleted successfully");
      navigate("/");
    } catch (err: unknown) {
      let message =
        "Failed to delete account. Please check your password and try again.";
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data &&
        typeof err.response.data.message === "string"
      ) {
        message = err.response.data.message;
      }
      setDeleteError(message);
    } finally {
      setDeleteLoading(false);
    }
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
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleDeleteAccount();
              }}
            >
              <input
                type="password"
                className="w-full px-3 py-2 rounded-lg bg-[#121826] border border-[#EF4444]/40 text-[#F9FAFB] placeholder-[#EF4444]/60 focus:outline-none focus:border-[#EF4444]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={deleteLoading}
                autoFocus
              />
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg bg-[#121826] border border-[#EF4444]/40 text-[#F9FAFB] placeholder-[#EF4444]/60 focus:outline-none focus:border-[#EF4444]"
                placeholder="Type DELETE to confirm"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                required
                pattern="DELETE"
                disabled={deleteLoading}
              />
              {deleteError && (
                <div className="text-[#EF4444] text-sm font-medium">
                  {deleteError}
                </div>
              )}
              <div className="flex gap-3 mt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={
                    deleteLoading || !password || confirmation !== "DELETE"
                  }
                  className="flex-1 px-4 py-2.5 bg-[#EF4444] text-white rounded-xl font-medium hover:bg-[#DC2626] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? "Deleting..." : "Yes, Delete"}
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setPassword("");
                    setConfirmation("");
                    setDeleteError(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-[#121826] border border-white/10 text-[#F9FAFB] rounded-xl font-medium hover:border-white/20 transition-colors duration-300"
                  disabled={deleteLoading}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
