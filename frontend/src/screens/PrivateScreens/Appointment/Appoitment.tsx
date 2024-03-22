import React from "react";
import { Box, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";

function Appointment({ navigation }: ApplicationScreenProps) {
  return (
    <SafeScreen>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text>Under development</Text>
      </Box>
    </SafeScreen>
  );
}

export default Appointment;
