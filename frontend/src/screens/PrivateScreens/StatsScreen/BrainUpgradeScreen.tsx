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
          <Text variant="text-xl-bold">Brain Upgrade</Text>
          <Text>Previous Session:</Text>
          <Text variant="text-lg-bold">30 min</Text>
          <Box
            style={{
              maxHeight: 200,
            }}
            alignItems="flex-end"
          >
            <Image
              source={Images.BrainUpgrade}
              style={{
                maxHeight: 150,
                maxWidth: 150,
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
        <Box row justifyContent="space-between" alignItems="baseline">
          <Text variant="text-xl-bold">Metric</Text>
          <Text>Filter</Text>
        </Box>
        <Box row gap="2">
          <Box bgColor="white" flex={1} radius="4" px="4" py="4">
            <Text variant="text-sm-bold">My score</Text>
            <Text variant="text-xl-bold">97</Text>
          </Box>
          <Box bgColor="white" flex={1} radius="4" px="4" py="4">
            <Text variant="text-sm-bold">Session Alpha</Text>
            <Box row alignItems="baseline" gap="1">
              <Text variant="text-xl-bold">25</Text>
              <Text>min</Text>
            </Box>
          </Box>
        </Box>
        <Box bgColor="white" flex={1} radius="4" px="4" py="4" gap="4">
          <Text variant="text-xl-bold">My history</Text>
          <Box row gap="4">
            <Box>
              <Text>Total Points</Text>
              <Text variant="text-sm-bold">501</Text>
            </Box>
            <Box>
              <Text>Best Session</Text>
              <Text variant="text-sm-bold">88</Text>
            </Box>
          </Box>
        </Box>
        <Box bgColor="white" flex={1} radius="4" px="4" py="4" gap="4">
          <Text variant="text-xl-bold">Baseline: 9.5 Hz</Text>
        </Box>
      </Box>
    </SafeScreen>
  );
}
