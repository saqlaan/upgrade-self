import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { Box, Text } from "@/components/atoms";
import { FemaleIcon, MaleIcon } from "@/theme/assets/icons";
import { spacing } from "@/theme/spacing";
import { AppTheme } from "@/types/theme";
import { Gender } from "@/types";

const GenderBox = ({ type, value }: { type: Gender; value: Gender }) => {
  const { colors, spacing } = useTheme<AppTheme>();
  const isSelected = value === type;
  const { t } = useTranslation(["profileSetup"]);

  return (
    <Box
      px="4"
      py="4"
      flex={1}
      bgColor={isSelected ? "primary" : "grey-400"}
      style={styles.genderBox}
    >
      <>
        {type === Gender.Male ? (
          <MaleIcon
            width={spacing[6]}
            height={spacing[6]}
            fill={isSelected ? "white" : colors["black-900"]}
          />
        ) : (
          <FemaleIcon fill={isSelected ? "white" : colors["black-900"]} />
        )}
        <Text
          color={isSelected ? "white" : "black-900"}
          variant="text-md-regular"
          mt="3"
        >
          {type === Gender.Male
            ? t("profileSetup:male")
            : t("profileSetup:female")}
        </Text>
      </>
    </Box>
  );
};

const styles = StyleSheet.create({
  genderBox: {
    borderRadius: spacing[2],
  },
});

export default GenderBox;
