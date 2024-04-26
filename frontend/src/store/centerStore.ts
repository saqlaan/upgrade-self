import { create } from "zustand";
import { CenterType } from "@/types";

interface Center {
  centerId: string;
  countryCode: string;
  name: string;
}

interface CenterStore {
  center: Center | null;
  setCenter: (center: Center) => void;
  allCenters: CenterType[];
  setAllCenters: (centers: CenterType[]) => void;
}

export const useCenterStore = create<CenterStore>((set) => ({
  center: null,
  allCenters: [],
  setCenter: (center: Center) => set(() => ({ center })),
  setAllCenters: (centers: CenterType[]) =>
    set(() => ({ allCenters: centers })),
}));
