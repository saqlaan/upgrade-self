import React from "react";
import { Pressable } from "react-native";
import { Box, Text } from "@/components/atoms";
import {
  ArrowDownIcon,
  BellBingIcon,
  MapPointIcon,
} from "@/theme/assets/icons";
import { colors, spacing } from "@/theme";

const HomeHeader = () => {
  return (
    <>
      <Box row justifyContent="space-between" px="5">
        <Box>
          <Text variant="text-xl-bold" mb="1">
            Good Morning!
          </Text>
          <Box row alignItems="center" gap="2">
            <MapPointIcon
              fill={colors.secondary}
              width={spacing[5]}
              height={spacing[5]}
            />
            <Text variant="text-sm-bold" color="secondary">
              Meridian
            </Text>
            <ArrowDownIcon fill={colors.secondary} />
          </Box>
        </Box>
        <Pressable>
          <Box
            alignItems="center"
            justifyContent="center"
            px="2"
            py="2"
            bgColor={"white"}
            radius={"20"}
          >
            <BellBingIcon fill={colors.primary} />
          </Box>
        </Pressable>
      </Box>
      <Box py="3" />
    </>
  );
};

export default HomeHeader;
