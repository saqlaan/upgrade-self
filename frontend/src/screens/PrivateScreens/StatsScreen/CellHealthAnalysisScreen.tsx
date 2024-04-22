import React from "react";
import { Image } from "react-native";
import { BackButton, Box, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Images } from "@/theme/assets/images";

export default function Appointment({ navigation }: ApplicationScreenProps) {
  return (
    <SafeScreen>
      <Box px="4" bgColor="grey-400" flex={1} gap="4" pb="4">
        <Box alignItems="center">
          <Text variant="text-xl-bold">Cell Health Analysis</Text>
        </Box>
        <Box row justifyContent="space-between" alignItems="baseline">
          <Text variant="text-xl-bold">Metric</Text>
          <Text>Filter</Text>
        </Box>
        <Box bgColor="white" flex={1} radius="4" px="4" py="4" gap="4">
          <Text variant="text-xl-bold">EC Weight</Text>
          <Box row gap="4">
            <Box>
              <Text>Current weight</Text>
              <Text variant="text-sm-bold">135.5 lbs</Text>
            </Box>
            <Box>
              <Text>Age</Text>
              <Text variant="text-sm-bold">32</Text>
            </Box>
            <Box>
              <Text>BMI</Text>
              <Text variant="text-sm-bold">26</Text>
            </Box>
            <Box>
              <Text>Status</Text>
              <Text variant="text-sm-bold">Normal</Text>
            </Box>
          </Box>
        </Box>
        <Box bgColor="white" flex={1} radius="4" px="4" py="4" gap="4">
          <Text variant="text-xl-bold">Segmented fat analysis</Text>
          <Box row gap="4">
            <Box>
              <Text>Mass</Text>
              <Text variant="text-sm-bold">135.5 lbs</Text>
            </Box>
            <Box>
              <Text>Percentage</Text>
              <Text variant="text-sm-bold">156.0 %</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeScreen>
  );
}
