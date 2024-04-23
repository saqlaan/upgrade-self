import React from "react";
import { ScrollView, Image, View } from "react-native";
import { Svg, Path, Line, Circle, Text as SvgText } from "react-native-svg";
import { BackButton, Box, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";
import { Images } from "@/theme/assets/images";
import { BrainIcon, TimeIcon } from "@/theme/assets/icons";

const data = [
  { label: "Jun", value: 50 },
  { label: "Jul", value: 30 },
  { label: "Aug", value: 70 },
  { label: "Sep", value: 40 },
  { label: "Oct", value: 60 },
  { label: "Nov", value: 80 },
  { label: "Dec", value: 90 },
  { label: "Jan", value: 100 },
  { label: "Feb", value: 110 },
  { label: "Mar", value: 120 },
  { label: "Apr", value: 130 },
  { label: "May", value: 140 },
];

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const scaleFactor = 90 / maxValue; // Reduced to account for label space
  const barWidth = 17;
  const cornerRadius = 5;
  const chartHeight = 110; // Increased SVG height to prevent cutting off labels
  const labelGap = 15; // Gap for the label above the bar
  const [activeIndex, setActiveIndex] = React.useState(data.length - 1);

  // Function to create a path with rounded top
  const createRoundedTopPath = (x, y, width, height, cornerRadius) => {
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
          const nearestIndex = Math.floor(
            event.nativeEvent.locationX / (barWidth + 10)
          );
          setActiveIndex(nearestIndex);
        }}
      >
        {data.map((item, index) => {
          const barHeight = item.value * scaleFactor;
          const x = index * (barWidth + 10) + 5;
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
              <SvgText
                x={index * (barWidth + 10) + barWidth / 2 + 5}
                y={chartHeight + labelGap}
                fontSize="10"
                textAnchor="middle"
                fill="black"
              >
                {item.label}
              </SvgText>
              {/* Value label above the bar */}
              {index === activeIndex && (
                <SvgText
                  x={index * (barWidth + 10) + barWidth / 2 + 5}
                  y={y - 5} // Position above the bar
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

export default function Appointment({ navigation }: ApplicationScreenProps) {
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
          <Text variant="text-sm-semi-bold">Previous Session:</Text>
          <Text variant="text-md-bold">30 min</Text>
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
          <Text>Filter</Text>
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
              <Text variant="display-md-semi-bold">97</Text>
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
                <Text variant="display-md-semi-bold">25</Text>
                <Text variant="text-sm-medium">min</Text>
              </Box>
            </Box>
          </Box>
          {/* History Chart */}
          <Box bgColor="white" radius="4" px="4" py="4" gap="4" my="2">
            <Text variant="text-xl-bold">My history</Text>
            <Box row gap="4">
              <Box>
                <Text variant="text-xs-medium">Total Points</Text>
                <Text variant="text-md-bold">501</Text>
              </Box>
              <Box>
                <Text variant="text-xs-medium">Best Session</Text>
                <Text variant="text-md-bold">88</Text>
              </Box>
            </Box>
            <Box>
              <BarChart data={data} />
            </Box>
          </Box>
          {/* Baseline Chart */}
          <Box bgColor="white" radius="4" px="4" py="4" my="2">
            <Text variant="text-xl-bold">Baseline: 9.5 Hz</Text>
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
                <Circle cx="105" cy="30" r="6" fill="#000000" />
              </Svg>
              <Text variant="text-md-medium">12 Hz</Text>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </SafeScreen>
  );
}
