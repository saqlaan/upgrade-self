import React, { ReactNode } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Box, Text } from "@/components/atoms";
import { BrainIcon, CaloriesIcon, TimeIcon } from "@/theme/assets/icons";
import { spacing } from "@/theme";
import { Images } from "@/theme/assets/images";

type VariantsType = {
  [key in "brain" | "heart" | "calories" | "weight"]: {
    title: string;
    valueType: string;
    icon: ReactNode;
    color: string;
  };
};
const Variants: VariantsType = {
  brain: {
    title: "My\nScore",
    color: "#73D485",
    valueType: "",
    icon: BrainIcon,
  },
  heart: {
    title: "Session\nAlpha",
    color: "#E43C40",
    valueType: "min",
    icon: TimeIcon,
  },
  calories: {
    title: "EC\nWeight",
    color: "#EE862A",
    valueType: "lbs",
    icon: CaloriesIcon,
  },
  weight: {
    title: "TC\nWeight",
    color: "#AC9AF6",
    valueType: "lbs",
    icon: TimeIcon,
  },
};

const HealthActivityCard = ({
  variant = "brain",
  value = 100,
  index,
}: {
  value: number;
  variant: "brain" | "heart" | "calories" | "weight";
  index: number;
}) => {
  const { color, icon: Icon, title, valueType } = Variants[variant];
  const addMargin = index === 0;
  return (
    <Box
      bgColor={"grey-400"}
      px="4"
      py="4"
      style={[styles.container, { marginLeft: addMargin ? spacing[4] : 0 }]}
      justifyContent="space-between"
    >
      <ImageBackground
        source={Images.HealthActivityCardBg}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: spacing[3],
          overflow: "hidden",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      ></ImageBackground>
      <Box mb="2" row gap="2">
        <Box px="2" py="2" bgColor={"white"} radius="2">
          <Icon />
        </Box>
        <Text color="black-400" variant="text-sm-semi-bold">
          {title}
        </Text>
      </Box>
      <Box row alignItems="baseline" gap="1">
        <Text variant="display-md-semi-bold" color="black-500">
          {value.toFixed(0)}
        </Text>
        <Text variant="text-sm-medium" color="black-300">
          {valueType}
        </Text>
      </Box>
    </Box>
  );
};

export default HealthActivityCard;

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: 150,
    borderRadius: spacing[3],
    position: "relative",
    overflow: "hidden",
  },
});
