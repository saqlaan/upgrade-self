import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box, Text } from "@/components/atoms";

const Dates = [
  { day: "M", date: "01" },
  { day: "T", date: "02" },
  { day: "W", date: "03" },
  { day: "T", date: "04" },
  { day: "F", date: "05" },
  { day: "S", date: "06" },
  { day: "S", date: "07" },
];

function DateSelection() {
  const renderItem = useCallback((item, index) => {
    const { day, date } = item;
    const isSelected = index === 2;
    return (
      <TouchableOpacity>
        <Box
          px="2"
          py="1"
          alignItems="center"
          bgColor={isSelected ? "secondary" : ["transparent"]}
          radius="3"
        >
          <Box>
            <Text variant={"text-sm-medium"} color="white" mb="2">
              {day}
            </Text>
          </Box>
          <Box>
            <Text variant={"text-sm-medium"} color="white">
              {date}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  }, []);
  return (
    <Box row justifyContent="space-between">
      {Dates.map(renderItem)}
    </Box>
  );
}

const styles = StyleSheet.create({});

export default DateSelection;
