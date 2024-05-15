import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { useBookAppointmentMethods } from "../hooks/useBookAppointmentMethods";
import { Box, Text } from "@/components/atoms";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { AppointmentCardWithActions } from "@/components";
import { useCenterStore } from "@/store/centerStore";
import { SlotType } from "@/types";
import { spacing } from "@/theme";

export function SlotsSection() {
  const { groupSlots, selectedService, filters, isSlotsLoading } =
    useCreateAppointmentStore();
  const { reserveSlot, isBooking, timeSelected } = useBookAppointmentMethods();
  const { center } = useCenterStore();
  const navigation = useNavigation();
  const slotCards = groupSlots ? groupSlots[filters.hour] || [] : [];

  const handleOnPressDetails = useCallback((item: SlotType) => {
    navigation.navigate("BookAppointmentDetailsScreen", { slot: item });
  }, []);

  const handleBookSession = useCallback(
    async (item: SlotType) => {
      await reserveSlot(item.Time);
    },
    [reserveSlot],
  );

  const renderItem = ({ item, index }) => {
    return (
      <AppointmentCardWithActions
        title={selectedService?.name || ""}
        time={item.Time}
        duration={selectedService?.duration}
        location={center?.name}
        index={0}
        price={selectedService?.price_info.sale_price}
        onPressBookSession={() => handleBookSession(item)}
        onPressViewDetails={() => handleOnPressDetails(item)}
        isBooking={item.Time === timeSelected ? isBooking : false}
      />
    );
  };

  if (isSlotsLoading) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size={spacing[6]} />
      </Box>
    );
  }

  if (!isSlotsLoading && groupSlots !== null && slotCards.length === 0) {
    return (
      <Box alignItems="center" justifyContent="center">
        <Text variant="text-sm-regular">
          No slots available today, please check alternate day.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <FlatList
        contentContainerStyle={{ paddingBottom: 80 }}
        data={slotCards}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Box mb="4" px="1" />}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ item, index }) => index}
      />
    </Box>
  );
}
