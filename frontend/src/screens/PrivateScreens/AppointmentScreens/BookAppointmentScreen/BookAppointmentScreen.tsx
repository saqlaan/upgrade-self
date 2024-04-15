import React from "react";
import { StatusBar } from "react-native";
import { BookAppointmentHeader, SlotsSection } from "./components";
import { useBookAppointment } from "./useBookAppointment";
import { Box, Text } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppointmentCardWithActions } from "@/components";
import { LineIcon } from "@/theme/assets/icons";

function BookAppointment({ navigation }: ApplicationScreenProps) {
  const { services, isFetching, isFetched } = useBookAppointment();
  const areServicesAvailable = !isFetching && services?.length !== 0;

  return (
    <Box flex={1} bgColor="white">
      <StatusBar barStyle={"light-content"} />
      <BookAppointmentHeader />
      <Box py="4">
        {isFetched && areServicesAvailable && (
          <Box mb="4">
            <SlotsSection />
          </Box>
        )}
        {isFetched && areServicesAvailable ? (
          <Box px="4" row>
            <Box pr="5" alignItems="center">
              {[0, 1].map((item) => (
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
            </Box>
            <Box flex={1}>
              <AppointmentCardWithActions
                title={"Cell Health Analysis"}
                time={"01:00 PM"}
                duration={30}
                location={"Meridian"}
                index={0}
                price={20}
                onPressBookSession={() => navigation.navigate("PaymentScreen")}
                onPressViewDetails={() =>
                  navigation.navigate("BookAppointmentDetailsScreen")
                }
              />
              <Box mb="4" />
              <AppointmentCardWithActions
                title={"Cell Health Analysis"}
                time={"01:00 PM"}
                duration={30}
                location={"Meridian"}
                index={0}
                price={10}
                onPressBookSession={() => navigation.navigate("PaymentScreen")}
                onPressViewDetails={() =>
                  navigation.navigate("BookAppointmentDetailsScreen")
                }
              />
            </Box>
          </Box>
        ) : (
          <Box px="4" alignItems="center" justifyContent="center">
            <Text variant="text-sm-regular">
              We regret to inform you that no services are currently available
              at this center. Kindly await further updates or consider selecting
              a different center for your convenience.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BookAppointment;
