import React from "react";
import { StatusBar } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { BookAppointmentHeader, TimeSlotSection } from "./components";
import { useBookAppointmentScreen } from "./hooks/useBookAppointmentScreen";
import { SlotsSection } from "./components/SlotsSection";
import { Box, Text } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import { useServicesStore } from "@/store/servicesStore";
import { isIOS } from "@/utils/functions";
import { colors, spacing } from "@/theme";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";

function BookAppointment({ navigation }: ApplicationScreenProps) {
  const { servicesAvailable } = useServicesStore();
  const { selectedService } = useCreateAppointmentStore();
  const { isLoadingSlots } = useBookAppointmentScreen();

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
      {selectedService === null && (
        <Box pt="4" alignItems="center" justifyContent="center">
          <Text variant="text-sm-regular">Please select service</Text>
        </Box>
      )}
      {isLoadingSlots && (
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size={spacing[6]} />
        </Box>
      )}

      {servicesAvailable() ? (
        <Box py="4" flex={1}>
          <Box mb="4">
            <TimeSlotSection />
          </Box>
          <Box px="4">
            <SlotsSection />
          </Box>
        </Box>
      ) : (
        <Box pt="4" px="4" alignItems="center" justifyContent="center">
          <Text variant="text-sm-regular">
            We regret to inform you that no services are currently available at
            this center. Kindly await further updates or consider selecting a
            different center for your convenience.
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default BookAppointment;
