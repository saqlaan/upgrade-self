import React, { useEffect } from "react";
import { ScrollView, Image, View, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Svg, Path, Line, Circle, Text as SvgText } from "react-native-svg";
import { BackButton, Box, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Images } from "@/theme/assets/images";
import { BrainIcon, TimeIcon } from "@/theme/assets/icons";

import {
  getBrainUpgradeUserReports,
  BrainUpgradeUserReport,
} from "@/services/firebaseApp/brainUpgrade";

const BarChart = ({ data }: { data: { value: number; label: string }[] }) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const scaleFactor = 90 / maxValue; // Reduced to account for label space
  const barWidth = 17;
  const cornerRadius = 5;
  const chartHeight = 110; // Increased SVG height to prevent cutting off labels
  const labelGap = 15; // Gap for the label above the bar
  const [activeIndex, setActiveIndex] = React.useState(data.length - 1);
  const barGap = 10;

  // Function to create a path with rounded top
  const createRoundedTopPath = (
    x: number,
    y: number,
    width: number,
    height: number,
    cornerRadius: number
  ) => {
    return `M${x},${y + cornerRadius}
            a${cornerRadius},${cornerRadius} 0 0 1 ${cornerRadius},-${cornerRadius}
            h${width - 2 * cornerRadius}
            a${cornerRadius},${cornerRadius} 0 0 1 ${cornerRadius},${cornerRadius}
            v${height - cornerRadius}
            h-${width}
            z`;
  };

  return (
    <View>
      <Svg
        height={chartHeight + labelGap * 2}
        width="100%"
        onPress={(event) => {
          const nearestIndex = Math.max(
            Math.min(
              Math.floor(event.nativeEvent.locationX / (barWidth + barGap)),
              data.length - 1
            ),
            0
          );
          setActiveIndex(nearestIndex);
        }}
      >
        {data.map((item, index) => {
          const barHeight = item.value * scaleFactor;
          const x = index * (barWidth + barGap) + barGap;
          const y = chartHeight - barHeight; // Adjusted Y position for the bars

          return (
            <React.Fragment key={item.label}>
              <Path
                d={createRoundedTopPath(
                  x,
                  y,
                  barWidth,
                  barHeight,
                  cornerRadius
                )}
                fill={
                  index === activeIndex
                    ? "rgb(238, 153, 10)"
                    : "rgb(250, 223, 179)"
                } // Conditional fill color
              />
              {index === activeIndex && (
                <SvgText
                  x={x + barWidth / 2}
                  y={chartHeight + labelGap}
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  {item.label}
                </SvgText>
              )}
              {/* Value label above the bar */}
              {index === activeIndex && (
                <SvgText
                  x={x + barWidth / 2}
                  y={y - labelGap / 2} // Position above the bar
                  fontSize="10"
                  textAnchor="middle"
                  fill="black"
                >
                  {item.value}
                </SvgText>
              )}
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default function Page({ navigation }: ApplicationScreenProps) {
  const [reportData, setReportData] = React.useState<
    BrainUpgradeUserReport[] | null
  >(null);
  const [myScore, setMyScore] = React.useState<number | null>(null);
  const isLoading = reportData === null;
  const [sessionAlpha, setSessionAlpha] = React.useState<number | null>(null);
  const [baseline, setBaseline] = React.useState<number | null>(null);
  const [sessionTimeMinutes, setSessionTimeMinutes] = React.useState<
    number | null
  >(null);
  const [historyData, setHistoryData] = React.useState<
    { label: string; value: number }[] | null
  >(null);
  const [bestSession, setBestSession] = React.useState<number | null>(null);
  const [totalPoints, setTotalPoints] = React.useState<number | null>(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) return;
    getBrainUpgradeUserReports({ limit: 12 })
      .then((data) => {
        if (data) {
          data.reverse();
          setReportData(data);
        } else {
          Alert.alert(
            "No data yet...",
            "Complete your first BrainUpgrade session to see your stats.",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]
          );
          setReportData([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isFocused]);

  useEffect(() => {
    if (reportData && reportData.length > 0) {
      const myScore = reportData[reportData.length - 1].alphaScore;
      setMyScore(myScore);
      const sessionAlpha = reportData[reportData.length - 1].alphaTime;
      setSessionAlpha(sessionAlpha);
      const baseline = reportData[reportData.length - 1].baselinePeakAlpha;
      setBaseline(baseline);
      const startAt = new Date(reportData[reportData.length - 1].startAt);
      const endAt = new Date(reportData[reportData.length - 1].endAt);
      const sessionTimeMinutes = (endAt.getTime() - startAt.getTime()) / 60000;
      setSessionTimeMinutes(sessionTimeMinutes);
      const historyData = reportData.map((item) => {
        const date = new Date(item.startAt);
        return {
          label: date.toLocaleString("default", {
            month: "short",
            day: "2-digit",
          }),
          value: item.alphaScore,
        };
      });
      setHistoryData(historyData);
      const bestSession = Math.max(...historyData.map((item) => item.value));
      setBestSession(bestSession);
      const totalPoints = reportData.reduce(
        (acc, item) => acc + item.alphaScore,
        0
      );
      setTotalPoints(totalPoints);
    }
  }, [reportData]);
  return (
    <SafeScreen>
      <Box px="4" bgColor="grey-400" flex={1} gap="4" pb="4">
        {/* Header */}
        <Box alignItems="center" pt="2">
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ position: "absolute", left: 0 }}>
              <BackButton onPress={() => navigation.goBack()} />
            </View>
            <Text
              variant="text-xl-bold"
              style={{
                textAlign: "center",
                width: "100%",
              }}
            >
              Brain Upgrade
            </Text>
          </View>
          <Text variant="text-sm-semi-bold">Latest Session:</Text>
          {sessionTimeMinutes && (
            <Text variant="text-md-bold">
              {sessionTimeMinutes?.toFixed(0)} min
            </Text>
          )}
          {isLoading && <Text>Loading...</Text>}
          <Box
            style={{
              maxHeight: 200,
            }}
            alignItems="flex-end"
          >
            <Image
              source={Images.BrainUpgrade}
              style={{
                maxHeight: 150,
                maxWidth: 150,
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
        {/* Filter Menu */}
        <Box row justifyContent="space-between" alignItems="baseline">
          <Text variant="text-xl-bold">Metric</Text>
          {/* TODO */}
          {/* <Text>Filter</Text> */}
        </Box>
        <ScrollView
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Cards */}
          <Box row gap="2" my="2">
            <Box
              bgColor="white"
              flex={1}
              radius="4"
              px="4"
              py="4"
              style={{ height: 150 }}
              justifyContent="space-between"
            >
              <Box row gap="2" alignItems="center">
                <Box px="2" py="2" bgColor={"grey-400"} radius="2">
                  <BrainIcon />
                </Box>
                <Text variant="text-sm-semi-bold">My score</Text>
              </Box>
              {myScore && <Text variant="display-md-semi-bold">{myScore}</Text>}
            </Box>
            <Box
              bgColor="white"
              flex={1}
              radius="4"
              px="4"
              py="4"
              style={{ height: 150 }}
              justifyContent="space-between"
            >
              <Box row gap="2" alignItems="center">
                <Box px="2" py="2" bgColor={"grey-400"} radius="2">
                  <TimeIcon />
                </Box>
                <Text variant="text-sm-semi-bold">Session{"\n"}Alpha</Text>
              </Box>
              <Box row alignItems="baseline" gap="1">
                {sessionAlpha && (
                  <>
                    <Text variant="display-md-semi-bold">
                      {sessionAlpha?.toFixed(0)}
                    </Text>
                    <Text variant="text-sm-medium">min</Text>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          {/* History Chart */}
          <Box bgColor="white" radius="4" px="4" py="4" gap="4" my="2">
            <Text variant="text-xl-bold">My history</Text>
            <Box row gap="4">
              <Box>
                <Text variant="text-xs-medium">Total Points</Text>
                <Text variant="text-md-bold">{totalPoints?.toFixed(0)}</Text>
              </Box>
              <Box>
                <Text variant="text-xs-medium">Best Session</Text>
                <Text variant="text-md-bold">{bestSession?.toFixed(0)}</Text>
              </Box>
            </Box>
            <Box>{historyData && <BarChart data={historyData} />}</Box>
          </Box>
          {/* Baseline Chart */}
          <Box bgColor="white" radius="4" px="4" py="4" my="2">
            <Text variant="text-xl-bold">
              Baseline: {baseline?.toFixed(1)} Hz
            </Text>
            {baseline !== null && (
              <Box
                row
                justifyContent="space-between"
                alignItems="center"
                style={{ width: "100%" }}
                gap="4"
              >
                <Text variant="text-md-medium">8 Hz</Text>
                <Svg height="60" width="200">
                  {/* Draw the baseline line */}
                  <Line
                    x1="0"
                    y1="30"
                    x2="200"
                    y2="30"
                    stroke="#D3D3D3"
                    strokeWidth="4"
                  />

                  {/* Draw the circle that represents the slider "handle" */}
                  <Circle
                    cx={
                      baseline !== null
                        ? `${200 * ((baseline - 8) / (12 - 8))}`
                        : "0"
                    }
                    cy="30"
                    r="6"
                    fill="#000000"
                  />
                </Svg>
                <Text variant="text-md-medium">12 Hz</Text>
              </Box>
            )}
          </Box>
        </ScrollView>
      </Box>
    </SafeScreen>
  );
}
