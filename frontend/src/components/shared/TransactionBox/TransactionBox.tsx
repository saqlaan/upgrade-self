import React from "react";
import { useTheme } from "react-native-paper";
import { Box, Text } from "@/components/atoms";
import { AppTheme } from "@/types/theme";
import { MapPointIcon, StopWatchIcon } from "@/theme/assets/icons";

type TransactionBoxProps = {
  id: string;
  title: string;
  time: string;
  duration: string;
  city: string;
  amount: string;
};

const TransactionBox = ({
  amount = "10",
  city = "Meridian",
  duration = "30 min",
  id = "1",
  time = "01:00 PM",
  title = "Red Charger",
}: TransactionBoxProps) => {
  const { colors, spacing } = useTheme<AppTheme>();

  return (
    <Box
      mb="4"
      bgColor="grey-400"
      px="4"
      py="4"
      style={{ borderRadius: spacing[4] }}
    >
      <Box row justifyContent="space-between" mb="4">
        <Text color="black-400" variant="text-xl-bold">
          {title}
        </Text>
        <Text color="black-400" variant="text-xl-bold">
          ${amount}
        </Text>
      </Box>
      <Box row gap="2" alignItems="center" mb="4">
        <StopWatchIcon width={spacing[5]} height={spacing[5]} />
        <Text color="black-300" variant="text-md-medium">
          {time} - {duration}
        </Text>
      </Box>
      <Box row gap="2" alignItems="center">
        <MapPointIcon
          fill={colors.primary}
          width={spacing[5]}
          height={spacing[5]}
        />
        <Text color="black-300" variant="text-md-medium">
          {city}
        </Text>
      </Box>
    </Box>
  );
};

export default TransactionBox;
