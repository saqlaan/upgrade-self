import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { BackButton, Box, Text } from "@/components/atoms";
import { AppTheme } from "@/types/theme";

const ProfileScreensHeader = ({
  title,
  rightComponent,
}: {
  title: string;
  rightComponent: ReactNode;
}) => {
  const { colors } = useTheme<AppTheme>();
  return (
    <Box px="5" pb="5" row alignItems="center" justifyContent="space-between">
      <BackButton color={colors.primary} />
      <Box pb="5" style={styles.title}>
        <Text variant="text-xl-bold">{title}</Text>
      </Box>
      {rightComponent}
    </Box>
  );
};

export default ProfileScreensHeader;

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
