import React from "react";
import { StatusBar } from "react-native";
import { BookAppointmentHeader, TimeSlotSection } from "./components";
import { useBookAppointmentScreen } from "./components/hooks/useBookAppointmentScreen";
import { SlotsSection } from "./components/SlotsSection";
import { Box, Text } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import { useServicesStore } from "@/store/servicesStore";
import { isIOS } from "@/utils/functions";
import { colors } from "@/theme";

function BookAppointment({ navigation }: ApplicationScreenProps) {
  const { servicesAvailable } = useServicesStore();
  useBookAppointmentScreen();

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
      {servicesAvailable() ? (
        <Box py="4" flex={1}>
          <Box mb="4">
            <TimeSlotSection />
          </Box>
          <Box px="4">
            {/* <Box pr="5" alignItems="center" flex={1}>
              {slotCards.map((item) => (
                <Box alignItems="center" mb="2" key={item}>
                  <Box
                    radius={"20"}
                    bgColor={"primary"}
                    style={{ width: 10, height: 10 }}
                    mb="1"
                  />
                  <LineIcon />
                </Box>
              ))}
            </Box> */}
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
