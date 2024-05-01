import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { Box, Text } from "@/components/atoms";
import { getNextSevenDays } from "@/utils/functions";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";

function DateSelection() {
  const nextWeekDates = getNextSevenDays();
  const { filters, updateAppointmentFilters: updateFilters } =
    useCreateAppointmentStore();

  const handleOnPress = useCallback(
    (date: string) => {
      updateFilters({
        date: format(date, "yyyy-MM-dd"),
      });
    },
    [updateFilters],
  );

  const renderItem = useCallback(
    (item) => {
      const isSelected = filters.date === format(item, "yyyy-MM-dd");
      return (
        <TouchableOpacity onPress={() => handleOnPress(item)}>
          <Box
            px="2"
            py="1"
            alignItems="center"
            bgColor={isSelected ? "secondary" : ["transparent"]}
            radius="3"
            style={{ minHeight: 55 }}
          >
            <Box>
              <Text variant={"text-sm-medium"} color="white" mb="2">
                {format(item, "EEEEE")}
              </Text>
            </Box>
            <Box>
              <Text variant={"text-sm-medium"} color="white">
                {format(item, "dd")}
              </Text>
            </Box>
          </Box>
        </TouchableOpacity>
      );
    },
    [filters.date, handleOnPress],
  );

  return (
    <Box row justifyContent="space-between">
      {nextWeekDates.map(renderItem)}
    </Box>
  );
}

export default DateSelection;
