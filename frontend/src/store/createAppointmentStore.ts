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
  date: string;
  hour: string;
};
interface CreateAppointmentStore {
  selectedService: ZenotiService | null;
  appointment: AppointmentType | null;
  slots: SlotsDataType;
  groupSlots: GroupSlotsType | null;
  setSelectedService: (services: ZenotiService) => void;
  setAppointment: (appointment: AppointmentType) => void;
  setSlots: (slotsData: SlotsDataType) => void;
  setGroupSlots: (groupSlots: GroupSlotsType) => void;
  resetStore: ({
    selectedService,
  }: {
    selectedService?: ZenotiService;
  }) => void;
  filters: SearchAppointmentsFilter;
  updateAppointmentFilters: (filters: { date?: string; hour?: string }) => void;
}

const initialState: CreateAppointmentStore = {
  selectedService: null,
  appointment: null,
  slots: {
    futureDay: null,
    nextAvailableDay: null,
    available: [],
  },
  groupSlots: null,
  filters: {
    date: new Date().toDateString(),
    hour: "",
  },
};

export const useCreateAppointmentStore = create<CreateAppointmentStore>(
  (set) => ({
    ...initialState,
    setSelectedService: (service: ZenotiService) =>
      set((state) => ({
        ...state,
        selectedService: service,
      })),
    resetStore: (data: { selectedService?: ZenotiService }) =>
      set({ ...initialState, selectedService: data?.selectedService || null }),
    setAppointment: (appointment: AppointmentType) =>
      set(() => ({ appointment })),
    setSlots: (slots: SlotsDataType) => set(() => ({ slots })),
    setGroupSlots: (groupSlots: GroupSlotsType) => set(() => ({ groupSlots })),
    updateAppointmentFilters: (filters: { date?: string; hour?: string }) =>
      set((state) => ({
        filters: {
          ...state.filters,
          ...filters,
        },
      })),
  }),
);
