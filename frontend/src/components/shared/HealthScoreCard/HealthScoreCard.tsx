import React from "react";
import { useTheme } from "react-native-paper";
import {
  ImageBackground,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { Box, Text } from "@/components/atoms";
import { AppTheme } from "@/types/theme";
import { Images } from "@/theme/assets/images";
import { colors, spacing } from "@/theme";
import { InfoIconCircleOutlineIcon } from "@/theme/assets/icons";

const CircularProgress = ({ size, strokeWidth, progress }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const alpha = (progress / 100) * 360;
  const strokeDashoffset = circumference - (alpha / 360) * circumference;

  // Calculate the position of the end cap circle based on the progress
  const endX = size / 2 + radius * Math.cos(((alpha - 90) * Math.PI) / 180);
  const endY = size / 2 + radius * Math.sin(((alpha - 90) * Math.PI) / 180);

  const viewBoxOffset = strokeWidth;

  return (
    <View>
      <Svg
        height={size}
        width={size}
        viewBox={`${-viewBoxOffset} ${-viewBoxOffset} ${size + strokeWidth} ${size + strokeWidth}`}
        style={{ overflow: "visible" }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFA726"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <Circle cx={endX} cy={endY} r={strokeWidth * 1.2} fill="#FFA726" />
        <SvgText
          x={size / 2 + strokeWidth / 2}
          y={size / 2 + strokeWidth / 2}
          fill="#fff"
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {`${progress}%`}
        </SvgText>
      </Svg>
    </View>
  );
};

const HealthScoreCard = () => {
  const { colors, spacing } = useTheme<AppTheme>();

  return (
    <ImageBackground style={styles.container} source={Images.HealthCardBg}>
      {/* <Box row>
        <Box flex={1}>
          <Text color="white" variant="text-md-bold" mb="2">
            Your health score is good
          </Text>
          <Text color="white" variant="text-md-regular" mb="4">
            Your score has gone up by 10 and considered good.
          </Text>
          <Box row gap="2" alignItems="center">
            <Text color="white" style={{ textDecorationLine: "underline" }}>
              Learn more
            </Text>
            <InfoIconCircleOutlineIcon fill={colors.white} />
          </Box>
        </Box>
        <Box>
          <CircularProgress size={100} strokeWidth={4} progress={84} />
        </Box>
      </Box> */}
      <Box row>
        <Box flex={1}>
          <Text color="white" variant="text-md-bold" mb="2">
            Welcome to Upgrade Labs!
          </Text>
          <Text color="white" variant="text-md-regular" mb="4">
            {/* Your score has gone up by 10 and considered good. */}
            Start your journey with us.
          </Text>
          <Pressable
            onPress={() => {
              Linking.openURL("https://www.upgradelabs.com/");
            }}
          >
            <Box row gap="2" alignItems="center">
              <Text color="white" style={{ textDecorationLine: "underline" }}>
                Learn more
              </Text>
              <InfoIconCircleOutlineIcon fill={colors.white} />
            </Box>
          </Pressable>
        </Box>
        {/* <Box>
          <CircularProgress size={100} strokeWidth={4} progress={84} />
        </Box> */}
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
