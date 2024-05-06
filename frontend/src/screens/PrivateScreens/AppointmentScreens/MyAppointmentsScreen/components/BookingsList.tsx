import React, { useCallback } from "react";
import { format, parseISO } from "date-fns";
import { Pressable, RefreshControl, SectionList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { BookingType } from "../MyAppointmentsScreen";
import { Box, Text } from "@/components/atoms";

import { GuestAppointmentType } from "@/types/zenoti/BookedAppointmentType";
import { BookedAppointmentCard } from "@/components";
import { spacing } from "@/theme";
import { useCenterStore } from "@/store/centerStore";
import { useCreateAppointmentStore } from "@/store/createAppointmentStore";
import { ZenotiService } from "@/types";

const BookingList = React.memo(
  ({
    bookings,
    isLoading,
    searchText,
    bookingType,
    refresh,
  }: {
    bookings: GuestAppointmentType[];
    isLoading: boolean;
    searchText: string;
    bookingType: BookingType;
    refresh: () => void;
  }) => {
    const { allCenters } = useCenterStore();
    const [refreshing, setRefreshing] = React.useState(false);
    const navigation = useNavigation();
    const { setSelectedService } = useCreateAppointmentStore();

    const bookingsToSectionList = useCallback(() => {
      let filteredBookings = bookings;
      if (bookings.length === 0) return [];

      filteredBookings = bookings.filter((booking) =>
        booking?.appointment_services[0]?.service.name
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      );
      const groupedAppointments = filteredBookings.reduce(
        (groups, appointment) => {
          const startTime = appointment.appointment_services[0]?.start_time;
          if (startTime) {
            const date = format(parseISO(startTime), "yyyy-MM-dd");
            groups[date] = groups[date] || [];
            groups[date].push(appointment);
          }
          return groups;
        },
        {},
      );
      const sortedDates = Object.keys(groupedAppointments).sort((a, b) => {
        return parseISO(b).getTime() - parseISO(a).getTime();
      });
      const sections = sortedDates.map((date) => ({
        title: date,
        data: groupedAppointments[date],
      }));
      return sections;
    }, [bookings, searchText]);

    const renderSectionHeader = useCallback(
      ({ section: { title } }) => (
        <Box my="4">
          <Text color="black-300" variant="text-sm-medium">
            {title}
          </Text>
        </Box>
      ),
      [],
    );

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await refresh();
      setRefreshing(false);
    }, [refresh]);

    const handleOnPress = useCallback(
      (appointment: GuestAppointmentType, isPastBooking: boolean) => {
        const service = appointment?.appointment_services[0]
          ?.service as unknown as ZenotiService;
        setSelectedService(service);
        navigation.navigate("MyAppointmentDetailScreen", {
          appointment,
          isPastBooking,
        });
      },
      [navigation, setSelectedService],
    );

    const renderItem = useCallback(
      ({ item, index }: { item: GuestAppointmentType; index: number }) => {
        const service = item?.appointment_services[0]?.service;
        const isPastBooking = bookingType === BookingType.PastBookings;
        if (!service) return null;
        const { start_time: startTime } = item?.appointment_services[0];
        const centerId = item?.center_id;
        const center = allCenters.find((center) => center.id === centerId);
        const { duration, name } = service;

        return (
          <Pressable onPress={() => handleOnPress(item, isPastBooking)}>
            <BookedAppointmentCard
              title={name}
              duration={duration}
              dateTime={startTime}
              location={center?.name || ""}
              index={index}
              isPastBooking={isPastBooking}
            />
          </Pressable>
        );
      },
      [allCenters, bookingType, handleOnPress],
    );

    if (!isLoading && bookings.length === 0) {
      return (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text>
            You currently have no{" "}
            {bookingType === BookingType.MyBookings
              ? "my bookings"
              : "past bookings"}
          </Text>
        </Box>
      );
    }

    if (isLoading) {
      return (
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size={spacing[6]} />
        </Box>
      );
    }

    return (
      <SectionList
        sections={bookingsToSectionList()}
        keyExtractor={(item, index) => item.appointment_group_id + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{
          paddingHorizontal: spacing[4],
          paddingBottom: spacing[4],
        }}
        ItemSeparatorComponent={() => <Box mb="4" />}
        stickySectionHeadersEnabled={false}
        refreshing
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  },
);

BookingList.displayName = "BookingList";

export default BookingList;
