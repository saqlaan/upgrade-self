import { create } from "zustand";
import { ZenotiService } from "@/types";

interface ServicesStore {
  services: ZenotiService[] | null;
  isLoadingServices: boolean;
  servicesFound: boolean;
  setServices: (services: ZenotiService[]) => void;
  setServicesFound: (value: boolean) => void;
  setIsLoadingServices: (value: boolean) => void;
  resetStore: () => void;
  servicesAvailable: () => boolean;
}

export const useServicesStore = create<ServicesStore>((set, getState) => ({
  services: null,
  servicesFound: false,
  isLoadingServices: false,
  setServices: (services: ZenotiService[]) => set(() => ({ services })),
  setServicesFound: (value: boolean) => set(() => ({ servicesFound: value })),
  setIsLoadingServices: (value: boolean) =>
    set(() => ({ isLoadingServices: value })),
  resetStore: () =>
    set({
      services: [],
      servicesFound: false,
    }),
  servicesAvailable: () => {
    const state = getState();
    return !(!state.isLoadingServices && state.services?.length === 0);
  },
}));
