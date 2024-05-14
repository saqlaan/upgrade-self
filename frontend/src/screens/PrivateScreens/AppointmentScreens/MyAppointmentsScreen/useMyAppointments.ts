import { useCallback, useEffect } from "react";
import { addMinutes, isAfter, subMinutes } from "date-fns";

import { getBookedAppointments } from "@/services/firebaseApp/guests";
import { getUserGuests } from "@/services/firebase/collections/guest";

import { GuestAppointmentType } from "@/types/zenoti/BookedAppointmentType";
import { useMyBookingStore } from "@/store/myBookingsStore";
import { useCenterStore } from "@/store/centerStore";
import { extractUTCHours } from "@/utils/functions";

function useMyAppointments() {
  const { setBookings, setIsLoading } = useMyBookingStore();
  const { allCenters } = useCenterStore();
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
            // Identify the difference between center time and user time and then create bookings
            const endTimeString =
              appointment?.appointment_services[0]?.end_time;
            const center = allCenters.find(
              (center) => center.id === appointment.center_id,
            );
            if (!center) return null;
            if (endTimeString) {
              let endTime = new Date(endTimeString);
              const centerTimeZoneOffset = extractUTCHours(
                center?.location?.time_zone?.name,
              );
              const userTimeZoneOffset = new Date().getTimezoneOffset();
              const offsetDiff = Math.abs(
                Math.abs(userTimeZoneOffset) - Math.abs(centerTimeZoneOffset),
              );
              if (userTimeZoneOffset > centerTimeZoneOffset) {
                endTime = addMinutes(endTime, offsetDiff);
              } else if (userTimeZoneOffset < centerTimeZoneOffset) {
                endTime = subMinutes(endTime, offsetDiff);
              }
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
