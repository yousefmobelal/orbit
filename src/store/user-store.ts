import { create } from "zustand";
import { storage } from "@/lib/utils/storage";
import { storageKeys } from "@/lib/utils/storageKeys";

type User = {
  id: string;
  name: string;
  email: string;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: !!storage.get(storageKeys.ACCESS_TOKEN),

  setUser: (user) => set({ user, isAuthenticated: true }),

  logout: () => {
    storage.remove(storageKeys.ACCESS_TOKEN);
    storage.remove(storageKeys.REFRESH_TOKEN);
    set({ user: null, isAuthenticated: false });
  },
}));
