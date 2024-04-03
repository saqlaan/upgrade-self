import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Box, Text } from "@/components/atoms";
import {
  BrainIcon,
  CaloriesIcon,
  HeartIcon,
  TimeIcon,
} from "@/theme/assets/icons";
import { spacing } from "@/theme";

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
    title: "Brain\nActivity",
    color: "#73D485",
    valueType: "BHI",
    icon: BrainIcon,
  },
  heart: {
    title: "Heart Rate",
    color: "#E43C40",
    valueType: "bpm",
    icon: HeartIcon,
  },
  calories: {
    title: "Calories",
    color: "#EE862A",
    valueType: "Kcal",
    icon: CaloriesIcon,
  },
  weight: {
    title: "Weight",
    color: "#AC9AF6",
    valueType: "Kg",
    icon: TimeIcon,
  },
};

const HealthActivityCard = ({
  variant = "brain",
  value = 100,
}: {
  value: number;
  variant: "brain" | "heart" | "calories" | "weight";
}) => {
  const { color, icon: Icon, title, valueType } = Variants[variant];
  return (
    <Box bgColor={"grey-400"} px="4" py="4" style={styles.container}>
      <Box mb="2" row gap="2">
        <Box px="2" py="2" bgColor={"white"} radius="2">
          <Icon />
        </Box>
        <Text color="black-400" variant="text-sm-semi-bold">
          {title}
        </Text>
      </Box>
      <Box row alignItems="flex-end" gap="1">
        <Text variant="text-xl-bold" color="black-500">
          {value}
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
  },
});
