import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box } from "@/components/atoms";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { AppointmentCardWithActions } from "@/components";
import { useCenter } from "@/store/center";
import { SlotType } from "@/types";

export function SlotsSection() {
  const { groupSlots, selectedHour, selectedService } =
    useCreateAppointmentStore();
  const { center } = useCenter();
  const navigation = useNavigation();
  const slotCards = groupSlots ? groupSlots[selectedHour] || [] : [];

  const handleOnPressDetails = useCallback((item: SlotType) => {
    navigation.navigate("BookAppointmentDetailsScreen", { slot: item });
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <AppointmentCardWithActions
        title={selectedService?.name || ""}
        time={item.Time}
        duration={selectedService?.duration}
        location={center?.name}
        index={0}
        price={selectedService?.price_info.sale_price}
        onPressBookSession={() => navigation.navigate("PaymentScreen")}
        onPressViewDetails={() => handleOnPressDetails(item)}
      />
    );
  };

  if (!slotCards) return null;
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
