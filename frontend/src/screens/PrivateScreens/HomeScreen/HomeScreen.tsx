import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeHeader } from "./components";
import { Box } from "@/components/atoms";
import type { ApplicationScreenProps } from "@/types/navigation";
import { HealthActivityCard, HealthScoreCard } from "@/components";

function Home({ navigation }: ApplicationScreenProps) {
  const { top } = useSafeAreaInsets();
  return (
    <Box bgColor={"grey-400"} flex={1} style={{ paddingTop: top }}>
      <HomeHeader />
      <Box bgColor={"white"} flex={1}>
        <Box px="5">
          <Box py="3" />
          <HealthScoreCard />
          <Box py="2" />
          <Box row gap="3">
            <HealthActivityCard variant="brain" value={98} />
            <HealthActivityCard variant="calories" value={89} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
