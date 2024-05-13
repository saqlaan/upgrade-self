import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import LinearGradient from "react-native-linear-gradient";
import { Box, Text } from "@/components/atoms";
import { colors, spacing } from "@/theme";
import { StopWatchWhite } from "@/theme/assets/icons";
import { Images } from "@/theme/assets/images";
import { ZenotiService } from "@/types";

const ActivityTheme = {
  0: {
    bgColor: "#f9dd07",
    image: Images.ActivitiesCardBg1,
    gradient: ["#CBB100", "#CBB100", "#f9dd07"],
  },
  1: {
    bgColor: "#A360CF",
    image: Images.ActivitiesCardBg2,
    gradient: ["#A568C6", "#C28CDF", "#ac85c3"],
  },
};

const ActivitiesCard = ({
  title = "Cell Health Analysis",
  duration = 30,
  index,
  onPressBookNow,
}: {
  title: string;
  duration: number;
  index: number;
  onPressBookNow: (service: ZenotiService) => void;
}) => {
  const addMargin = index === 0;
  const cardTheme = index % 2 !== 0 ? ActivityTheme[0] : ActivityTheme[1];
  return (
    <Box
      bgColor={[cardTheme.bgColor]}
      radius="4"
      style={[
        styles.container,
        { marginLeft: addMargin ? spacing[4] : 0, overflow: "hidden" },
      ]}
    >
      <Box
        style={{
          position: "absolute",
          width: "50%",
          height: "100%",
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.27, 1]}
          colors={cardTheme.gradient}
          style={{ flex: 1 }}
        />
      </Box>
      <Box
        style={{
          position: "absolute",
          right: 0,
          width: "50%",
          height: "100%",
        }}
      >
        <ImageBackground
          resizeMode="cover"
          source={cardTheme.image}
          style={{ flex: 1 }}
        />
      </Box>
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
              <StopWatchWhite />
              <Text variant="text-xs-medium" color="white">
                {duration} min
              </Text>
            </Box>
          </Box>
        </Box>
        <Box row>
          <TouchableOpacity onPress={onPressBookNow} style={{ width: "auto" }}>
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
