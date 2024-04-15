import { create } from "zustand";

interface AppReadyState {
  isReady: boolean;
}

export const useAppReadyState = create<AppReadyState>((set) => ({
  isReady: false,
  appReady: () => set(() => ({ isReady: true })),
}));
