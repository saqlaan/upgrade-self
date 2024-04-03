import React from "react";
import { useTheme } from "react-native-paper";
import { ImageBackground, StyleSheet } from "react-native";
import { Box, Text } from "@/components/atoms";
import { AppTheme } from "@/types/theme";
import { Images } from "@/theme/assets/images";
import { colors, spacing } from "@/theme";
import { InfoIconCircleOutlineIcon } from "@/theme/assets/icons";

const HealthScoreCard = () => {
  const { colors, spacing } = useTheme<AppTheme>();

  return (
    <ImageBackground style={styles.container} source={Images.HealthCardBg}>
      <Box row>
        <Box flex={1}>
          <Text color="white" variant="text-md-bold" mb="2">
            Your health score is good
          </Text>
          <Text color="white" variant="text-md-regular" mb="4">
            Your score has gone up by 10 and considered good.
          </Text>
          <Box row gap="2">
            <Text color="white">Learn more</Text>
            <InfoIconCircleOutlineIcon fill={colors.white} />
          </Box>
        </Box>
      </Box>
    </ImageBackground>
  );
};

export default HealthScoreCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    overflow: "hidden",
    padding: spacing[4],
  },
});
