import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  confrimSlotAsync,
  createAppointment,
  getSlots,
  reserveSlotAsync,
} from "@/services/firebaseApp/appointment";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { useCenterStore } from "@/store/centerStore";
import {
  getGuestAccountByCountry,
  groupSlotsTogether,
} from "@/utils/functions";
import { getGuestPaymentMethods } from "@/services/firebaseApp/guests";
import { getUserGuests } from "@/services/firebase/collections/guest";
import { ZenotiService } from "@/types";

export const useBookAppointmentMethods = () => {
  const { center } = useCenterStore();
  const navigation = useNavigation();
  const {
    appointment,
    setSlots,
    setGroupSlots,
    setAppointment,
    updateAppointmentFilters,
  } = useCreateAppointmentStore();
  const [isBooking, setIsBooking] = useState(false);
  const [timeSelected, setTimeSelected] = useState("");

  const { mutateAsync: reserveSlotMutation } = useMutation({
    mutationFn: reserveSlotAsync,
  });

  const reserveSlot = async (time: string) => {
    setTimeSelected(time);
    setIsBooking(true);
    const hasMethod = await hasPaymentMethod();
    if (!hasMethod) {
      setIsBooking(false);
      navigation.navigate("PaymentScreen");
    }
    const reservedSlot = await reserveSlotMutation({
      appointmentId: appointment?.id || "",
      countryCode: center?.countryCode || "",
      slotTime: time,
    });
    if (!reservedSlot?.is_reserved) {
      console.log("Something went wrong in reserving slot");
      return;
    }
    const confirmSlot = await confrimSlotAsync({
      appointmentId: appointment?.id || "",
      countryCode: center?.countryCode || "",
    });
    if (confirmSlot?.error) {
      console.log("Something went wrong confirming the appointment");
      return;
    }
    navigation.navigate("BookAppointmentSuccessScreen");
    setIsBooking(false);
  };

  const hasPaymentMethod = async () => {
    const guestAccount = await getGuestAccountByCountry(
      center?.countryCode || "",
    );
    if (!guestAccount) {
      console.log("Something went wrong in getting account information");
      return null;
    }
    const methods = await getGuestPaymentMethods({
      centerId: center?.centerId || "",
      countryCode: center?.countryCode || "",
      guestId: guestAccount.guestId,
    });
    if (methods?.error == null) {
      return methods?.accounts && methods.accounts.length > 0;
    }
    return null;
  };

  const loadSlots = useCallback(
    async ({ service, date }: { service: ZenotiService; date: string }) => {
      setSlots({ available: [], futureDay: null, nextAvailableDay: null });
      setGroupSlots({});
      const guests = await getUserGuests();
      const guestAccount = guests?.guestAccounts.find(
        (guest) => guest.countryCode === center?.countryCode,
      );
      if (guestAccount) {
        const appointment = await createAppointment({
          date: date,
          guestId: guestAccount.guestId,
          serviceId: service.id,
          centerId: center?.centerId,
          countryCode: guestAccount.countryCode,
        });
        if (appointment?.id) setAppointment(appointment);
        else return;
        const slots = await getSlots({
          appointmentId: appointment.id,
          countryCode: guestAccount.countryCode,
        });
        if (slots?.Error !== null) {
          console.log("Failed to fetch slots");
          return null;
        }
        setSlots({
          available: slots.slots,
          futureDay: slots.future_days,
          nextAvailableDay: slots.next_available_day,
        });
        const keys = Object.keys(groupSlotsTogether(slots.slots)).sort();
        setGroupSlots(groupSlotsTogether(slots.slots));
        if (keys.length > 0) {
          updateAppointmentFilters({
            hour: keys[0],
          });
        }
      }
    },
    [
      center?.centerId,
      center?.countryCode,
      setAppointment,
      setGroupSlots,
      setSlots,
      updateAppointmentFilters,
    ],
  );

  return {
    reserveSlot,
    isBooking,
    timeSelected,
    hasPaymentMethod,
    loadSlots,
  };
};
