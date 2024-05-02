import React, { useCallback } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import Snackbar from "react-native-snackbar";
import AppointmentDetailsCard from "./components/AppointmentDetailsCard";
import ReasonList from "./data.json";
import {
  AndroidScreenTopSpace,
  BackButton,
  Box,
  CButton,
  Text,
} from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import { colors, spacing } from "@/theme";
import {
  CancelBookingIcon,
  RescheduleBookingIcon,
  VerticalDots,
} from "@/theme/assets/icons";
import { SafeScreen } from "@/components/template";
import { GuestAppointmentType } from "@/types/zenoti/BookedAppointmentType";
import { DynamicBottomSheet } from "@/components";
import { useDynamicBottomSheet } from "@/hooks";
import { cancelBooking } from "@/services/firebaseApp/appointment";
import { useCenterStore } from "@/store/centerStore";
import { useServicesStore } from "@/store/servicesStore";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { isIOS } from "@/utils/functions";

function MyAppointmentDetailsScreen({ navigation }: ApplicationScreenProps) {
  const route = useRoute();
  const appointment = route.params?.appointment as GuestAppointmentType;
  const isPastBooking = route.params?.isPastBooking;
  const { allCenters } = useCenterStore();
  const { resetStore: resetServicesStore } = useServicesStore();
  const { resetStore: resetAppointmentStore, selectedService } =
    useCreateAppointmentStore();

  const { mutateAsync: cancelBookingAsync, isPending: isPendingCancelBooking } =
    useMutation({
      mutationFn: cancelBooking,
    });

  const {
    bottomSheetRef: actionSheetRef,
    openBottomSheet: openActionSheet,
    closeBottomSheet: closeActionSheet,
  } = useDynamicBottomSheet();
  const {
    bottomSheetRef: cancelSheetRef,
    openBottomSheet: openCancelSheet,
    closeBottomSheet: closeCancelSheet,
  } = useDynamicBottomSheet();
  const {
    bottomSheetRef: reScheduleSheetRef,
    openBottomSheet: openReScheduleSheet,
    closeBottomSheet: closeReScheduleSheet,
  } = useDynamicBottomSheet();
  const {
    bottomSheetRef: cancelReasonSheet,
    openBottomSheet: openCancelReasonSheet,
    closeBottomSheet: closeCancelReasonSheet,
  } = useDynamicBottomSheet();
  const { bottom } = useSafeAreaInsets();

  const handleCancelBooking = useCallback(async () => {
    closeCancelSheet();
    setTimeout(() => {
      openCancelReasonSheet();
    }, 500);
    return;
  }, [closeCancelSheet, openCancelReasonSheet]);

  const handleConfirmCancelBooking = useCallback(
    async ({ reasonId, comments }) => {
      const invoiceId = appointment?.invoice_id || "";
      const center = allCenters.find(
        (center) => center.id === appointment.center_id,
      );
      const result = await cancelBookingAsync({
        invoiceId,
        countryCode: center?.country.code || "",
        reasonId,
        comments,
      });
      if (result?.success) {
        closeCancelSheet();
        navigation.goBack();
      } else {
        Snackbar.show({
          text: "Error",
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: "Failed to cancel the booking. Try later",
            textColor: colors.error,
          },
        });
        closeCancelReasonSheet();
      }
    },
    [
      allCenters,
      appointment.center_id,
      appointment?.invoice_id,
      cancelBookingAsync,
      closeCancelReasonSheet,
      closeCancelSheet,
      navigation,
    ],
  );

  const handleOpenCancelSheet = useCallback(() => {
    closeActionSheet();
    setTimeout(() => {
      openCancelSheet();
    }, 500);
  }, [closeActionSheet, openCancelSheet]);

  const handleOpenRescheduleSheet = useCallback(() => {
    closeActionSheet();
    setTimeout(() => {
      openReScheduleSheet();
    }, 500);
  }, [closeActionSheet, openReScheduleSheet]);

  const handleOnConfirmReschedule = useCallback(() => {
    closeReScheduleSheet();
    setTimeout(() => {
      navigation.navigate("RescheduleAppointmentScreen", {
        appointment,
      });
      resetAppointmentStore({
        selectedService,
      });
      resetServicesStore();
    }, 500);
  }, [
    appointment,
    closeReScheduleSheet,
    navigation,
    resetAppointmentStore,
    resetServicesStore,
    selectedService,
  ]);

  return (
    <SafeScreen style={{ flex: 1, backgroundColor: colors["white"] }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <AndroidScreenTopSpace />
      <Box row px="4" pb="4" justifyContent="space-between">
        <BackButton color={colors.primary} />
        {!isPastBooking && (
          <TouchableOpacity
            style={styles.actionButtonStyle}
            onPress={openActionSheet}
          >
            <VerticalDots />
          </TouchableOpacity>
        )}
      </Box>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "white" }}
      >
        <Box flex={1} px="4">
          <AppointmentDetailsCard appointment={appointment} />
          <Box mt="4">
            <Text variant="text-lg-bold">About</Text>
            <Text mt="2" variant="text-md-regular">
              TBD
            </Text>
          </Box>
        </Box>
      </ScrollView>
      <DynamicBottomSheet
        name="cancelSheet"
        bottomSheetModalRef={cancelSheetRef}
      >
        <Box
          px={"4"}
          py="4"
          alignItems="center"
          style={[isIOS && { paddingBottom: bottom }]}
        >
          <CancelBookingIcon />
          <Text variant="text-lg-bold" mt="2" mb="2">
            Cancel booking
          </Text>
          <Text mb="6" variant="text-md-regular">
            Are you sure you want to cancel booking?{" "}
          </Text>
          <Box row gap="4">
            <Box flex={1}>
              <CButton
                variant={"default"}
                onPress={closeCancelSheet}
                text="Go back"
              />
            </Box>
            <Box flex={1}>
              <CButton
                loading={isPendingCancelBooking}
                onPress={handleCancelBooking}
                text="Confirm"
              ></CButton>
            </Box>
          </Box>
        </Box>
      </DynamicBottomSheet>
      <DynamicBottomSheet
        name="rescheduleSheet"
        bottomSheetModalRef={reScheduleSheetRef}
      >
        <Box
          px="4"
          py="4"
          alignItems="center"
          style={[isIOS && { paddingBottom: bottom }]}
        >
          <RescheduleBookingIcon />
          <Text variant="text-lg-bold" mt="2" mb="2">
            Re-schedule booking
          </Text>
          <Text mb="6" variant="text-md-regular">
            Are you sure you want to reschedule your booking?
          </Text>
          <Box row gap="4">
            <Box flex={1}>
              <CButton
                variant={"default"}
                onPress={closeReScheduleSheet}
                text="Go back"
              />
            </Box>
            <Box flex={1}>
              <CButton
                onPress={handleOnConfirmReschedule}
                text="Confirm"
              ></CButton>
            </Box>
          </Box>
        </Box>
      </DynamicBottomSheet>
      <DynamicBottomSheet
        name="actionSheet"
        bottomSheetModalRef={actionSheetRef}
      >
        <Box
          px={"4"}
          py="4"
          row
          gap="4"
          style={[isIOS && { paddingBottom: bottom }]}
        >
          <Box flex={1}>
            <CButton
              variant={"default"}
              onPress={handleOpenCancelSheet}
              text="Cancel booking"
            />
          </Box>
          <Box flex={1}>
            <CButton
              onPress={handleOpenRescheduleSheet}
              text="Re-schedule"
            ></CButton>
          </Box>
        </Box>
      </DynamicBottomSheet>
      <DynamicBottomSheet
        name="reasonSheet"
        bottomSheetModalRef={cancelReasonSheet}
      >
        <Box px="4">
          {ReasonList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleConfirmCancelBooking(item)}
            >
              <Box mb="4">
                <Text>{item.comments}</Text>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </DynamicBottomSheet>
    </SafeScreen>
  );
}

export default MyAppointmentDetailsScreen;

const styles = StyleSheet.create({
  actionButtonStyle: {
    borderRadius: spacing[2],
    paddingHorizontal: spacing[4],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors["black-50"],
  },
});
