import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Box, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";
import { colors } from "@/theme";
import { isAndroid } from "@/utils/functions";

function Appointment({ navigation }: ApplicationScreenProps) {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      if (isAndroid) StatusBar.setBackgroundColor(colors["grey-400"]);
    }, []),
  );
  return (
    <SafeScreen>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text>Under development</Text>
      </Box>
    </SafeScreen>
  );
}

export default Appointment;
