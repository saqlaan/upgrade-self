import { create } from "zustand";
import { AppointmentType, SlotType, ZenotiService } from "@/types";

type SlotsDataType = {
  futureDay: any;
  nextAvailableDay: any;
  available: SlotType[];
};

type GroupSlotsType = {
  [key: string]: SlotType[];
};

type SearchAppointmentsFilter = {
  date?: string | "";
};
interface CreateAppointmentStore {
  selectedService: ZenotiService | null;
  appointment: AppointmentType | null;
  slots: SlotsDataType;
  groupSlots: GroupSlotsType | null;
  selectedHour: string;
  setSelectedService: (services: ZenotiService) => void;
  setAppointment: (appointment: AppointmentType) => void;
  setSlots: (slotsData: SlotsDataType) => void;
  setGroupSlots: (groupSlots: GroupSlotsType) => void;
  resetStore: () => void;
  setSelectedHour: (hour: string) => void;
  appointmentsFilters: SearchAppointmentsFilter;
  updateAppointmentFilters: (filters: SearchAppointmentsFilter) => void;
}

export const useCreateAppointmentStore = create<CreateAppointmentStore>(
  (set) => ({
    selectedService: null,
    appointment: null,
    slots: {
      futureDay: null,
      nextAvailableDay: null,
      available: [],
    },
    groupSlots: null,
    selectedHour: "",
    appointmentsFilters: {},
    setSelectedService: (service: ZenotiService) =>
      set((state) => ({
        ...state,
        selectedService: service,
      })),
    resetStore: () =>
      set({
        selectedService: null,
        appointment: null,
        slots: {
          futureDay: null,
          nextAvailableDay: null,
          available: [],
        },
        groupSlots: null,
        selectedHour: "",
        appointmentsFilters: {},
      }),
    setAppointment: (appointment: AppointmentType) =>
      set(() => ({ appointment })),
    setSlots: (slots: SlotsDataType) => set(() => ({ slots })),
    setGroupSlots: (groupSlots: GroupSlotsType) => set(() => ({ groupSlots })),
    setSelectedHour: (hour: string) => set({ selectedHour: hour }),
    updateAppointmentFilters: (filters: SearchAppointmentsFilter) =>
      set((state) => ({
        appointmentsFilters: {
          ...state.appointmentsFilters,
          ...filters,
        },
      })),
  }),
);
