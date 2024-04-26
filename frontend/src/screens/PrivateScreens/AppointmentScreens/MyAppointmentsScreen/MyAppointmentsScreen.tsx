import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, TouchableOpacity } from "react-native";
import BookingList from "./components/BookingsList";
import useMyAppointments from "./useMyAppointments";

import SearchItem from "./components/SearchItem";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AndroidScreenTopSpace, Box, Text } from "@/components/atoms";
import { colors } from "@/theme";

const FilterButton = ({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
    <Box
      bgColor={selected ? "primary" : "white"}
      py={"2"}
      alignItems="center"
      justifyContent="center"
      radius="2"
      style={!selected && { borderWidth: 1, borderColor: colors["grey-500"] }}
    >
      <Text
        color={selected ? "white" : "black-800"}
        variant="text-sm-semi-bold"
      >
        {title}
      </Text>
    </Box>
  </TouchableOpacity>
);

export enum BookingType {
  MyBookings = "My bookings",
  PastBookings = "Past Bookings",
}

function MyAppointmentsScreen({ navigation }: ApplicationScreenProps) {
  const { activeBookings, pastBookings, silentRefresh, isLoading } =
    useMyAppointments();
  const [filters, setFilters] = useState<{
    bookingType: BookingType;
    searchText: string;
  }>({
    bookingType: BookingType.MyBookings,
    searchText: "",
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      silentRefresh();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, silentRefresh]);

  const handleOnPressButton = useCallback(
    (value: BookingType) => {
      setFilters({
        ...filters,
        bookingType: value,
        searchText: "",
      });
    },
    [filters],
  );

  const handleOnChangeText = useCallback(
    (text: string) => {
      setFilters({
        ...filters,
        searchText: text,
      });
    },
    [filters],
  );

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <AndroidScreenTopSpace />
      <Box flex={1}>
        <Box px="4" pb="4">
          <Box row gap="4" mb="4">
            <FilterButton
              title="My bookings"
              onPress={() => handleOnPressButton(BookingType.MyBookings)}
              selected={filters.bookingType === BookingType.MyBookings}
            />
            <FilterButton
              title="Past bookings"
              onPress={() => handleOnPressButton(BookingType.PastBookings)}
              selected={filters.bookingType === BookingType.PastBookings}
            />
          </Box>
          <SearchItem
            placeholder={
              filters.bookingType === BookingType.MyBookings
                ? "Search booked session"
                : "Search past sessions"
            }
            value={filters.searchText}
            onChangeText={handleOnChangeText}
          />
        </Box>
        <BookingList
          bookings={
            filters.bookingType === BookingType.MyBookings
              ? activeBookings
              : pastBookings
          }
          isLoading={isLoading}
          searchText={filters.searchText}
          bookingType={filters.bookingType}
          refresh={silentRefresh}
        />
      </Box>
    </SafeAreaView>
  );
}

export default MyAppointmentsScreen;
