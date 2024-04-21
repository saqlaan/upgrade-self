import React, { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { Box, CButton, Text } from "@/components/atoms";
import { updateUser } from "@/services/firebase";
import { CheckCircleIcon } from "@/theme/assets/icons";
import { Images } from "@/theme/assets/images";
import { spacing } from "@/theme/spacing";
import type { ApplicationScreenProps } from "@/types/navigation";

function FinishOnBoarding({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["common", "finishOnBoarding"]);
  const { bottom } = useSafeAreaInsets();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateUser,
  });

  const _submit = useCallback(async () => {
    try {
      await mutateAsync({ onBoardingStep: 2, onboardingCompleted: true });
      auth().signOut();
    } catch {
      console.error(error);
    }
  }, [error, mutateAsync]);

  return (
    <ImageBackground source={Images.primaryBgLines} style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <View
        style={[
          styles.container,
          {
            paddingBottom: bottom,
          },
        ]}
      >
        <Box flex={1} px="8" pt="12"></Box>
        <Box style={styles.iconWrapper} bgColor="white">
          <CheckCircleIcon />
        </Box>
        <Box px="5" py="5">
          <Text color="white" align="center" variant={"display-xs-bold"} mb="6">
            {t("finishOnBoarding:title")}
          </Text>
          <Text color="white" align="center" variant={"text-md-medium"} mb="5">
            {t("finishOnBoarding:note")}
          </Text>
          <CButton loading={isPending} onPress={_submit} variant={"default"}>
            <Text color={"black-900"} variant="text-md-semi-bold">
              {t("common:continue")}
            </Text>
          </CButton>
        </Box>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: spacing["10"],
    height: spacing["10"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: spacing["10"],
    position: "absolute",
  },
});

export default FinishOnBoarding;
