import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  confrimSlotAsync,
  reserveSlotAsync,
} from "@/services/firebaseApp/appointment";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { useCenterStore } from "@/store/centerStore";
import { getGuestAccountByCountry } from "@/utils/functions";
import { getGuestPaymentMethods } from "@/services/firebaseApp/guests";

export const useBookAppointmentMethods = () => {
  const { center } = useCenterStore();
  const navigation = useNavigation();
  const { appointment } = useCreateAppointmentStore();
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

  return {
    reserveSlot,
    isBooking,
    timeSelected,
    hasPaymentMethod,
  };
};
