import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Box, Text } from "@/components/atoms";
import { colors } from "@/theme";

const Data = [
  { time: "10:00 AM" },
  { time: "12:00 PM" },
  { time: "02:00 PM" },
  { time: "04:00 PM" },
  { time: "06:00 PM" },
  { time: "08:00 PM" },
];

export function SlotsSection() {
  const renderItem = ({ item, index }) => {
    const isSelected = index === 2;
    const { time } = item;
    return (
      <Box
        px="4"
        py="2"
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
          {time}
        </Text>
      </Box>
    );
  };
  return (
    <Box>
      <FlatList
        horizontal
        data={Data}
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
