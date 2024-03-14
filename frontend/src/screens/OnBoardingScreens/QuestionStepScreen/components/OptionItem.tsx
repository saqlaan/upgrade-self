import { Box, IconButton, Text } from "@/components/atoms";
import { useOnBoardingQuestionsStore } from "@/store/onBoardingQuestion.stores";
import { OptionSelectedIcon, OptionUnSelectedIcon } from "@/theme/assets/icons";
import colors from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { OptionType } from "@/types";
import { StyleSheet } from "react-native";

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
      <IconButton
        mode="contained"
        icon={
          isSelected ? (
            <OptionSelectedIcon width={18} height={18} />
          ) : (
            <OptionUnSelectedIcon width={18} height={18} />
          )
        }
        style={{
          borderRadius: spacing[2],
          height: 52,
        }}
        labelStyle={{
          marginHorizontal: 0,
          paddingRight: spacing[6],
          paddingHorizontal: spacing[5],
          textAlign: "left",
          width: "100%",
        }}
        onPress={() => onOptionPressed(option)}
        buttonColor={isSelected ? colors.primary : colors["grey-400"]}
      >
        <Text color={isSelected ? colors.white : colors["black-900"]}>
          {option.value}
        </Text>
      </IconButton>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
});

export default OptionItem;
