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
    });
  }, [
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
      {/* {isLoadingSlots && (
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size={spacing[6]} />
        </Box>
      )} */}
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