import { BackButton, Box, CButton, Spacer, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function Locations({ navigation }: ApplicationScreenProps) {
  const { colors, spacing } = useTheme<AppTheme>();
  const { t } = useTranslation(["locations", "common"]);

  return (
    <SafeScreen>
      {navigation.canGoBack() && (
        <Box px="5" pt="5" row>
          <BackButton color={colors.primary} />
        </Box>
      )}
      <Box px="5" py="5">
        <Text variant={"display-xs-bold"} mb={"2"}>
          {t("locations:title")}
        </Text>
        <Text color={colors["black-300"]} variant={"text-md-medium"} mb={"2"}>
          {t("locations:subtitle")}
        </Text>
      </Box>
      <Spacer marginBottom={spacing[4]} />
      <ScrollView style={styles.container}></ScrollView>
      <Box px="5" py="5">
        <CButton onPress={() => navigation.navigate("Signup")}>
          <Text color={colors.white} variant="text-md-semi-bold">
            {t("common:appName.next")}
          </Text>
        </CButton>
      </Box>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 0,
  },
});

export default Locations;
