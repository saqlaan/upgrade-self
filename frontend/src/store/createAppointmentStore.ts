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
interface CreateAppointmentStore {
  availableServices: ZenotiService[];
  selectedService: ZenotiService | null;
  appointment: AppointmentType | null;
  slots: SlotsDataType;
  groupSlots: GroupSlotsType | null;
  servicesFound: boolean;
  selectedHour: string;
  setAvailableServices: (services: ZenotiService[]) => void;
  setSelectedService: (services: ZenotiService) => void;
  setServicesFound: (value: boolean) => void;
  setAppointment: (appointment: AppointmentType) => void;
  setSlots: (slotsData: SlotsDataType) => void;
  setGroupSlots: (groupSlots: GroupSlotsType) => void;
  resetStore: () => void;
  setSelectedHour: (hour: string) => void;
}

export const useCreateAppointmentStore = create<CreateAppointmentStore>(
  (set) => ({
    availableServices: [],
    selectedService: null,
    servicesFound: false,
    appointment: null,
    slots: {
      futureDay: null,
      nextAvailableDay: null,
      available: [],
    },
    groupSlots: null,
    selectedHour: "",
    setAvailableServices: (services: ZenotiService[]) =>
      set(() => ({ availableServices: services })),
    setServicesFound: (value: boolean) => set(() => ({ servicesFound: value })),
    setSelectedService: (service: ZenotiService) =>
      set((state) => ({
        ...state,
        selectedService: service,
      })),
    resetStore: () =>
      set({
        availableServices: [],
        selectedService: null,
        servicesFound: false,
        appointment: null,
        slots: {
          futureDay: null,
          nextAvailableDay: null,
          available: [],
        },
        groupSlots: null,
        selectedHour: "",
      }),
    setAppointment: (appointment: AppointmentType) =>
      set(() => ({ appointment })),
    setSlots: (slots: SlotsDataType) => set(() => ({ slots })),
    setGroupSlots: (groupSlots: GroupSlotsType) => set(() => ({ groupSlots })),
    setSelectedHour: (hour: string) => set({ selectedHour: hour }),
  }),
);
