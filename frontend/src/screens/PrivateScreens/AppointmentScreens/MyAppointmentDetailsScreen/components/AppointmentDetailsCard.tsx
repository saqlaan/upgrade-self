import React, { useEffect } from "react";

import { addMinutes, format } from "date-fns";
import { Box, Text } from "@/components/atoms";
import {
  CallIcon,
  DollarIcon,
  MapPointUnderlineIcon,
  StopWatchIcon,
} from "@/theme/assets/icons";
import { useCenterStore } from "@/store/centerStore";
import { GuestAppointmentType } from "@/types/zenoti/BookedAppointmentType";
import { Linking, Platform, Pressable } from "react-native";

const AppointmentDetailsCard = ({
  appointment,
}: {
  appointment: GuestAppointmentType;
}) => {
  const { allCenters } = useCenterStore();
  const appointmentService = appointment?.appointment_services[0];
  const { price, duration } = appointmentService?.service || {};
  const { start_time } = appointmentService || {};
  const { invoice_status } = appointment || {};
  const center = allCenters.find(
    (center) => center.id === appointment.center_id
  );
  const name = appointmentService?.service?.name || "";
  const contactInfo = center?.contact_info || null;

  const invoiceStatusMap = {
    0: "Open",
    1: "Processed",
    2: "CampaignApplied",
    3: "CouponApplied",
    4: "Closed",
    11: "NotSpecified",
    99: "Voided",
  };

  const getInvoiceStatus = () => invoiceStatusMap[invoice_status] || "";

  return (
    <Box bgColor={"grey-400"} px="4" py="4" radius="3">
      <Box alignItems="center" row gap="3" mb="4">
        <Box
          radius="2"
          bgColor={"secondary"}
          py="1"
          alignItems="center"
          justifyContent="center"
          style={{ width: 45, height: 50 }}
        >
          <Text variant="text-sm-bold" align="center" color="white">
            {`${format(start_time, "dd")}\n${format(start_time, "EEE")}`}
          </Text>
        </Box>
        <Box
          style={{ borderWidth: 0.5, height: "80%", backgroundColor: "#333" }}
        />
        <Box gap="1">
          <Text variant="text-lg-bold">{name}</Text>
          <Box row gap="1">
            <StopWatchIcon />
            <Text color="black-400" variant="text-sm-medium">
              {format(start_time, "EEE MMM dd")}, {format(start_time, "hh:mm")}{" "}
              - {format(addMinutes(start_time, duration), "hh:mm a")}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box mb="4">
          <Text variant="text-sm-regular">Status</Text>
          <Box row alignItems="center" gap="3" mt="2">
            <DollarIcon />
            <Text color="black-400" variant="text-sm-semi-bold">
              {price.final} $ ({getInvoiceStatus()})
            </Text>
          </Box>
        </Box>
        <Box mb="4">
          <Text variant="text-sm-regular">Location</Text>
          <Box row alignItems="center" gap="3" mt="2">
            <MapPointUnderlineIcon />
            <Text color="black-400" variant="text-sm-semi-bold">
              {center?.name}
            </Text>
          </Box>
        </Box>
        <Box mb="4">
          <Box row justifyContent="space-between">
            <Box>
              <Text variant="text-sm-regular">Contact</Text>
              {contactInfo && contactInfo.phone_1 && (
                <Pressable
                  onPress={() => {
                    if (!contactInfo.phone_1) return;
                    Linking.openURL(
                      `tel:${contactInfo.phone_1.display_number}`
                    );
                  }}
                >
                  <Box row alignItems="center" gap="3" mt="2">
                    <CallIcon />
                    <Text color="black-400" variant="text-sm-semi-bold">
                      {contactInfo.phone_1.display_number}
                    </Text>
                  </Box>
                </Pressable>
              )}
            </Box>
            <Box>
              <Text variant="text-sm-regular">Direction</Text>
              <Box row alignItems="center" gap="3" mt="2">
                <Pressable
                  onPress={() => {
                    if (!center) return;
                    const { address_1, address_2, city, state, zip } =
                      center.address_info;
                    const googleMapQuery = `${address_1} ${address_2} ${city} ${state} ${zip}`;
                    const fullAddress = googleMapQuery.replace(/ /g, "+");
                    const url = Platform.select({
                      ios: `maps:0,0?q=${fullAddress}`,
                      android: `geo:0,0?q=${fullAddress}`,
                    });
                    Linking.openURL(url);
                  }}
                >
                  <Text color="black-400" variant="text-sm-semi-bold">
                    Open Map
                  </Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentDetailsCard;
