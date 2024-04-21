import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserType } from "@/types";

interface UserState {
  user: UserType | null;
  updateUser: (user: UserType) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: null,
      updateUser: (user) =>
        set((state) => {
          return { user: { ...state.user, ...user } };
        }),
      clearUser: () => set((state) => ({ user: null })),
    }),
    {
      name: "user-auth",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
