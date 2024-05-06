import { create } from "zustand";
import { GuestAppointmentType } from "@/types/zenoti/BookedAppointmentType";

interface MyBookingStoreType {
  pastBookings: GuestAppointmentType[];
  activeBookings: GuestAppointmentType[];
  isLoading: boolean;
  setBookings: (booking: {
    pastBookings: GuestAppointmentType[];
    activeBookings: GuestAppointmentType[];
  }) => void;
  setIsLoading: (value: boolean) => void;
  resetMyBoookingStore: () => void;
}

export const useMyBookingStore = create<MyBookingStoreType>((set) => ({
  pastBookings: [],
  activeBookings: [],
  isLoading: false,
  setBookings: ({ pastBookings, activeBookings }) =>
    set(() => ({ pastBookings, activeBookings })),
  setIsLoading: (value) =>
    set({
      isLoading: value,
    }),
  resetMyBoookingStore: () =>
    set(() => ({
      pastBookings: [],
      activeBookings: [],
      isLoading: false,
    })),
}));
