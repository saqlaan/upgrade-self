import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { BookAppointmentHeader, TimeSlotSection } from "./components";
import { SlotsSection } from "./components/SlotsSection";
import { useBookAppointmentMethods } from "./hooks/useBookAppointmentMethods";
import { Box } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import { isIOS } from "@/utils/functions";
import { colors } from "@/theme";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { ZenotiService } from "@/types";

function RescheduleAppointmentScreen({
  navigation,
  route,
}: ApplicationScreenProps) {
  const appointment = route.params?.appointment;

  const { filters, selectedService } = useCreateAppointmentStore();
  const { loadSlots } = useBookAppointmentMethods();

  useEffect(() => {
    loadSlots({
      invoiceItemId: appointment?.appointment_services[0].invoice_item_id,
      invoiceId: appointment?.invoice_id,
      date: filters.date,
      service: selectedService as ZenotiService,
    });
  }, [
    appointment,
    appointment?.appointment_services,
    appointment?.invoice_id,
    filters.date,
    loadSlots,
    selectedService,
  ]);

  if (!appointment) {
    navigation.goBack();
  }
  return (
    <Box flex={1} bgColor="white">
      {isIOS ? (
        <StatusBar barStyle={"light-content"} />
      ) : (
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={colors.primary}
        />
      )}
      <BookAppointmentHeader />
      <Box py="4" flex={1}>
        <Box mb="4">
          <TimeSlotSection />
        </Box>
        <Box px="4" flex={1}>
          <Box flex={1}>
            <SlotsSection />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RescheduleAppointmentScreen;
