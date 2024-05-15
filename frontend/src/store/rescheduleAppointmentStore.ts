import { create } from "zustand";
import { ZenotiService } from "@/types";

interface RescheduleAppointmentStore {
  selectedService: ZenotiService | null;
  setSelectedService: (services: ZenotiService) => void;
  resetStore: () => void;
}

export const useRescheduleAppointment = create<RescheduleAppointmentStore>(
  (set) => ({
    selectedService: null,
    setSelectedService: (service: ZenotiService) =>
      set(() => ({ selectedService: service })),
    resetStore: () => set(() => ({ selectedService: null })),
  }),
);
