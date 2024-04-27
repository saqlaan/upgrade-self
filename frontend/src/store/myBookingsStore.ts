import { create } from "zustand";
import { GuestAppointmentType } from "@/types/zenoti/BookedAppointmentType";

interface CenterStore {
  pastBookings: GuestAppointmentType[];
  activeBookings: GuestAppointmentType[];
  isLoading: boolean;
  setBookings: (booking: {
    pastBookings: GuestAppointmentType[];
    activeBookings: GuestAppointmentType[];
  }) => void;
  setIsLoading: (value: boolean) => void;
}

export const useMyBookingStore = create<CenterStore>((set) => ({
  pastBookings: [],
  activeBookings: [],
  isLoading: false,
  setBookings: ({ pastBookings, activeBookings }) =>
    set(() => ({ pastBookings, activeBookings })),
  setIsLoading: (value) =>
    set({
      isLoading: value,
    }),
}));
