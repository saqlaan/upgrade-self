import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList, Pressable, ScrollView, StatusBar } from "react-native";
import { HomeHeader } from "./components";
import { AndroidScreenTopSpace, Box, Text } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import {
  ActivitiesCard,
  AppointmentCard,
  HealthActivityCard,
  HealthScoreCard,
} from "@/components";
import { colors } from "@/theme";
import { getBrainUpgradeUserReports } from "@/services/firebaseApp/brainUpgrade";

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
            {activityData.length > 0 && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <Box px="2" />}
                data={activityData}
                renderItem={({ item, index }) => (
                  <HealthActivityCard {...item} index={index} />
                )}
                automaticallyAdjustContentInsets
              />
            )}
          </Box>
          {/* Upcoming schedule */}
          <Box mt="6">
            <Box px="4" row justifyContent="space-between" mb="4">
              <Text variant="text-lg-bold">Upcoming Schedule</Text>
              <Pressable onPress={() => alert("To be added")}>
                <Text color="black-300" variant="text-sm-medium">
                  See all
                </Text>
              </Pressable>
            </Box>
            <FlatList
              data={AppointmentData}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <Box px="2" />}
              renderItem={({ item, index }) => (
                <AppointmentCard {...item} index={index} />
              )}
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
