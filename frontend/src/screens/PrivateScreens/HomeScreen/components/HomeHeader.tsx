import React from "react";
import { Pressable } from "react-native";
import CenterSelector from "./CenterSelector";
import { Box, Text } from "@/components/atoms";
import { BellBingIcon } from "@/theme/assets/icons";
import { colors } from "@/theme";

const HomeHeader = () => {
  return (
    <>
      <Box row justifyContent="space-between" px="5">
        <Box>
          <Text variant="text-xl-bold" mb="1">
            Good Morning!
          </Text>
          <CenterSelector />
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
