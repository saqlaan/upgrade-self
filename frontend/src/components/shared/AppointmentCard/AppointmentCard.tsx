import React from "react";
import { StyleSheet } from "react-native";
import { format } from "date-fns";
import { Box, Text } from "@/components/atoms";
import { spacing } from "@/theme";
import { MapPointUnderlineIcon, StopWatchIcon } from "@/theme/assets/icons";

const AppointmentCard = ({
  title = "Cell Health Analysis",
  time = "01:00 PM",
  date = "03 Wed",
  duration = 30,
  location = "Meridian",
  index,
}: {
  title: string;
  time: string;
  date: string;
  duration: number;
  location: string;
  index: number;
}) => {
  const addMargin = index === 0;
  return (
    <Box
      bgColor={"grey-400"}
      px="4"
      py="4"
      radius="3"
      style={[styles.container, { marginLeft: addMargin ? spacing[4] : 0 }]}
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
            {format(date, "dd EEE").split(" ").join("\n")}
          </Text>
        </Box>
        <Text variant="text-xl-bold" color="black-400">
          {title}
        </Text>
      </Box>
      <Box alignItems="center" row gap="3" mt="4">
        <StopWatchIcon />
        <Text color="black-300" variant="text-sm-medium">
          {time} - {duration} mins
        </Text>
      </Box>
      <Box alignItems="center" row gap="3" mt="4">
        <MapPointUnderlineIcon />
        <Text color="black-300" variant="text-sm-medium">
          {location}
        </Text>
      </Box>
    </Box>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  container: {
    width: 280,
  },
});
