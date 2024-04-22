import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Box, Text } from "@/components/atoms";
import { useOnBoardingQuestionsStore } from "@/store/onBoardingQuestion.stores";
import { OptionSelectedIcon, OptionUnSelectedIcon } from "@/theme/assets/icons";
import colors from "@/theme/colors";
import { OptionType } from "@/types";

const OptionItem = ({
  option,
  onOptionPressed,
}: {
  option: OptionType;
  onOptionPressed: (option: OptionType) => void;
}) => {
  const { selections } = useOnBoardingQuestionsStore();
  const isSelected =
    selections && Object.values(selections).includes(option.id);
  return (
    <Box mb="4">
      <Pressable onPress={() => onOptionPressed(option)}>
        <Box
          px={"4"}
          py={"4"}
          row
          justifyContent={"space-between"}
          bgColor={isSelected ? "primary" : "grey-400"}
          radius={"2"}
          alignItems="center"
          style={styles.buttonWrapper}
        >
          <Text
            color={isSelected ? colors.white : colors["black-900"]}
            variant="text-md-semi-bold"
          >
            {option.value}
          </Text>
          <Box>
            {isSelected ? (
              <OptionSelectedIcon width={18} height={18} />
            ) : (
              <OptionUnSelectedIcon width={18} height={18} />
            )}
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};

export default OptionItem;

const styles = StyleSheet.create({
  buttonWrapper: {},
});
