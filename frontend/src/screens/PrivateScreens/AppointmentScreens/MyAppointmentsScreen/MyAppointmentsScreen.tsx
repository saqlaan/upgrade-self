import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import BookingList from "./components/BookingsList";
import SearchItem from "./components/SearchItem";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AndroidScreenTopSpace, Box, Text } from "@/components/atoms";
import { colors } from "@/theme";
import { isAndroid } from "@/utils/functions";
import { getUserGuests } from "@/services/firebase/collections/guest";
import { getBookedAppointments } from "@/services/firebaseApp/guests";
import { useCenterStore } from "@/store/centerStore";

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
  const { allCenters } = useCenterStore();

  const [bookings, setBookings] = React.useState<GuestAppointmentType[] | null>(
    null,
  );

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const accounts = await getUserGuests();
        const promises = accounts?.guestAccounts.map(async (guestAccount) => {
          const data = await getBookedAppointments({
            guestId: guestAccount?.guestId,
            countryCode: guestAccount?.countryCode,
          });
          return data?.appointments || [];
        });

        if (!promises) return;

        const data = await Promise.all(promises);
        const allAppointments = data.flatMap((obj) => obj);

        if (allAppointments.length === 0) return;


        setBookings(allAppointments);
      } catch (error) {
        console.error("Error loading bookings:", error);
        setBookings([]);
      }
    };
    loadBookings();
  }, [allCenters, navigation]);

  const currentTime = Date.now();
  const activeBookings = bookings?.filter((appointment) => {
    const endTimeString = appointment?.appointment_services[0]?.end_time;
    if (endTimeString) {
      const endTime = new Date(endTimeString);
      return endTime.getTime() >= currentTime;
    }
    return false;
  });
  const pastBookings = bookings?.filter((appointment) => {
    const endTimeString = appointment?.appointment_services[0]?.end_time;
    if (endTimeString) {
      const endTime = new Date(endTimeString);
      return endTime.getTime() < currentTime;
    }
    return false;
  });

  const [filters, setFilters] = useState<{
    bookingType: BookingType;
    searchText: string;
  }>({
    bookingType: BookingType.MyBookings,
    searchText: "",
  });
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      if (isAndroid) StatusBar.setBackgroundColor(colors["grey-200"]);
    }, [])
  );

  const handleOnPressButton = useCallback(
    (value: BookingType) => {
      setFilters({
        ...filters,
        bookingType: value,
        searchText: "",
      });
    },
    [filters]
  );

  const handleOnChangeText = useCallback(
    (text: string) => {
      setFilters({
        ...filters,
        searchText: text,
      });
    },
    [filters]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "white" }}
      >
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
                ? activeBookings || []
                : pastBookings || []
            }
            isLoading={bookings === null}
            searchText={filters.searchText}
            bookingType={filters.bookingType}
            refresh={() => {}}
          />
        </Box>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default MyAppointmentsScreen;
