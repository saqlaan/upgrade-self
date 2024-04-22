import React from "react";
import { Image } from "react-native";
import { Box, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Images } from "@/theme/assets/images";

function Appointment({ navigation }: ApplicationScreenProps) {
  return (
    <SafeScreen>
      <Box bgColor="grey-400" flex={1}>
        <Box justifyContent="start" py="4" px="5" gap="2">
          <Text variant="text-xl-bold">Stats</Text>
          <Text variant="text-lg-regular">
            Select the type of equipment to check the statistical insights
          </Text>
        </Box>
        <Box
          flex={1}
          justifyContent="start"
          py="6"
          px="4"
          gap="4"
          radius="4"
          bgColor="white"
        >
          <Box row bgColor="grey-400" py="6" px="4" radius="4">
            <Box>
              <Text variant="text-xl-bold">Cell Health Analysis</Text>
              <Text color="error">(Not Connected)</Text>
            </Box>
            <Box
              style={{
                maxHeight: 210,
              }}
            >
              <Image
                source={Images.CellHealthAnalysis}
                style={{
                  maxHeight: 250,
                  maxWidth: 150,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
          <Box row bgColor="grey-400" py="6" px="4" radius="4">
            <Box>
              <Text variant="text-xl-bold">Brain Upgrade</Text>
              <Text color="success">Connected</Text>
            </Box>
            <Box
              flex={1}
              style={{
                maxHeight: 200,
              }}
              alignItems="flex-end"
            >
              <Image
                source={Images.BrainUpgrade}
                style={{
                  maxHeight: 250,
                  maxWidth: 150,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeScreen>
  );
}

export default Appointment;
