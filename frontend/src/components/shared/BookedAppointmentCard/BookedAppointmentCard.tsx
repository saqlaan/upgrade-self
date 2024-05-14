import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { Box, Text } from "@/components/atoms";
import {
  MapPointUnderlineIcon,
  StopWatchIcon,
  ViewStatsIcon,
} from "@/theme/assets/icons";
import { colors, spacing } from "@/theme";

const BookedAppointmentCard = ({
  title = "Cell Health Analysis",
  dateTime = "2024-04-16T13:15:00",
  duration = 30,
  location = "Meridian",
  isPastBooking = false,
  status,
}: {
  title: string;
  dateTime: string;
  duration: number;
  location: string;
  index: number;
  isPastBooking: boolean;
  status: number;
}) => {
  return (
    <Box
      bgColor={"grey-400"}
      px="4"
      py="4"
      radius="3"
      style={[styles.container]}
    >
      <Box alignItems="center" row gap="3">
        <Box
          radius="2"
          bgColor={"secondary"}
          py="1"
          alignItems="center"
          justifyContent="center"
          style={{ width: 45, height: 50 }}
        >
          <Text variant="text-sm-bold" align="center" color="white">
            {format(dateTime, "dd EEE").split(" ").join("\n")}
          </Text>
        </Box>
        <Box>
          <Text variant="text-xl-bold" color="black-400">
            {title}
          </Text>
          {status == -1 && (
            <Text variant="text-sm-medium" color="black-400">
              Cancelled
            </Text>
          )}
        </Box>
      </Box>
      <Box alignItems="center" row gap="3" mt="4">
        <StopWatchIcon />
        <Text color="black-300" variant="text-sm-medium">
          {format(dateTime, "hh:mm aa")} - {duration} mins
        </Text>
      </Box>
      <Box alignItems="center" row gap="3" mt="4" mb="4">
        <MapPointUnderlineIcon />
        <Text color="black-300" variant="text-sm-medium">
          {location}
        </Text>
      </Box>
      {/* TODO: Re-enable */}
      {/* {isPastBooking && (
        <TouchableOpacity style={styles.viewStatsButton}>
          <Text variant={"text-md-semi-bold"}>View Stats</Text>
          <ViewStatsIcon />
        </TouchableOpacity>
      )} */}
    </Box>
  );
};

export default BookedAppointmentCard;

const styles = StyleSheet.create({
  container: {},
  viewStatsButton: {
    borderWidth: 1,
    borderColor: colors["black-50"],
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: spacing[2],
    backgroundColor: colors.white,
    flexDirection: "row",
    gap: spacing[2],
  },
});
