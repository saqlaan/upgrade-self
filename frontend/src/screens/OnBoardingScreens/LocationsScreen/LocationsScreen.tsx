import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import { BackButton, Box, CButton, Text } from "@/components/atoms";
import { SafeScreen } from "@/components/template";
import { updateUser } from "@/services/firebase";
import { fetchAllCentersData } from "@/services/firebaseApp/centers";
import type { ApplicationScreenProps } from "@/types/navigation";
import { AppTheme } from "@/types/theme";
import { useDynamicBottomSheet } from "@/hooks";
import { DynamicBottomSheet } from "@/components";
import { colors } from "@/theme";
import { CenterType } from "@/types";
import { useCenterStore } from "@/store/centerStore";

function Locations({ navigation }: ApplicationScreenProps) {
  const { colors } = useTheme<AppTheme>();
  const { t } = useTranslation(["locations", "common"]);
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } =
    useDynamicBottomSheet();
  const { center, setCenter } = useCenterStore();

  const { data: locations } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchAllCentersData,
  });

  const { mutateAsync: updateLocationsAsync, isPending } = useMutation({
    mutationFn: updateUser,
  });

  const handleOnChange = useCallback(
    (center: CenterType) => {
      if (center) {
        setCenter({
          centerId: center.id,
          countryCode: center.country.code,
          name: center.name,
        });
      }
      closeBottomSheet();
    },
    [closeBottomSheet, setCenter],
  );

  const _submit = useCallback(async () => {
    try {
      updateLocationsAsync({
        centers: [center],
      });
      navigation.navigate("ProfileSetupScreen");
    } catch (e) {
      console.log(e);
    }
  }, [center, navigation, updateLocationsAsync]);

  const renderItem = useCallback(
    ({ item }: { item: CenterType }) => {
      return (
        <TouchableOpacity onPress={() => handleOnChange(item)}>
          <Box px="4" key={item.id} mb="5">
            <Text
              color={center?.centerId === item.id ? "secondary" : "black-600"}
            >
              {item.name}
            </Text>
          </Box>
        </TouchableOpacity>
      );
    },
    [center?.centerId, handleOnChange],
  );

  return (
    <SafeScreen>
      {navigation.canGoBack() && (
        <Box px="5" pt="5" row>
          <BackButton color={colors.primary} />
        </Box>
      )}
      <StatusBar barStyle={"dark-content"} />
      <Box px="5" py="5">
        <Text variant={"display-xs-bold"} mb={"2"}>
          {t("locations:title")}
        </Text>
        <Text color={"black-300"} variant={"text-md-medium"} mb={"2"}>
          {t("locations:subtitle")}
        </Text>
      </Box>
      <Box style={styles.container}>
        <TouchableOpacity onPress={openBottomSheet}>
          <Box gap="2" radius="3" px="4" py="4" row style={styles.inputWrapper}>
            <Text color="black-700" variant="text-sm-medium">
              {center?.name || "Select location"}
            </Text>
          </Box>
        </TouchableOpacity>

        <DynamicBottomSheet bottomSheetModalRef={bottomSheetRef}>
          <Box mt="6">
            <FlatList
              style={{ height: 300 }}
              data={locations}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </Box>
        </DynamicBottomSheet>
      </Box>

      <Box px="5" py="5">
        <CButton loading={isPending} onPress={_submit} disabled={!center}>
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
    padding: 20,
    paddingTop: 0,
    flex: 1,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors["primary-300"],
    height: 55,
  },
});

export default Locations;
