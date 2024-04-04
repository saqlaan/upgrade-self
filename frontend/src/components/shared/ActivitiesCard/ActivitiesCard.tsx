import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import LinearGradient from "react-native-linear-gradient";
import { Box, Text } from "@/components/atoms";
import { colors, spacing } from "@/theme";
import { StopWatchIcon } from "@/theme/assets/icons";

const ActivitiesCard = ({
  title = "Cell Health Analysis",
  duration = 30,
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
      bgColor={["#FDE53F"]}
      radius="4"
      style={[
        styles.container,
        { marginLeft: addMargin ? spacing[4] : 0, overflow: "hidden" },
      ]}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 0.5, 1]}
        colors={["#CBB100", "#CBB10080", "#FDE33900"]}
        style={{ flex: 1 }}
      >
        <Box px="4" py="4" flex={1} justifyContent="space-between">
          <Box>
            <Text mb="3" variant="display-xs-bold" color="white">
              {title}
            </Text>
            <Box row>
              <Box
                row
                gap="2"
                alignItems="center"
                style={styles.durationContainer}
                px="1"
                py="1"
                radius="1"
              >
                <StopWatchIcon fill={"white"} />
                <Text variant="text-xs-medium" color="white">
                  {duration} min
                </Text>
              </Box>
            </Box>
          </Box>
          <Box row>
            <TouchableOpacity style={{ width: "auto" }}>
              <Box
                px="2"
                pl="3"
                py="2"
                radius="2"
                row
                bgColor={"white"}
                alignItems="center"
              >
                <Text variant="text-sm-bold">Book now</Text>
                <Icon
                  color={colors.primary}
                  size={spacing[6]}
                  source={"chevron-right"}
                />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </LinearGradient>
    </Box>
  );
};

export default ActivitiesCard;

const styles = StyleSheet.create({
  container: {
    height: 195,
    width: SCREEN_WIDTH - spacing["8"],
  },
  durationContainer: {
    borderWidth: 1,
    borderColor: "white",
  },
});
