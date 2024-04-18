import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SearchBar, BottomFilterSheet, DateSelection } from "./SearchFilters";
import { BackButton, Box, Text } from "@/components/atoms";
import { Images } from "@/theme/assets/images";
import { spacing } from "@/theme";
import { DynamicBottomSheet } from "@/components";
import { useDynamicBottomSheet } from "@/hooks";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";

export function BookAppointmentHeader() {
  const { top } = useSafeAreaInsets();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useDynamicBottomSheet();
  const { selectedService } = useCreateAppointmentStore();

  return (
    <Box>
      <ImageBackground
        style={[
          styles.topSection,
          { paddingTop: top, paddingBottom: spacing[6] },
        ]}
        source={Images.BookAppointmentBg}
      >
        <Box row alignItems="center" justifyContent="space-between">
          <BackButton />
          <Box style={styles.title}>
            <Text variant="text-xl-bold" color="white">
              Book an appointment
            </Text>
          </Box>
        </Box>
        {/* Search section */}
        <Box mt="6">
          <SearchBar onPressFilters={() => openBottomSheet()} />
        </Box>
        {/* Selecting date section */}
        {selectedService && (
          <Box mt="6">
            <DateSelection />
          </Box>
        )}
      </ImageBackground>
      <DynamicBottomSheet bottomSheetModalRef={bottomSheetRef}>
        <BottomFilterSheet onPressCancel={() => closeBottomSheet()} />
      </DynamicBottomSheet>
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
