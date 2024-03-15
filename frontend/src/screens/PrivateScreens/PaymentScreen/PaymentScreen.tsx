import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { updateUser } from "@/services/firebase";
import { fetchAllCentersData } from "@/services/zenoti/centers";
import { UseUserStore } from "@/store/user.store";
import { AddSquareRoundedIcon, ArrowDownIcon } from "@/theme/assets/icons";
import { Images } from "@/theme/assets/images";
import colors from "@/theme/colors";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function PaymentScreen({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation(["locations", "common", "payment"]);
  const { user } = UseUserStore();
  const [selectedLocation, setSelectedLocation] = useState();

  const { data: locations } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchAllCentersData,
  });

  const { isPending } = useMutation({
    mutationFn: updateUser,
  });

  const PaymentCardItem = ({ label = "Payment" }: { label: string }) => {
    return (
      <Box>
        <Text variant="text-sm-medium" color={"black-300"}>
          {label}
        </Text>
        <Box
          gap="3"
          mt="2"
          alignItems="center"
          px="4"
          style={styles.itemWrapper}
        >
          <Box>
            <Image source={Images.visa} />
          </Box>
          <Box flex={1}>
            <Text color="black-500" variant={"text-md-semi-bold"}>
              Visa ending in 2310
            </Text>
          </Box>
          <ArrowDownIcon />
        </Box>
      </Box>
    );
  };

  return (
    <SafeScreen>
      {navigation.canGoBack() && (
        <Box px="5" mt="5" row>
          <BackButton color={colors.primary} />
          <Box mt="1" style={styles.titleCenter}>
            <Text variant="text-xl-bold">{t("payment:title")}</Text>
          </Box>
        </Box>
      )}
      <Box mt="5" style={styles.container}>
        <PaymentCardItem />
        <Box mt="6">
          <Pressable onPress={() => alert("Add new payment method")}>
            <Box row alignItems={"center"} justifyContent={"center"} gap="2">
              <AddSquareRoundedIcon />
              <Text variant={"text-md-semi-bold"}>
                {t("payment:addNewPayment")}
              </Text>
            </Box>
          </Pressable>
        </Box>
      </Box>

      <Box px="5" py="5">
        <Text align="center" variant={"text-md-medium"} mb="5">
          {t("payment:note")}
        </Text>
        <CButton
          loading={isPending}
          onPress={() => null}
          disabled={selectedLocation === ""}
        >
          <Text color={"white"} variant="text-md-semi-bold">
            {t("payment:buttonText")}
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
  titleCenter: {
    position: "absolute",
    alignItems: "center",
    left: 0,
    right: 0,
    justifyContent: "center",
  },
  itemWrapper: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors["grey-500"],
    flexDirection: "row",
    height: 52,
  },
});

export default PaymentScreen;
