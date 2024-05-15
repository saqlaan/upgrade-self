import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DateSelection from "../../components/DatesSelection";
import {
  AndroidScreenTopSpace,
  BackButton,
  Box,
  Text,
} from "@/components/atoms";
import { Images } from "@/theme/assets/images";
import { spacing } from "@/theme";

export function BookAppointmentHeader() {
  const { top } = useSafeAreaInsets();

  return (
    <Box>
      <ImageBackground
        style={[
          styles.topSection,
          { paddingTop: top, paddingBottom: spacing[6] },
        ]}
        source={Images.BookAppointmentBg}
      >
        <AndroidScreenTopSpace />
        <Box row alignItems="center" justifyContent="space-between">
          <BackButton />
          <Box ml="5" style={styles.title}>
            <Text variant="text-xl-bold" color="white">
              Reschedule appointment
            </Text>
          </Box>
        </Box>
        <Box mt="6">
          <DateSelection />
        </Box>
      </ImageBackground>
    </Box>
  );
}

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: spacing[4],
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
