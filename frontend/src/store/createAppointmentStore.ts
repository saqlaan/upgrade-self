import { create } from "zustand";
import { ZenotiService } from "@/types";

interface AppReadyState {
  availableServices: ZenotiService[];
  setAvailableServices: (services: ZenotiService[]) => void;
}

export const useCreateAppointmentStore = create<AppReadyState>((set) => ({
  availableServices: [],
  setAvailableServices: (services: ZenotiService[]) =>
    set(() => ({ availableServices: services })),
}));
