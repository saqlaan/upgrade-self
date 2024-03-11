import { UserType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: UserType | null;
  updateUser: (user: UserType) => void;
  clearUser: () => void;
}

export const UseUserStore = create<UserState>(
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
    }
  )
);
