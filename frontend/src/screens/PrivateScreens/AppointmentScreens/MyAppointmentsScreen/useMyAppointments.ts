import { useCallback, useEffect } from "react";
import { isAfter } from "date-fns";

import { getBookedAppointments } from "@/services/firebaseApp/guests";
import { getUserGuests } from "@/services/firebase/collections/guest";

import { GuestAppointmentType } from "@/types/zenoti/BookedAppointmentType";
import { useMyBookingStore } from "@/store/myBookingsStore";

function useMyAppointments() {
  const { setBookings, setIsLoading } = useMyBookingStore();

  const loadBookings = useCallback(
    async (isSilentLoad = false) => {
      if (!isSilentLoad) {
        setIsLoading(true);
      }
      try {
        const accounts = await getUserGuests();
        const promises = accounts?.guestAccounts.map(async (guestAccount) => {
          const data = await getBookedAppointments({
            guestId: guestAccount?.guestId,
            countryCode: guestAccount?.countryCode,
          });
          return data?.appointments || [];
        });

        const data = await Promise.all(promises);
        const allAppointments = data.flatMap((obj) => obj);

        if (allAppointments.length === 0) return;
        const currentTime = Date.now();
        const [pastBookings, activeBookings] = allAppointments.reduce(
          (result, appointment) => {
            const endTimeString =
              appointment?.appointment_services[0]?.end_time;
            if (endTimeString) {
              const endTime = new Date(endTimeString);
              const bookings = isAfter(endTime, currentTime)
                ? result[1]
                : result[0];
              bookings.push(appointment);
            }
            return result;
          },
          [[], []] as [GuestAppointmentType[], GuestAppointmentType[]],
        );
        setBookings({
          pastBookings,
          activeBookings,
        });
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setBookings, setIsLoading],
  );

  const silentRefresh = useCallback(() => {
    loadBookings(true);
  }, [loadBookings]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  return {
    loadBookings,
    silentRefresh,
  };
}

export default useMyAppointments;
