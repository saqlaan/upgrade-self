import React, { useCallback } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { addMinutes, format } from "date-fns";
import { BackButton, Box, CButton, RoundedTop, Text } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Images } from "@/theme/assets/images";
import { spacing } from "@/theme";
import { MapPointUnderlineIcon, StopWatchIcon } from "@/theme/assets/icons";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { useCenterStore } from "@/store/centerStore";
import { SlotType, ZenotiService } from "@/types";
import { useBookAppointmentMethods } from "../BookAppointmentScreen/hooks/useBookAppointmentMethods";

const AppointmentCard = ({
  center,
  slot,
  service,
}: {
  center: any;
  slot: SlotType;
  service: ZenotiService;
}) => {
  const time = slot.Time;
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
            {`${format(time, "dd")}\n${format(time, "EEE")}`}
          </Text>
        </Box>
        <Box
          style={{ borderWidth: 0.5, height: "80%", backgroundColor: "#333" }}
        />
        <Box gap="1">
          <StopWatchIcon />
          {service && (
            <Text color="black-400" variant="text-sm-medium">
              {format(time, "EEE MMM dd")}, {format(time, "hh:mm")} -{" "}
              {format(addMinutes(time, service.duration), "hh:mm a")}
            </Text>
          )}
        </Box>
      </Box>
      <Box alignItems="center" row gap="3" mt="4">
        <MapPointUnderlineIcon />
        <Text color="black-400" variant="text-sm-medium">
          {center.name}
        </Text>
      </Box>
    </Box>
  );
};

function BookAppointmentDetailsScreen({ navigation }: ApplicationScreenProps) {
  const { top, bottom } = useSafeAreaInsets();
  const route = useRoute();
  const { selectedService } = useCreateAppointmentStore();
  const { center } = useCenterStore();
  const { slot } = route.params;
  const { reserveSlot, isBooking, timeSelected } = useBookAppointmentMethods();

  const handleBookSession = async () => {
    await reserveSlot(slot.Time);
  };

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
              {selectedService?.name}
            </Text>
            <Text variant="text-xl-bold" color="black-400">
              ${selectedService?.price_info.sale_price}
            </Text>
          </Box>
          <Box mt="4">
            <AppointmentCard
              slot={slot}
              center={center}
              service={selectedService}
            />
          </Box>
          <Box mt="4">
            <Text variant="text-lg-bold">About</Text>
            <Text mt="2" variant="text-md-regular">
              {selectedService?.description}
            </Text>
          </Box>
        </Box>
      </ScrollView>
      <Box px="5" py="5">
        <CButton onPress={handleBookSession}>
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
