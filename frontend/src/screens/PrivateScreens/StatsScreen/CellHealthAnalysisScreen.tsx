import React from "react";
import { View } from "react-native";
import { Svg, Path, G, Circle } from "react-native-svg";
import { BackButton, Box, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";

function calculateControlPoints(data) {
  const controlPoints = [];

  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      // first point (use the second point as the next point)
      const p1 = data[i];
      const p2 = data[i + 1];
      const controlPoint = {
        cp1x: p1.x,
        cp1y: p1.y,
        cp2x: p1.x + (p2.x - p1.x) * 0.3,
        cp2y: p1.y + (p2.y - p1.y) * 0.3,
      };
      controlPoints.push(controlPoint);
    } else if (i === data.length - 1) {
      // last point (use the second-to-last point as the previous point)
      const p0 = data[i - 1];
      const p1 = data[i];
      const controlPoint = {
        cp1x: p1.x + (p1.x - p0.x) * 0.3,
        cp1y: p1.y + (p1.y - p0.y) * 0.3,
        cp2x: p1.x,
        cp2y: p1.y,
      };
      controlPoints.push(controlPoint);
    } else {
      // middle points
      const p0 = data[i - 1];
      const p1 = data[i];
      const p2 = data[i + 1];
      const d01 = Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2);
      const d12 = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

      let fa = 0.3; // tension
      let fb = 0.3; // tension

      // adjust the tension on the control points
      if (d01 !== 0 && d12 !== 0) {
        fa = fa * (d12 / (d01 + d12));
        fb = fb * (d01 / (d01 + d12));
      }

      const cp1x = p1.x - (p2.x - p0.x) * fa;
      const cp1y = p1.y - (p2.y - p0.y) * fa;
      const cp2x = p1.x + (p2.x - p0.x) * fb;
      const cp2y = p1.y + (p2.y - p0.y) * fb;

      controlPoints.push({
        cp1x: cp1x,
        cp1y: cp1y,
        cp2x: cp2x,
        cp2y: cp2y,
      });
    }
  }

  return controlPoints;
}

const data = [
  { x: 10, y: 40 },
  { x: 20, y: 10 },
  { x: 30, y: 30 },
  { x: 40, y: 50 },
  { x: 50, y: 70 },
  { x: 60, y: 30 },
  { x: 70, y: 40 },
  { x: 80, y: 10 },
  { x: 90, y: 30 },
  { x: 100, y: 50 },
];

const SmoothChart = () => {
  // Calculate path data for the smooth curve
  const bounds = {
    maxX: Math.max(...data.map((d) => d.x)) + 10,
    maxY: Math.max(...data.map((d) => d.y)) + 10,
    minX: Math.min(...data.map((d) => d.x)) - 10,
    minY: Math.min(...data.map((d) => d.y)) - 10,
  };
  const plotData = data.map((d) => ({
    x: ((d.x - bounds.minX) / (bounds.maxX - bounds.minX)) * 100,
    y: ((d.y - bounds.minY) / (bounds.maxY - bounds.minY)) * 100,
  }));
  console.log(plotData);
  const controlPoints = calculateControlPoints(plotData);

  let pathData = `M ${plotData[0].x} ${plotData[0].y}`;

  for (let i = 1; i < plotData.length; i++) {
    const cp1 = controlPoints[i - 1];
    const cp2 = controlPoints[i];
    pathData += ` C ${cp1.cp2x},${cp1.cp2y} ${cp2.cp1x},${cp2.cp1y} ${plotData[i].x},${plotData[i].y}`;
  }

  return (
    <Svg height="100%" width="100%" viewBox="0 0 100 100">
      <G>
        <Path
          d={pathData}
          fill="none"
          stroke="rgb(32, 23, 81)"
          strokeWidth="1"
        />
        <Circle
          cx={plotData[plotData.length - 1].x}
          cy={plotData[plotData.length - 1].y}
          r={2}
          fill="rgb(32, 23, 81)"
        />
      </G>
    </Svg>
  );
};

export default function Appointment({ navigation }: ApplicationScreenProps) {
  return (
    <SafeScreen>
      <Box px="4" bgColor="grey-400" flex={1} gap="4" pb="4">
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
              Cell Health Analysis
            </Text>
          </View>
        </Box>
        <Box row justifyContent="space-between" alignItems="baseline">
          <Text variant="text-xl-bold">Metric</Text>
          <Text>Filter</Text>
        </Box>
        <Box bgColor="white" flex={1} radius="4" px="4" py="4" gap="4">
          <Text variant="text-xl-bold">EC Weight</Text>
          <Box row gap="4">
            <Box>
              <Text>Current weight</Text>
              <Text variant="text-sm-bold">135.5 lbs</Text>
            </Box>
            <Box>
              <Text>Age</Text>
              <Text variant="text-sm-bold">32</Text>
            </Box>
            <Box>
              <Text>BMI</Text>
              <Text variant="text-sm-bold">26</Text>
            </Box>
            <Box>
              <Text>Status</Text>
              <Text variant="text-sm-bold">Normal</Text>
            </Box>
          </Box>
          <Box
            flex={1}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <SmoothChart />
          </Box>
        </Box>
        <Box bgColor="white" flex={1} radius="4" px="4" py="4" gap="4">
          <Text variant="text-xl-bold">Segmented fat analysis</Text>
          <Box row gap="4">
            <Box>
              <Text>Mass</Text>
              <Text variant="text-sm-bold">135.5 lbs</Text>
            </Box>
            <Box>
              <Text>Percentage</Text>
              <Text variant="text-sm-bold">156.0 %</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeScreen>
  );
}
