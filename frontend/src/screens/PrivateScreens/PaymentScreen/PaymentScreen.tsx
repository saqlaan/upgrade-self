import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { updateUser } from "@/services/firebase";
import { fetchAllCentersData } from "@/services/zenoti/centers";
import { UseUserStore } from "@/store/user.store";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function PaymentScreen({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation(["locations", "common"]);
  const { user } = UseUserStore();
  const [selectedLocation, setSelectedLocation] = useState();

  const { data: locations } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchAllCentersData,
  });

  const { mutateAsync: updateLocationsAsync, isPending } = useMutation({
    mutationFn: updateUser,
  });

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
        <Text color={"black-300"} variant={"text-md-medium"} mb={"2"}>
          {t("locations:subtitle")}
        </Text>
      </Box>
      <Box style={styles.container}></Box>

      <Box px="5" py="5">
        <CButton
          loading={isPending}
          onPress={_submit}
          disabled={selectedLocation === ""}
        >
          <Text color={"white"} variant="text-md-semi-bold">
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
    padding: 20,
    paddingTop: 0,
  },
});

export default PaymentScreen;
