import React from "react";
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import SearchSession from "./components/SearchSession";
import BottomFilterSheet from "./components/BottomFilterSheet";
import { BackButton, Box, Text } from "@/components/atoms";
import { Images } from "@/theme/assets/images";
import { spacing } from "@/theme";
import type { ApplicationScreenProps } from "@/types/navigation";
import { useUserStore } from "@/store/user.store";
import { DynamicBottomSheet } from "@/components";
import { useDynamicBottomSheet } from "@/hooks";

function BookAppointment({ navigation }: ApplicationScreenProps) {
  const { top } = useSafeAreaInsets();
  const { clearUser } = useUserStore();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useDynamicBottomSheet();

  const handleLogout = () => {
    auth().signOut();
    clearUser();
  };

  return (
    <Box flex={1} bgColor="white">
      <StatusBar barStyle={"light-content"} />
      <ImageBackground
        style={[styles.topSection, { paddingTop: top }]}
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
          <SearchSession onPressFilters={() => openBottomSheet()} />
        </Box>
        {/* Selecting date section */}
        <Box mt="6"></Box>
      </ImageBackground>
      <Box alignItems="center" py="5">
        <Pressable onPress={handleLogout}>
          <Text variant="text-md-semi-bold">Sign out</Text>
        </Pressable>
      </Box>
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

export default BookAppointment;
