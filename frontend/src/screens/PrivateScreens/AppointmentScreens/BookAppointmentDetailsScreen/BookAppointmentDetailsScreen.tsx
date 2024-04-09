import React from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton, Box, CButton, RoundedTop, Text } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Images } from "@/theme/assets/images";
import { spacing } from "@/theme";
import { MapPointUnderlineIcon, StopWatchIcon } from "@/theme/assets/icons";

const AppointmentCard = () => {
  return (
    <Box bgColor={"grey-400"} px="4" py="4" radius="3">
      <Box alignItems="center" row gap="3">
        <Box
          radius="2"
          bgColor={"secondary"}
          py="1"
          alignItems="center"
          justifyContent="center"
          style={{ width: 45, height: 50 }}
        >
          <Text variant="text-sm-bold" align="center" color="white">
            03 Wed
          </Text>
        </Box>
        <Box
          style={{ borderWidth: 0.5, height: "80%", backgroundColor: "#333" }}
        />
        <Box gap="1">
          <StopWatchIcon />
          <Text color="black-400" variant="text-sm-medium">
            Wed Oct 03, 10:30 - 11:00 AM
          </Text>
        </Box>
      </Box>
      <Box alignItems="center" row gap="3" mt="4">
        <MapPointUnderlineIcon />
        <Text color="black-400" variant="text-sm-medium">
          Meridian
        </Text>
      </Box>
    </Box>
  );
};

function BookAppointmentDetailsScreen({ navigation }: ApplicationScreenProps) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <Box flex={1} bgColor="white" style={{ paddingBottom: bottom }}>
      <StatusBar barStyle={"light-content"} />
      <Box>
        <ImageBackground
          style={[styles.topSection, { paddingTop: top }]}
          source={Images.BookDetailsBg}
        >
          <Box row>
            <BackButton style={{ backgroundColor: "white" }} color="primary" />
          </Box>
        </ImageBackground>
      </Box>
      <RoundedTop />
      <ScrollView style={{ flex: 1 }}>
        <Box flex={1} px="4">
          <Box row justifyContent="space-between">
            <Text variant="text-xl-bold" color="black-400">
              Cell Health Analysis
            </Text>
            <Text variant="text-xl-bold" color="black-400">
              $10
            </Text>
          </Box>
          <Box mt="4">
            <AppointmentCard />
          </Box>
          <Box mt="4">
            <Text variant="text-lg-bold">About</Text>
            <Text mt="2" variant="text-md-regular">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo conse. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              nisi ut aliquip ex ea commodo conse. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              nisi ut aliquip ex ea commodo conse. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              nisi ut aliquip ex ea commodo conse. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </Text>
          </Box>
        </Box>
      </ScrollView>
      <Box px="5" py="5">
        <CButton onPress={() => navigation.navigate("PaymentScreen")}>
          <Text color={"white"} variant="text-md-semi-bold">
            Book session
          </Text>
        </CButton>
      </Box>
    </Box>
  );
}

export default BookAppointmentDetailsScreen;

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: spacing[4],
    minHeight: "30%",
    paddingBottom: spacing[10],
  },
});
