import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { BookAppointmentHeader, SlotsSection } from "./components";
import { Box } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppointmentCardWithActions } from "@/components";
import { LineIcon } from "@/theme/assets/icons";

function BookAppointment({ navigation }: ApplicationScreenProps) {
  return (
    <Box flex={1} bgColor="white">
      <StatusBar barStyle={"light-content"} />
      <BookAppointmentHeader />
      <Box py="4">
        <Box mb="4">
          <SlotsSection />
        </Box>
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
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({});

export default BookAppointment;
