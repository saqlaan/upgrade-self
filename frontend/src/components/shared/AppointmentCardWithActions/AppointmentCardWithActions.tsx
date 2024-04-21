import React from "react";
import { StyleSheet } from "react-native";
import { format } from "date-fns";
import { Box, CButton, Text } from "@/components/atoms";
import { MapPointUnderlineIcon, StopWatchIcon } from "@/theme/assets/icons";

const AppointmentCardWithActions = ({
  title = "Cell Health Analysis",
  time = "01:00 PM",
  duration = 30,
  location = "Meridian",
  price = 10,
  onPressViewDetails,
  onPressBookSession,
  isBooking,
}: {
  id: string;
  title: string;
  time: string;
  duration: number;
  location: string;
  index: number;
  price: number;
  onPressViewDetails: () => void;
  onPressBookSession: () => void;
  isBooking?: boolean;
}) => {
  return (
    <Box
      bgColor={"grey-400"}
      px="4"
      py="4"
      radius="3"
      style={[styles.container]}
    >
      <Box alignItems="center" justifyContent="space-between" row>
        <Text variant="text-xl-bold" color="black-400">
          {title}
        </Text>
        <Text variant="text-lg-bold">${price}</Text>
      </Box>
      <Box alignItems="center" row gap="3" mt="4">
        <StopWatchIcon />
        <Text color="black-300" variant="text-sm-medium">
          {format(time, "hh:mm a")} - {duration} mins
        </Text>
      </Box>
      <Box alignItems="center" row gap="3" mt="4">
        <MapPointUnderlineIcon />
        <Text color="black-300" variant="text-sm-medium">
          {location}
        </Text>
      </Box>
      <Box row gap="4" mt="4">
        <Box flex={1}>
          <CButton variant={"default"} onPress={onPressViewDetails} text="">
            <Text color="black-800">View details</Text>
          </CButton>
        </Box>
        <Box flex={1}>
          <CButton loading={isBooking} onPress={onPressBookSession}>
            <Text color="white">Book session</Text>
          </CButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentCardWithActions;

const styles = StyleSheet.create({
  container: {},
});
