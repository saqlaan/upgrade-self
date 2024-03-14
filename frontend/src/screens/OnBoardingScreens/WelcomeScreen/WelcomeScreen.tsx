import { Box, CButton, Text } from "@/components/atoms";
import { UseUserStore } from "@/store/user.store";
import { GrimReaperIcon } from "@/theme/assets/icons";
import { Images } from "@/theme/assets/images";
import { spacing } from "@/theme/spacing";
import type { ApplicationScreenProps } from "@/types/navigation";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Welcome({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["welcome", "common"]);
  const { top, bottom } = useSafeAreaInsets();
  const { user } = UseUserStore();

  const _submit = useCallback(() => {
    navigation.navigate("QuestionStepScreen");
  }, []);

  return (
    <ImageBackground source={Images.primaryBgLines} style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <View
        style={[
          styles.container,
          {
            paddingTop: top,
            paddingBottom: bottom,
          },
        ]}
      >
        <Box flex={1} px="8" pt="12">
          <Text color="white" align="center" variant={"display-xs-bold"}>
            {t("welcome:title", {
              name: `${user?.firstName} ${user?.lastName}`,
            })}
          </Text>
        </Box>
        <Box style={styles.iconWrapper} bgColor="white">
          <GrimReaperIcon />
        </Box>
        <Box px="5" py="5">
          <Text color="white" align="center" variant={"text-md-medium"} mb="5">
            {t("welcome:note")}
          </Text>
          <CButton onPress={_submit} variant={"default"}>
            <Text color={"black-900"} variant="text-md-semi-bold">
              {t("welcome:buttonText")}
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

export default Welcome;
