import { Box, Text } from "@/components/atoms";
import { useOnBoardingQuestionsStore } from "@/store/onBoardingQuestion.stores";
import { OptionType, QuestionType } from "@/types";
import { useCallback } from "react";
import { Dimensions } from "react-native";
import Options from "./Options";

const Question = ({ item }: { item: QuestionType }) => {
  const { setSelection } = useOnBoardingQuestionsStore();
  const { width } = Dimensions.get("window");

  const handleOptionSelection = useCallback(
    (question: QuestionType, option: OptionType) => {
      setSelection(question.id, option.id);
    },
    []
  );
  return (
    <Box px="5" style={{ width: width }}>
      <Text variant={"text-xl-bold"} mb={"2"}>
        {item.question}
      </Text>
      <Box pt="6">
        <Options
          options={item.options}
          onOptionSelection={(option) => handleOptionSelection(item, option)}
        />
      </Box>
    </Box>
  );
};

export default Question;
