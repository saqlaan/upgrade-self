import { BackButton, Box, CButton, Spacer, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { useTranslation } from "react-i18next";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function TOS({ navigation }: ApplicationScreenProps) {
  const { colors, spacing } = useTheme<AppTheme>();
  const { t } = useTranslation(["tos"]);
  const items = t("tos:details", { returnObjects: true });

  const _renderItem = ({
    title,
    description,
    index,
  }: {
    title: string;
    description: string;
    index: number;
  }) => {
    return (
      <Box key={index}>
        <Text mb="2" variant={"text-lg-bold"}>
          {title}
        </Text>
        <Text color={colors["black-400"]} mb="4" variant={"text-md-medium"}>
          {description}
        </Text>
      </Box>
    );
  };

  return (
    <SafeScreen>
      <StatusBar backgroundColor={"white"} />
      <Box px="5" pt="5" row>
        <BackButton color={colors.primary} />
      </Box>
      <Spacer marginBottom={spacing[4]} />
      <ScrollView style={styles.container}>
        <Text variant={"display-xs-bold"} mb={"2"}>
          {t("tos:title")}
        </Text>
        <Text color={colors["black-300"]} variant={"text-md-medium"} mb={"2"}>
          {t("tos:subtitle")}
        </Text>
        <Box mt="4" px="4" py="4" bgColor={"grey-200"}>
          {items.map((item, index) => _renderItem({ ...item, index }))}
        </Box>
      </ScrollView>
      <Box row px="5" py="5" gap="4">
        <Box flex={1}>
          <CButton
            variant={"default"}
            onPress={() => navigation.goBack()}
            text="Cancel"
          />
        </Box>
        <Box flex={1}>
          <CButton onPress={() => navigation.navigate("Signup")}>
            <Text color={colors.white} variant="text-md-semi-bold">
              {t("tos:agree")}
            </Text>
          </CButton>
        </Box>
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

export default TOS;
