import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBookAppointmentMethods } from "../hooks/useBookAppointmentMethods";
import { Box } from "@/components/atoms";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { useCenterStore } from "@/store/centerStore";
import { SlotType } from "@/types";
import { AppointmentCardWithActions } from "@/components";

export function SlotsSection() {
  const { groupSlots, selectedService, filters } = useCreateAppointmentStore();
  const { reserveSlot, isBooking, timeSelected } = useBookAppointmentMethods();
  const { center } = useCenterStore();
  const navigation = useNavigation();
  const slotCards = groupSlots ? groupSlots[filters.hour] || [] : [];

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
        index={index}
        price={selectedService?.price.final}
        onPressBookSession={() => handleBookSession(item)}
        isBooking={item.Time === timeSelected ? isBooking : false}
      />
    );
  };

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
