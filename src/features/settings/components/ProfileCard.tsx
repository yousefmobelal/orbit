import { motion } from "framer-motion";
import { User, Edit, Upload } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User as UserType } from "@/types/User";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { userApi } from "@/lib/api/client/userApi";
import { queryKeys } from "@/lib/utils/queryKeys";
import { toast } from "@/lib/utils/toast";

interface ProfileCardProps {
  user?: UserType;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      toast.success("Profile updated successfully!");
      setIsDialogOpen(false);
      setImagePreview(null);
      setAvatarFile(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const hasChanges = name !== user?.name || avatarFile !== null;

    if (!hasChanges) {
      toast.error("No changes to save");
      return;
    }

    if (name.length < 3 || name.length > 40) {
      toast.error("Name must be between 3 and 40 characters");
      return;
    }

    const updateData: { name?: string; avatar?: File } = {};

    if (name !== user?.name) {
      updateData.name = name;
    }

    if (avatarFile) {
      updateData.avatar = avatarFile;
    }

    updateProfileMutation.mutate(updateData);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open && !updateProfileMutation.isPending) {
      setIsDialogOpen(false);
      setName(user?.name || "");
      setImagePreview(null);
      setAvatarFile(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-[#121826] rounded-3xl max-h-fit p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      <h2
        className="text-xl font-semibold text-[#F9FAFB] mb-6"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="size-24 rounded-full bg-linear-to-br from-[#4DA3FF] to-[#8B5CF6] flex items-center justify-center overflow-hidden">
            {user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="size-12 text-white" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 size-8 rounded-full bg-[#0B0F1A] border-2 border-[#121826] flex items-center justify-center">
            <div className="size-6 rounded-full bg-[#10B981]" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3
            className="text-2xl font-bold text-[#F9FAFB] mb-2"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {user?.name || "User"}
          </h3>
          <p className="text-[#9CA3AF] mb-4">
            {user?.email || "user@orbit.app"}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsDialogOpen(true)}
            className="px-6 py-2.5 bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] text-white rounded-full font-medium flex items-center gap-2 mx-auto md:mx-0 hover:shadow-lg hover:shadow-[#4DA3FF]/30 transition-shadow duration-300"
          >
            <Edit className="size-4" />
            Edit Profile
          </motion.button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information and avatar
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="size-24 rounded-full bg-linear-to-br from-[#4DA3FF] to-[#8B5CF6] flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : user?.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="size-12 text-white" />
                  )}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 size-8 rounded-full bg-[#22D3EE] border-2 border-[#121826] flex items-center justify-center cursor-pointer hover:bg-[#4DA3FF] transition-colors duration-300"
                >
                  <Upload className="size-4 text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-[#9CA3AF] text-sm">
                Click to upload new avatar
              </p>
            </div>

            <div>
              <label
                htmlFor="name"
                className="text-[#9CA3AF] text-sm mb-2 block"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0F1A] border border-white/10 rounded-xl text-[#F9FAFB] focus:border-[#22D3EE] focus:outline-none transition-colors duration-300"
                placeholder="Enter your name"
                minLength={3}
                maxLength={40}
              />
              {name && (name.length < 3 || name.length > 40) && (
                <p className="text-[#EF4444] text-xs mt-1">
                  Name must be between 3 and 40 characters
                </p>
              )}
            </div>

            <div>
              <label className="text-[#9CA3AF] text-sm mb-2 block">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 bg-[#0B0F1A] border border-white/10 rounded-xl text-[#9CA3AF] cursor-not-allowed"
              />
              <p className="text-[#9CA3AF] text-xs mt-1">
                Email cannot be changed
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDialogClose(false)}
              disabled={updateProfileMutation.isPending}
              className="flex-1 px-4 py-2.5 bg-[#0B0F1A] border border-white/10 text-[#F9FAFB] rounded-xl font-medium hover:border-white/20 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: updateProfileMutation.isPending ? 1 : 1.02 }}
              whileTap={{ scale: updateProfileMutation.isPending ? 1 : 0.98 }}
              onClick={handleSave}
              disabled={updateProfileMutation.isPending}
              className="flex-1 px-4 py-2.5 bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#4DA3FF]/30 transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
