import { create } from "zustand";

interface Center {
  centerId: string;
  countryCode: string;
}

interface CenterStore {
  center: Center | null;
  setCenter: (center: Center) => void;
}

export const useCenter = create<CenterStore>((set) => ({
  center: null,
  setCenter: (center: Center) => set(() => ({ center })),
}));
