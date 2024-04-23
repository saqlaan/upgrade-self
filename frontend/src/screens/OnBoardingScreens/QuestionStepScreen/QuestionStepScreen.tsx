import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import { Bar } from "react-native-progress";
import { useMutation } from "@tanstack/react-query";
import Question from "./components/Question";
import questionsData from "./questions.json";
import { useOnBoardingQuestionsStore } from "@/store/onBoardingQuestionStore";
import { AppTheme } from "@/types/theme";
import type { ApplicationScreenProps } from "@/types/navigation";
import { QuestionType } from "@/types";
import { SafeScreen } from "@/components/template";
import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { updateUser } from "@/services/firebase";

function QuestionStep({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const scrollRef = useRef<FlatList>();
  const { t } = useTranslation(["locations", "common"]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { selections } = useOnBoardingQuestionsStore();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateUser,
  });

  const isLast = useMemo(() => {
    return currentStepIndex === questionsData.questions.length - 1;
  }, [currentStepIndex]);

  const formatResults = () => {
    const list = Object.entries(selections);
    if (list.length > 0) {
      const data = list.map((selection) => {
        const questionId = selection[0];
        const answerId = selection[1];
        const question = questionsData.questions.find(
          (question) => question.id == questionId,
        );
        const option = question?.options.find(
          (option) => option.id == answerId,
        );
        return {
          question: {
            id: question?.id,
            name: question?.question,
          },
          value: option,
        };
      });
      return data;
    } else return [];
  };

  const _submit = useCallback(async () => {
    const results: [] = formatResults();
    try {
      if (results.length > 0) {
        await mutateAsync({ questions: results });
      }
      navigation.navigate("FinishOnBoardingScreen");
    } catch {
      console.error(error);
    }
  }, [selections]);

  const handleNext = useCallback(() => {
    if (questionsData.questions[currentStepIndex + 1]) {
      scrollRef?.current?.scrollToIndex({
        animated: true,
        index: currentStepIndex + 1,
      });
      setCurrentStepIndex((state: number) => state + 1);
    }
  }, [currentStepIndex]);

  const handleBackPress = useCallback(() => {
    if (currentStepIndex === 0) {
      navigation.goBack();
    } else {
      scrollRef?.current?.scrollToIndex({
        animated: true,
        index: currentStepIndex - 1,
      });
      setCurrentStepIndex((state: number) => state - 1);
    }
  }, [currentStepIndex]);

  return (
    <SafeScreen>
      <StatusBar barStyle={"dark-content"} />
      <Box px="5" pt="5" row alignItems="center" justifyContent="space-between">
        <BackButton onPress={handleBackPress} color={colors.primary} />
        <Box px="10">
          <Bar
            color={colors.secondary}
            progress={currentStepIndex / (questionsData.questions.length - 1)}
          />
        </Box>
        {!isLast ? (
          <Pressable onPress={handleNext}>
            <Text variant="text-md-bold">Skip</Text>
          </Pressable>
        ) : (
          <Box />
        )}
      </Box>
      <Box py="5" flex={1}>
        <FlatList
          ref={scrollRef}
          horizontal
          data={questionsData.questions}
          renderItem={({ item }) => <Question item={item} />}
          contentContainerStyle={{
            alignItems: "stretch",
          }}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: QuestionType) => item.id}
          initialNumToRender={5}
          windowSize={10}
        />
      </Box>
      <Box px="5" py="5">
        {isLast ? (
          <CButton onPress={_submit} loading={isPending}>
            <Text color={"white"} variant="text-md-semi-bold">
              {t("common:finish")}
            </Text>
          </CButton>
        ) : (
          <CButton
            onPress={handleNext}
            disabled={currentStepIndex === questionsData.questions.length - 1}
          >
            <Text color={"white"} variant="text-md-semi-bold">
              {t("common:appName.next")}
            </Text>
          </CButton>
        )}
      </Box>
    </SafeScreen>
  );
}

export default QuestionStep;
