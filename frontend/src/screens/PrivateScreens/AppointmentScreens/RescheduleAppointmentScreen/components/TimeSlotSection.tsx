import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Box, Text } from "@/components/atoms";
import { colors } from "@/theme";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { formatHour } from "@/utils/functions";

export function TimeSlotSection() {
  const { slots, groupSlots, filters, updateAppointmentFilters } =
    useCreateAppointmentStore();
  const slotKeys = Object.keys(groupSlots || []).sort((a, b) => a - b);

  const renderItem = ({ item, index }) => {
    const isSelected = item == filters.hour;
    const formatedTime = formatHour(item);
    return (
      <Pressable
        onPress={() => updateAppointmentFilters({ hour: item as string })}
      >
        <Box
          px="4"
          py="2"
          ml={index === 0 ? "4" : ["0"]}
          radius="2"
          style={[
            styles.item,
            isSelected ? { backgroundColor: colors.secondary } : {},
          ]}
        >
          <Text
            variant="text-sm-semi-bold"
            color={isSelected ? "white" : "black-800"}
          >
            {formatedTime}
          </Text>
        </Box>
      </Pressable>
    );
  };
  if (slots.available.length === 0) return null;
  return (
    <Box>
      <FlatList
        horizontal
        data={slotKeys}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Box px="1" />}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: colors["grey-500"],
  },
});
