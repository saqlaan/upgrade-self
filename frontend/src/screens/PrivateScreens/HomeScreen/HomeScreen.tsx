import React, { useEffect, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, Pressable, ScrollView, StatusBar } from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { HomeHeader } from "./components";
import RecommendedActivities from "./components/RecommendedActivities";
import { AndroidScreenTopSpace, Box, Text } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import {
  BookedAppointmentCard,
  HealthActivityCard,
  HealthScoreCard,
} from "@/components";
import { colors } from "@/theme";
import { getBrainUpgradeUserReports } from "@/services/firebaseApp/brainUpgrade";
import { useCenterStore } from "@/store/centerStore";
import { GuestAppointmentType } from "@/types/zenoti/BookedAppointmentType";
import { isAndroid } from "@/utils/functions";
import { getUserGuests } from "@/services/firebase/collections/guest";
import { getBookedAppointments } from "@/services/firebaseApp/guests";

function UpcomingSchedule({ navigation }) {
  const { allCenters } = useCenterStore();
  const isFocused = useIsFocused();

  const [bookings, setBookings] = React.useState<GuestAppointmentType[] | null>(
    null,
  );

  useEffect(() => {
    if (!isFocused) return;
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

        const currentTime = Date.now();
        const activeBookings = allAppointments.filter((appointment) => {
          const endTimeString = appointment?.appointment_services[0]?.end_time;
          if (endTimeString) {
            const endTime = new Date(endTimeString);
            return endTime.getTime() > currentTime;
          }
          return false;
        });

        setBookings(activeBookings);
      } catch (error) {
        console.error("Error loading bookings:", error);
        setBookings([]);
      }
    };
    loadBookings();
  }, [allCenters, navigation, isFocused]);

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
          <Pressable
            onPress={() => {
              navigation.navigate("MyAppointmentDetailScreen", {
                appointment: item,
                isPastBooking: false,
              });
            }}
          >
            <BookedAppointmentCard
              title={name}
              duration={duration}
              dateTime={startTime}
              location={center?.name || ""}
              index={index}
              isPastBooking={false}
            />
          </Pressable>
        </Box>
      );
    },
    [allCenters, navigation]
  );

  return (
    <Box>
      <Box px="4" row justifyContent="space-between" mb="4">
        <Text variant="text-lg-bold">Upcoming Schedule</Text>
        <Pressable onPress={() => navigation.navigate("MyAppointmentsScreen")}>
          <Text color="black-300" variant="text-sm-medium">
            See all
          </Text>
        </Pressable>
      </Box>
      <FlatList
        data={bookings || []}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Box px="2" />}
        renderItem={renderAppointmentCardItem}
        keyExtractor={(item) => item.invoice_id}
      />
    </Box>
  );
}

function ActivityCards({ navigation }) {
  const [brainUpgradeData, setBrainUpgradeData] = React.useState<
    | {
        variant: "brain" | "heart" | "calories" | "weight";
        value: number;
      }[]
    | null
  >(null);

  useEffect(() => {
    getBrainUpgradeUserReports({ limit: 1 })
      .then((data) => {
        if (!data || data.length === 0) {
          return;
        }
        setBrainUpgradeData([
          {
            variant: "brain",
            value: data[0].alphaScore,
          },
          {
            variant: "heart",
            value: data[0].alphaTime,
          },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const activityData = brainUpgradeData || [];
  return (
    <Box>
      {activityData.length > 0 && (
        <Box pt={"4"}>
          <Box row mx="4" mb="4" justifyContent="space-between">
            <Text variant="text-lg-bold">Latest Stats</Text>
            <Pressable onPress={() => navigation.navigate("StatsScreen")}>
              <Text color="black-300" variant="text-sm-medium">
                See stats
              </Text>
            </Pressable>
          </Box>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <Box px="2" />}
            data={activityData}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("BrainUpgradeScreen");
                }}
              >
                <HealthActivityCard {...item} index={index} />
              </Pressable>
            )}
            automaticallyAdjustContentInsets
          />
        </Box>
      )}
    </Box>
  );
}

function Home({ navigation }: ApplicationScreenProps) {
  const { top } = useSafeAreaInsets();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      if (isAndroid) StatusBar.setBackgroundColor(colors["grey-400"]);
    }, [])
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
          <ActivityCards navigation={navigation} />
          {/* Upcoming schedule */}
          <Box mt="6">
            <UpcomingSchedule navigation={navigation} />
          </Box>
          <Box mt="6">
            <RecommendedActivities />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default Home;
