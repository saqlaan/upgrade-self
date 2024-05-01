import React, { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, Pressable, ScrollView, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useMyAppointments from "../AppointmentScreens/MyAppointmentsScreen/useMyAppointments";
import { HomeHeader } from "./components";
import { AndroidScreenTopSpace, Box, Text } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import {
  ActivitiesCard,
  BookedAppointmentCard,
  HealthActivityCard,
  HealthScoreCard,
} from "@/components";
import { colors } from "@/theme";
import { useMyBookingStore } from "@/store/myBookingsStore";
import { useCenterStore } from "@/store/centerStore";
import { GuestAppointmentType } from "@/types/zenoti/BookedAppointmentType";
import { isAndroid } from "@/utils/functions";

const HealthActivityData = [
  {
    variant: "brain",
    value: 78,
  },
  {
    variant: "heart",
    value: 81,
  },
  {
    variant: "calories",
    value: 98,
  },
  {
    variant: "weight",
    value: 71,
  },
];

const AppointmentData = [
  {
    title: "Meeting",
    time: "10:00 AM",
    date: "2024-04-04",
    duration: 45,
    location: "Conference Room A",
    index: 1,
  },
  {
    title: "Presentation",
    time: "02:30 PM",
    date: "2024-04-05",
    duration: 30,
    location: "Auditorium",
    index: 2,
  },
  {
    title: "Training",
    time: "09:00 AM",
    date: "2024-04-06",
    duration: 60,
    location: "Training Room",
    index: 3,
  },
];

function Home({ navigation }: ApplicationScreenProps) {
  const { top } = useSafeAreaInsets();
  const { activeBookings } = useMyBookingStore();
  const { allCenters } = useCenterStore();
  useMyAppointments();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      if (isAndroid) StatusBar.setBackgroundColor(colors["grey-400"]);
    }, []),
  );

  const renderAppointmentCardItem = useCallback(
    ({ item, index }: { item: GuestAppointmentType; index: number }) => {
      const service = item?.appointment_services[0]?.service;
      if (!service) return null;
      const { start_time: startTime } = item?.appointment_services[0];
      const centerId = item?.center_id;
      const center = allCenters.find((center) => center.id === centerId);
      const { duration, name } = service;

      return (
        <Box ml={index === 0 ? "4" : [0]} style={{ width: 280 }}>
          <BookedAppointmentCard
            title={name}
            duration={duration}
            dateTime={startTime}
            location={center?.name || ""}
            index={index}
            isPastBooking={false}
          />
        </Box>
      );
    },
    [allCenters],
  );

  return (
    <Box bgColor={"grey-400"} flex={1} style={{ paddingTop: top }}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={colors["grey-400"]}
      />
      <AndroidScreenTopSpace />
      <HomeHeader />
      <ScrollView style={{ flex: 1 }}>
        <Box pb="5" pt="5" bgColor={"white"} flex={1}>
          <Box px="4">
            <HealthScoreCard />
          </Box>
          {/* Activity cards */}
          <Box pt={"4"}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <Box px="2" />}
              data={HealthActivityData}
              renderItem={({ item, index }) => (
                <HealthActivityCard {...item} index={index} />
              )}
              automaticallyAdjustContentInsets
            />
          </Box>
          {/* Upcoming schedule */}
          <Box mt="6">
            <Box px="4" row justifyContent="space-between" mb="4">
              <Text variant="text-lg-bold">Upcoming Schedule</Text>
              <Pressable
                onPress={() => navigation.navigate("MyAppointmentsScreen")}
              >
                <Text color="black-300" variant="text-sm-medium">
                  See all
                </Text>
              </Pressable>
            </Box>
            <FlatList
              data={activeBookings}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <Box px="2" />}
              renderItem={renderAppointmentCardItem}
              keyExtractor={(item) => item.invoice_id}
            />
          </Box>
          <Box mt="6">
            <Box px="4" row justifyContent="space-between" mb="4">
              <Text variant="text-lg-bold">Recommended Activities:</Text>
            </Box>
            <ActivitiesCard index={0} />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default Home;
